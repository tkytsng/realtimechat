import firebase from "./plugins/firebase"
export async function deleteExpiredMessage(expiredTime = 60) {
  const nowSec = firebase.firestore.Timestamp.now().seconds
  const roomssnapshot = await firebase
    .database()
    .ref(`rooms`)
    .once("value")

  const rooms = roomssnapshot.val()

  // let msgstodelete = []
  for (const key of Object.keys(rooms)) {
    const room: {
      name: string
      messages: {}
    } = rooms[key]

    // console.log(room)
    for (const key of Object.keys(room.messages)) {
      const msg: { isWriting: boolean; createTime: number } = room.messages[key]
      if (msg.isWriting && msg.createTime <= nowSec - expiredTime)
        console.log(msg)
      //   firebase
      //     .database()
      //     .ref(`rooms/${room.name}`)
      //     .child(`messages/${key}`)
      //     .remove()
    }
  }
}
