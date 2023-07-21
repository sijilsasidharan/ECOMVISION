import OverallStat from "../models/OverallStats.js";

export const getSales = async (req, res) => {
    try {
        const overallStats = await OverallStat.find();
        res.json(overallStats[0]);
    } catch(error) {
        // res.status(404).json({ message: error.message });
    }
}