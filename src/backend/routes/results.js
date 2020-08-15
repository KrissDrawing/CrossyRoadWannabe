const router = require("express").Router();
let Result = require("../models/result.model");

router.route("/").get((req, res) => {
  Result.find()
    .sort({ result: -1 })
    .limit(10)
    .then((results) => res.json(results))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const result = req.body.result;

  const newResult = new Result({ username, result });

  newResult
    .save()
    .then(() => res.json("result added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
