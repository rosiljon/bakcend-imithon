const { Reason_lid } = require("../model/reason_lidSchema")

// ------------- post Reason ----- 
const postReason = async (req,res) => {
    try {
        const {
            reason_lid,
        } = req.body

        const existingReason = await Reason_lid.findOne({reason_lid})
        console.log(existingReason);
        if (existingReason) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan ism mavjud"
            })
        }else {
            const newReason = new Reason_lid({
                reason_lid,
            })
            await newReason.save();

            return res.status(201).json({
                success: true,
                message: "Ism muvaffaqiyatli ro'xatdan otdi ",
                reason_lid: newReason,
            })
        }
        
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            seccuss: false,
            message: "Server xatosi",
            error: error.message,
        })
        
    }
}

// ------------get Reason --------


const getReason  =  async (req, res) => {
     try {
            const reason = await Reason_lid.find({})
            res.json({
                success: true,
                message: "barcha ismlar ro'yxxatga olingan",
                innerData: reason,
            })
        }catch (error) {
            console.error("Error fetching Reason_lid:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi ism olishda  xatolik yuz berdi'
    
            })
    }
}

// ------get Reason BYId  

const getReasonById = async (req,res) => {
    try {
        const reasonId =  req.params.id;

        const reason = await Reason_lid.findById(reasonId)

        if (!reason) {
            return res.status(404).json({ message: "Reason_lid not faund"})

        }
        return res.status(200).json({message: "Reason_lid faund", reason})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Reason

const deleteReason = async (req, res) =>{
    try {
        const reasonId = req.params.id

    const deteleReason =  await Reason_lid.findByIdAndDelete(reasonId)
        if (!deteleReason) {
            return res.status(404).json({ message: "Reason not faund"})

        }
        res.json({message: "Reason deleled successfully", reason_lid: deteleReason})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Reason

const updateReason = async (req,res)=> {
    try {
        const {id} = req.params;
        const { reason_lid, } = req.body;
        const updateDate = {
            reason_lid,
        }
        const updateReason = await Reason_lid.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateReason) {
                    return res.status(404).json({
                        success: false,
                        message: "Reason not faund"
                    })
                }
        
                res.json({
                    success: true,
                    message: "Reason updeted successfully",
                    reason_lid: updateReason
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}

// ----------- search Status

const searchReason = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'zini yozing"})

        }
        const result = await Reason_lid.find({
            $or: [
                {reason_lid: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "reason topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching reason", error);
        res.status(500).json({message: "Server error: Failed to fetch reason"})
        
    }
}


module.exports = { postReason,getReason,getReasonById,searchReason,deleteReason,updateReason} 