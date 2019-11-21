import * as functions from "firebase-functions"
import * as scheduler from "./scheduler"
// import * as admin from "firebase-admin"
// admin.initializeApp()

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.deleteExpiredRoom = functions
  .region("asia-northeast1")
  .pubsub.topic("deleteExpiredRoom")
  .onPublish(context => {
    scheduler.deleteExpiredRoom()
    return 0
  })
