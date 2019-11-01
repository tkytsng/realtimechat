import fb from "../../plugins/firebase"

export default {
  state() {
    return {
      data: []
    }
  },
  mutations: {
    bindMessages(state, payload) {
      state.data = payload
    },
    addMessage(state, payload) {
      const roomIndex = state.data.findIndex(({ id }) => id === payload.id)
      if (roomIndex === -1) {
        state.data.push({
          id: payload.id,
          name: payload.name
        })
      }
    },
    removeMessage(state, payload) {
      const roomIndex = state.data.findIndex(({ id }) => id === payload.id)
      if (roomIndex !== -1) {
        state.data.splice(roomIndex, 1)
      }
    }
  },
  getters: {
    // rooms: state => state.data
  },
  actions: {
    async bindMessages({ commit }) {
      const ref = fb.firestore().collection(`rooms`)
      const snapshot = await ref.get()
      const payload = snapshot.docs.map(room => {
        return {
          id: room.id,
          name: room.data().name
        }
      })
      commit(`bindRooms`, payload)

      const roomsOb = ref.onSnapshot(snapshot => {
        for (const change of snapshot.docChanges()) {
          // console.log(change)
          if (change.type === "modified") {
            commit(`modifyRoom`, {
              id: change.doc.id,
              name: change.doc.data().name
            })
          } else if (change.type === "added") {
            commit(`addRoom`, {
              id: change.doc.id,
              name: change.doc.data().name
            })
          } else if (change.type === "removed") {
            commit(`removeRoom`, {
              id: change.doc.id,
              name: change.doc.data().name
            })
          }
        }
      })
    }
  }
}
