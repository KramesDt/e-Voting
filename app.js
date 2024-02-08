const express = require("express");
const cors = require("cors");

const {
  getAllCandidates,
  getVotingStatus,
  getRemainingTime,
  voting,
} = require("./controller");

const corsOptions = {
  origin: "*",
  methods:["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the decentralised voting application" });
});

app.get("/api/candidates", getAllCandidates);
app.get("/api/votingStatus", getVotingStatus);
app.get("/api/remainingTime", getRemainingTime);
app.post("/api/vote", voting);

app.listen(5000, () => {
  console.log("listening on port 5000");
});
