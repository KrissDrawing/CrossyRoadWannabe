const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB databease connection established successfully");
});

const resultsRouter = require("./routes/results");
app.use("/results", resultsRouter);

// app.get('/', (req, res) => {
//   return res.status(200).send('everything good');
// })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
