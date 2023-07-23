import mongoose from 'mongoose';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

export const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin'}).select('-password');
        res.status(200).json(admins);
    } catch(error) {

    }
}

export const getUserPerformance = async (req, res) => {
    console.log('getUserPerformance');
    try {
        const { id } = req.params;
        console.log(id);
    
        const userWithStats = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id)}},
            { 
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateStats"
                }
            },
            { $unwind: "$affiliateStats"}
        ]);
        console.log('userWithStats', userWithStats);
    
        const saleTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map(id => Transaction.findById(id))
        );
        console.log('saleTransactions', saleTransactions);
    
        const filteredSaleTransactions = saleTransactions.filter(
            transaction => transaction !== null
        );
        console.log(saleTransactions, filteredSaleTransactions);
        res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions });
    } catch(error) {

    }
}