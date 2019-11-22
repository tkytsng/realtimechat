import * as admin from "firebase-admin"
admin.initializeApp()

export function deleteExpiredRoom(expiredTimeMin = 30) {
  const nowSec = admin.firestore.Timestamp.now().seconds

  admin
    .firestore()
    .collection(`rooms`)
    .get()
    .then(query => {
      if (query.size === 0) {
        return 0
      }

      const rooms = query.docs
      let batch = admin.firestore().batch()
      for (const room of rooms) {
        if (room.data().createTime.seconds + expiredTimeMin * 60 <= nowSec) {
          batch.delete(room.ref)
        }
      }

      batch.commit()
      return 0
    })
}
