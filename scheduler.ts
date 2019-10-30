import firebase from "./plugins/firebase"
export async function deleteExpiredMessage() {
  const nowSec = firebase.firestore.Timestamp.now().seconds
  const roomssnapshot = await firebase
    .database()
    .ref(`rooms`)
    .orderByKey()
    .once("value")

  const rooms = roomssnapshot.val()

  let msgstodelete = []
  for (const key of Object.keys(rooms)) {
    let msgs = []
    const room: {
      name: string
      messages: {}
    } = rooms[key]

    console.log(room)
    // const msgs = room.messages.filter(msg => msg.createTime <= nowSec + 60)
    for (const key of Object.keys(room.messages)) {
      const msg: { isWriting: boolean; createTime: number } = room.messages[key]
      console.log(`msg.createTime : ${msg.createTime} / nowSec : ${nowSec}`)
      if (msg.isWriting && msg.createTime <= nowSec - 60) msgs.push(key)
    }
    msgstodelete = msgstodelete.concat(msgs)
  }

  console.log(msgstodelete)
  return msgstodelete
}
