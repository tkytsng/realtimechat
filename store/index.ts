// import fb from "../plugins/firebase"
import room from "./modules/room"
import rooms from "./modules/rooms"

export default {
  state() {
    return {
      room: room,
      rooms: rooms
    }
  },
  modules: {
    room: room,
    rooms: rooms
  },
  getters: {
    rooms: state => state.rooms
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
