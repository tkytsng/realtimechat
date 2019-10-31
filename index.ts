import * as functions from "firebase-functions"
import * as scheduler from "./scheduler"

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.deleteExpiredMessage = functions.pubsub
  .schedule("every 1 minuites")
  .onRun(async context => {
    await scheduler.deleteExpiredMessage()
  })
