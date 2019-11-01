import fb from "../../plugins/firebase"
// import Vuex from "vuex"
// import { vuexfireMutations, firestoreAction } from "vuexfire"
// const programsRef = firebase.database().ref('programs')

export default {
  state() {
    return {
      data: []
    }
  },
  mutations: {
    bindRooms(state, payload) {
      state.data = payload
    },
    modifyRoom(state, payload) {
      const roomIndex = state.data.findIndex(({ id }) => id === payload.id)
      if (roomIndex !== -1) {
        state.data[roomIndex].name = payload.name
      }
    },
    addRoom(state, payload) {
      const roomIndex = state.data.findIndex(({ id }) => id === payload.id)
      if (roomIndex === -1) {
        state.data.push({
          id: payload.id,
          name: payload.name
        })
      }
    },
    removeRoom(state, payload) {
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
    async bindRooms({ commit }) {
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
// export const state = () => ({
//   // programs: [],
//   rooms: []
// })

// export const modules = {}

// export const getters = {
//   rooms: state => state.rooms
// }

// export const mutations = {
//   bindRooms(state, payload) {
//     state.rooms = payload
//   },
//   modifyRooms(state, payload) {
//     // const rooms: { id: number; name: string }[] = state.rooms
//     const roomIndex = state.rooms.findIndex(({ id }) => id === payload.id)
//     if (roomIndex) {
//       state.rooms[roomIndex] = {
//         id: payload.id,
//         name: payload.name
//       }
//     }
//   }
// }

// export const actions = {
//   async bindRooms({ commit }) {
//     const ref = fb.firestore().collection(`rooms`)
//     const snapshot = await ref.get()
//     const payload = snapshot.docs.map(room => {
//       return {
//         id: room.id,
//         name: room.data().name
//       }
//     })
//     commit(`bindRooms`, payload)

//     const roomsOb = ref.onSnapshot(snapshot => {
//       for (const change of snapshot.docChanges()) {
//         if (change.type === "modified") {
//           commit(`modifyRooms`, {
//             id: change.doc.id,
//             name: change.doc.data().name
//           })
//           // console.log(change.doc.id)
//         }
//       }
//     })
//   }
// }
