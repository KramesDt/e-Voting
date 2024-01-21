const { fetchAllCandidates, checkVotingStatus, checkRemainingTime, vote } = require("./scripts/interact");

const getAllCandidates = async (res, req, next) =>{
    try {
        const candidates = await fetchAllCandidates()
        res.status(200).json({candidates})
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getVotingStatus = async (res, req, next) =>{
    try {
        const status = await checkVotingStatus();
        res.status(200).json({ status });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getRemainingTime = async (res, req, next) =>{
    try {
        const remainingTime = await checkRemainingTime();
        res.status(200).json({ remainingTime });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const voting = async (res, req, next) =>{
    const { candidateIndex } = req.body
    if(!candidateIndex){
        return res.status(404).json({message: "Please input the candidate index"})
    }
    try {
        await vote(candidateIndex);
        res.status(200).json({message: "Voting Successful"})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
  getAllCandidates,
  getVotingStatus,
  getRemainingTime,
  voting,
};

