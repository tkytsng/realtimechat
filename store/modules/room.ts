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
    addMsg(state, payload) {
      // const index = state.data.findIndex(({ id }) => id === payload.id)
      // if (index === -1) {
      state.messages.push({
        id: payload.id,
        text: payload.text,
        isWriting: payload.isWriting
      })
      // console.log(state.messages)
      // }
    },
    modifyMsg(state, payload) {
      const index = state.messages.findIndex(({ id }) => id === payload.id)
      console.log(index)
      if (index !== -1) {
        state.messages[index].text = payload.text
        state.messages[index].isWriting = payload.isWriting
      }
    },
    removeMsg(state, payload) {
      const index = state.messages.findIndex(({ id }) => id === payload.id)
      if (index !== -1) {
        state.messages.splice(index, 1)
      }
    }
  },
  getters: {
    // rooms: state => state.data
  },
  actions: {
    async bindMessages({ commit }, name) {
      // const snapshot = await fb
      //   .firestore()
      //   .collection(`${name}-messages`)
      //   .orderBy(`createTime`, "desc")
      //   .get()

      // if (snapshot.size === 0) return

      const collectionRef = await fb
        .firestore()
        .collection(`${name}-messages`)
        .orderBy(`createTime`, "desc")

      collectionRef.onSnapshot(snapshot => {
        for (const change of snapshot.docChanges()) {
          // console.log(change)
          const payload = {
            id: change.doc.id,
            text: change.doc.data().text,
            isWriting: change.doc.data().isWriting
          }

          if (change.type === "modified") {
            commit(`modifyMsg`, payload)
          } else if (change.type === "added") {
            commit(`addMsg`, payload)
          } else if (change.type === "removed") {
            commit(`removeMsg`, payload)
          }
        }
      })

      //  {
      //   roomname: string
      //   roommsgs: {
      //     text: string
      //     isWriting: boolean
      //     createTime: fb.firestore.Timestamp
      //   }
      // }
      // const room = snapshot.docs
      // const payload = room.map(msg => {
      //   return {
      //     text: msg.data().text,
      //     isWriting: msg.data().isWriting
      //   }
      // })
      // console.log(payload)
      // commit(`bindMessages`, payload)
    }
  }
}
