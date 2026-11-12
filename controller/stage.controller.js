const {Stage } = require("../model/stageRoute")

// ------------- postStage -----
const postStage = async (req,res) => {
    try {
        const {
            name,
        } = req.body

        const existingStage = await Stage.findOne({name})
        console.log(existingStage);
        if (existingStage) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan ism mavjud"
            })
        }else {
            const newStage = new Stage({
                name,
            })
            await newStage.save();

            return res.status(201).json({
                success: true,
                message: "Ism muvaffaqiyatli ro'xatdan otdi ",
                stage: newStage,
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

// ------------get Role --------


const getStage  =  async (req, res) => {
     try {
            const stages = await Stage.find({})
            res.json({
                success: true,
                message: "barcha ismlar ro'yxxatga olingan",
                innerData: stages,
            })
        }catch (error) {
            console.error("Error fetching stages:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi ism olishda  xatolik yuz berdi'
    
            })
    }
}

// ------getStageBYId

const getStageById = async (req,res) => {
    try {
        const stageId =  req.params.id;

        const stage = await Stage.findById(stageId)

        if (!stage) {
            return res.status(404).json({ message: "Stage not faund"})

        }
        return res.status(200).json({message: "Stage faund", stage})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Stage

const deleteStage = async (req, res) =>{
    try {
        const stageId = req.params.id

    const deteleStage =  await Stage.findByIdAndDelete(stageId)
        if (!deteleStage) {
            return res.status(404).json({ message: "Stage not faund"})

        }
        res.json({message: "Stage deleled successfully", stage: deteleStage})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Stage

const updateStage = async (req,res)=> {
    try {
        const {id} = req.params;
        const { name, } = req.body;
        const updateDate = {
            name,
        }
        const updateStage = await Stage.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateStage) {
                    return res.status(404).json({
                        success: false,
                        message: "Stage not faund"
                    })
                }
        
                res.json({
                    success: true,
                    message: "Stage updeted successfully",
                    stage: updateStage
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}

// ----------- search 

const searchStage = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'sini yozing"})

        }
        const result = await Stage.find({
            $or: [
                {name: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Ism topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching stage", error);
        res.status(500).json({message: "Server error: Failed to fetch role"})
        
    }
}


module.exports = { postStage,getStage,getStageById,deleteStage,updateStage,searchStage}
 