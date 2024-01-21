const { fetchAllCandidates, checkVotingStatus, checkRemainingTime, vote } = require("./scripts/interact");

const getAllCandidates = async (req, res, next) =>{
    try {
        const candidates = await fetchAllCandidates()
        return res.status(200).json({candidates})
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: error.message });
    }
}

const getVotingStatus = async (req, res, next) =>{
    try {
        const status = await checkVotingStatus();
        return res.status(200).json({ status });
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const getRemainingTime = async (req, res, next) =>{
    try {
        const remainingTime = await checkRemainingTime();
         return res.status(200).json({ remainingTime });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const voting = async (req, res, next) =>{
    const { candidateIndex } = req.body
    console.log(candidateIndex)
    // if(!candidateIndex){
    //     return res.status(404).json({message: "Please input the candidate index"})
    // }
    try {
        await vote(candidateIndex);
        return res.status(200).json({message: "Voting Successful"})
    } catch (error) {
        return res.status(400).json({ message: error});
    }
}

module.exports = {
  getAllCandidates,
  getVotingStatus,
  getRemainingTime,
  voting,
};

