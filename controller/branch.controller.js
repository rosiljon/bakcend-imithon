const { Branch } = require("../model/branchSchema")

//  ------------postbranch ------------

const postBranch  = async (req, res) => {
    try {
        const {
            name,
            address,
            cal_number
        } = req.body;

        const existingBranch = await Branch.findOne({ name })
        console.log(existingBranch)
        if (existingBranch) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxatdan otgan foydalanuvchi mavjud"

            })

        }else {
            const newBranch  = new Branch({
            name,
            address,
            cal_number,
            })
            await newBranch.save();
            
            return  res.status(201).json({
                success: true,
                message: "Foydalanuvchi muvaffaquyatli ro'xatdan otdi ",
                branch: newBranch,

            })

        }
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message,
        })
    }
}

// ----------- get Branch -----------

const getBranch = async ( req , res) => {
    try {
        const branchs = await Branch.find({})
        res.json({
            success: true,
            message: "barcha foydalanuvchilar ro'yxxatga olingan",
            innerData: branchs,
        })
    }catch (error) {
        console.error("Error fetching branchs:", error)
        res.status(500).json({
            success: false,
            message: 'Serverda xatosi foydalanuvchilarni olishda  xatolik yuz berdi'

        })
    }
}

// ------------getBranchById---------------

const getBranchById  = async (req,res) => {
    try {
        const branchId = req.params.id;

        const branch  =await Branch.findById(branchId)

        if (!branch) {
            return res.status(404).json({ message: "Branch not faund"})

        }
        return res.status(200).json({message: "Branch faund", branch})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
    
}


// ---------deleteBranch---------

const deleteBranch =  async (req, res) => {
    try {
        const branchId = req.params.id;

        const deleteBranch  = await Branch.findByIdAndDelete(branchId)

        if (!deleteBranch) {
            return res.status(404).json({ message: "Branch not faund"})
        }
        res.json({ message: "Branch deteled successfully",deleteBranch})

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}


// ------------- update branch -----
const updateBranch = async (req,res)=> {
    try {
        const updateDate = Object.fromEntries(
            Object.entries(req.body).filter(([, value]) => value !== undefined)
        );

        const updatedBranch = await Branch.findByIdAndUpdate(req.params.id, updateDate, {
            new: true,
            runValidators: true,
        })

        if (!updatedBranch) {
            return res.status(404).json({
                success: false,
                message: "Branch not faund"
            })
        }

        res.json({
            success: true,
            message: "Branch updeted successfully",
            branch: updatedBranch,
        })
    }catch (error) {
        console.error("Error updating branch:", error);
        res.status(500).json({
            success: false,
            message: "Interval server Error",
            error: error.message,
        })
    }
}


// --------- search Branch ---------

const searchBranch  = async ( req,res) => {
    try {
        const { query } = req.query;
        
        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'sini yozing"})

        }
        const result = await Branch.find({
            $or: [
                {name: {$regex: query, $options: "i"}},
                {address: {$regex: query, $options: "i"}},
                {cal_number: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Foydalanuvchi topilmadi"})
        }
        res.json({result});

    }catch (error) {
        console.error("error fetching Branch", error);
        res.status(500).json({message: "Server error: Failed to fetch branch"})
        
    }

}

module.exports = {postBranch,getBranch,getBranchById,deleteBranch,updateBranch,searchBranch}