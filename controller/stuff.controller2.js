const { Stuff } = require("../model/stuffSchema2");
// ----------------------------createStuff--------------------
const createStuff = async (req,res) => {
    try {
        const {
            first_name,
            last_name,
            phone_number,
            login,
            parol,
            is_active
        } = req.body

        const existingStuff = await Stuff.findOne({first_name})
        console.log(existingStuff);
        if (existingStuff) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan xodim mavjud"
            })
        }else {
            const newStuff = new Stuff({
                first_name,
                last_name,
                phone_number,
                login,
                parol,
                is_active
            })
            await newStuff.save();

            return res.status(201).json({
                success: true,
                message: "xodim muvaffaqiyatli ro'xatdan otdi ",
                role: newStuff,
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
//----------------------------------getStuff---------------
const getStuff  =  async (req, res) => {
     try {
            const stuff = await Stuff.find({})
            res.json({
                success: true,
                message: "barcha malumot ro'yxxatga olingan",
                innerData: stuff,
            })
        }catch (error) {
            console.error("Error fetching stuffs:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi malumot olishda  xatolik yuz berdi'
    
            })
    }
}
//--------------------getStuffById--------------------
const getStuffById = async (req,res) => {
    try {
        const stuffId =  req.params.id;

        const Stuff = await Stuff.findById(stuffId)

        if (!Stuff) {
            return res.status(404).json({ message: "Stuff not faund"})

        }
        return res.status(200).json({message: "Stuff faund", role})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}
//-------------deleteStuff----------------
const deleteStuff = async (req, res) =>{
    try {
        const stuffId = req.params.id

    const deleteStuff =  await Stuff.findByIdAndDelete(stuffId)
        if (!deleteRole) {
            return res.status(404).json({ message: "Stuff not faund"})

        }
        res.json({message: "Stuff deleled successfully", deleteStuff})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}
//-----------------updateStuff---------------
const updateStuff = async (req,res)=> {
    try {
        const {id} = req.params;
        const { name, } = req.body;
        const updateDate = {
            first_name,
            last_name,
            phone_number,
            parol
        }
        const updateRole = await Stuff.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!update) {
                    return res.status(404).json({
                        success: false,
                        message: "Stuff not faund"
                    })
                }
        
                res.json({
                    success: true,
                    message: "Stuff updeted successfully",
                    stuff: updateStuff
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}

const searchStuff = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "qidiruv sozini kiriting"})

        }
        const result = await Role.find({
            $or: [
                {name: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "stuff topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching Stuff", error);
        res.status(500).json({message: "Server error: Failed to fetch role"})
        
    }
}

module.exports = {
    createStuff,
    getStuff,
    getStuffById,
    deleteStuff,
    updateStuff,
    searchStuff
}