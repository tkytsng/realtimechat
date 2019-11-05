import * as functions from "firebase-functions"
// import * as scheduler from "./scheduler"

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// exports.deleteExpiredRoom = functions
//   .region("asia-northeast1")
//   .pubsub.schedule("every 5 minuites")
//   .onRun(async context => {
//     // await scheduler.deleteExpiredRoom()
//     console.log(`test`)
//     return 0
//   })
exports.scheduledFunction = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(context => {
    console.log("This will be run every 5 minutes!")
    return null
  })

// exports.webhookAsia = functions
//   .region("asia-northeast1")
//   .https.onRequest((req, res) => {
//     res.send("Hello")
//   })
