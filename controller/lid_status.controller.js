const { Lid_status } = require("../model/lid_statusSchema")

// ------------- post Status -----
const postStatus = async (req,res) => {
    try {
        const {
            status,
        } = req.body

        const existingStatus = await Lid_status.findOne({status})
        console.log(existingStatus);
        if (existingStatus) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan ism mavjud"
            })
        }else {
            const newStatus = new Lid_status({
                status,
            })
            await newStatus.save();

            return res.status(201).json({
                success: true,
                message: "Ism muvaffaqiyatli ro'xatdan otdi ",
                status: newStatus,
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

// ------------get Status --------


const getStatus  =  async (req, res) => {
     try {
            const status = await Lid_status.find({})
            res.json({
                success: true,
                message: "barcha ismlar ro'yxxatga olingan",
                innerData: status,
            })
        }catch (error) {
            console.error("Error fetching Lid_status:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi ism olishda  xatolik yuz berdi'
    
            })
    }
}

// ------get Status BYId

const getStatusById = async (req,res) => {
    try {
        const statusId =  req.params.id;

        const status = await Lid_status.findById(statusId)

        if (!status) {
            return res.status(404).json({ message: "Lid status not faund"})

        }
        return res.status(200).json({message: "Lid status faund", status})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete status

const deleteStatus = async (req, res) =>{
    try {
        const statusId = req.params.id

    const deteleStatus =  await Lid_status.findByIdAndDelete(statusId)
        if (!deteleStatus) {
            return res.status(404).json({ message: "Status not faund"})

        }
        res.json({message: "Status deleled successfully", status: deteleStatus})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Status

const updateStatus = async (req,res)=> {
    try {
        const {id} = req.params;
        const { status, } = req.body;
        const updateDate = {
            status,
        }
        const updateStatus = await Lid_status.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateStatus) {
                    return res.status(404).json({
                        success: false,
                        message: "Status not faund"
                    })
                }
        
                res.json({
                    success: true,
                    message: "Status updeted successfully",
                    status: updateStatus
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}

// ----------- search 

const searchStatus = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'zini yozing"})

        }
        const result = await Lid_status.find({
            $or: [
                {status: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "status topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching status", error);
        res.status(500).json({message: "Server error: Failed to fetch status"})
        
    }
}


module.exports = { postStatus,getStatus,getStatusById,searchStatus,deleteStatus,updateStatus} 