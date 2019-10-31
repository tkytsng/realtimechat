import firebase from "firebase"

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCPaXM2BWY36ZKBCvOM7GhMSzPSjbXBvoc",
    authDomain: "realtimechat-df6f2.firebaseapp.com",
    databaseURL: "https://realtimechat-df6f2.firebaseio.com",
    projectId: "realtimechat-df6f2",
    storageBucket: "realtimechat-df6f2.appspot.com",
    messagingSenderId: "444962240205",
    appId: "1:444962240205:web:f00a5d50c14a0359d91b84",
    measurementId: "G-FYY6CC9MY9"
  })
  // firebase.initializeApp({
  //   apiKey: "AIzaSyCPaXM2BWY36ZKBCvOM7GhMSzPSjbXBvoc",
  //   authDomain: "realtimechat-df6f2.firebaseapp.com",
  //   databaseURL: "https://realtimechat-df6f2.firebaseio.com",
  //   projectId: "realtimechat-df6f2",
  //   storageBucket: "",
  //   messagingSenderId: "444962240205",
  //   appId: "1:444962240205:web:e6a214fcd5336ccad91b84",
  //   measurementId: "G-HE68EJ04C8"
  // })
}

export default firebase
