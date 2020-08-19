const router = require("express").Router();
const functions = require("firebase-functions");
const admin = require("firebase-admin");

router.route("/").get((req, res) => {
  admin
    .firestore()
    .collection("results")
    .orderBy("result", "desc")
    .get()
    .then((snapshot) => {
      return res.status(200).json(snapshot.data());
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const result = req.body.result;

  admin
    .firestore()
    .collection("results")
    .doc()
    .set({ username, result })
    .then(() => res.json("result added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
