import fb from "../../plugins/firebase"

export default {
  state() {
    return {
      messages: [],
      roomname: ""
    }
  },
  mutations: {
    setRoomName(state, payload) {
      state.roomname = payload
    },
    bindMessages(state, payload) {
      state.messages = payload
    },
    addMsg(state, payload) {
      const index = state.messages.findIndex(({ id }) => id === payload.id)
      if (index === -1) {
        state.messages.unshift({
          id: payload.id,
          text: payload.text,
          isWriting: payload.isWriting
        })
        // console.log(state.messages)
      }
    },
    modifyMsg(state, payload) {
      const index = state.messages.findIndex(({ id }) => id === payload.id)
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
      commit(`setRoomName`, name)

      const collectionRef = await fb
        .firestore()
        .collection(`${name}-messages`)
        .orderBy(`createTime`, "asc")

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
    },
    deleteExpiredMessage({ commit }, roomname, expiredTimeSec = 100) {
      const nowSec = fb.firestore.Timestamp.now().seconds
      console.log(roomname)
      fb.firestore()
        .collection(`${roomname}-messages`)
        .where(`isWriting`, `==`, true)
        .get()
        .then(msgs => {
          let msgsToDelete = []
          for (const msg of msgs.docs) {
            if (msg.data().createTime <= nowSec - expiredTimeSec) {
              msgsToDelete.push(msg.id)
            }
          }
          for (const key of msgsToDelete) {
            fb.firestore()
              .doc(`${roomname}-messages/${key}`)
              .delete()
          }
        })
    }
  }
}
