import fb from "../../plugins/firebase"

export default {
  state() {
    return {
      messages: []
    }
  },
  mutations: {
    bindMessages(state, payload) {
      state.messages = payload
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
    async bindMessages({ commit }, name) {
      const snapshot = await fb
        .firestore()
        .collection(`${name}-messages`)
        .orderBy(`createTime`, "asc")
        .get()

      if (snapshot.size === 0) return

      //  {
      //   roomname: string
      //   roommsgs: {
      //     text: string
      //     isWriting: boolean
      //     createTime: fb.firestore.Timestamp
      //   }
      // }
      const room = snapshot.docs
      const payload = room.map(msg => {
        return {
          text: msg.data().text,
          isWriting: msg.data().isWriting
        }
      })
      console.log(payload)
      commit(`bindMessages`, payload)
    }
  }
}
