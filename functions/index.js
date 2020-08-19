const functions = require("firebase-functions");
const express = require("express");
const corsModule = require("cors");
const app = express();
const admin = require("firebase-admin");

const cors = corsModule({ origin: true });

admin.initializeApp({
  databaseURL: "https://us-central1-crossyroadwannabe.cloudfunctions.net",
});

exports.results = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    admin
      .firestore()
      .collection("results")
      .orderBy("result", "desc")
      .limit(10)
      .get()
      .then((snapshot) => {
        const obj = snapshot.docs.map((doc) => doc.data());
        return res.status(200).json(obj);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

exports.addResult = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method === "POST") {
      const username = req.body.username;
      const result = req.body.result;

      admin
        .firestore()
        .collection("results")
        .doc()
        .set({ username: username, result: result })
        .then(() => res.json("result added"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});
