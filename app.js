const express = require("express");
const {
  getAllCandidates,
  getVotingStatus,
  getRemainingTime,
  voting,
} = require("./controller");

const app = express();

app.use(express.json());

app.get("/api/candidates", getAllCandidates);
app.get("/api/votingStatus", getVotingStatus);
app.get("/api/remainingTime", getRemainingTime);
app.post("/api/vote", voting);

app.listen(5000, () => {
  console.log("listening on port 5000");
});