const { Role } = require("../model/roleSchmea");

//------------------------------createRole-----------------------
const createRole = async (req,res) => {
    try {
        const {
            name,
        } = req.body

        const existingRole = await Role.findOne({name})
        console.log(existingRole);
        if (existingRole) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan ism mavjud"
            })
        }else {
            const newRole = new Role({
                name,
            })
            await newRole.save();

            return res.status(201).json({
                success: true,
                message: "Ism muvaffaqiyatli ro'xatdan otdi ",
                role: newRole,
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

// ------------getRole --------
const getRole  =  async (req, res) => {
     try {
            const roles = await Role.find({})
            res.json({
                success: true,
                message: "barcha ismlar ro'yxxatga olingan",
                innerData: roles,
            })
        }catch (error) {
            console,error("Error fetching stuffs:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi ism olishda  xatolik yuz berdi'
    
            })
    }
}

//-----------------------------GetRoleById-------------------------------------------
const getRoleById = async (req,res) => {
    try {
        const roleId =  req.params.id;

        const role = await Role.findById(roleId)

        if (!role) {
            return res.status(404).json({ message: "Role not faund"})

        }
        return res.status(200).json({message: "Role faund", role})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}

//----------------------------------deleteRole-------------------------------------------
const deleteRole = async (req, res) =>{
    try {
        const roleId = req.params.id

    const deleteRole =  await Role.findByIdAndDelete(roleId)
        if (!deleteRole) {
            return res.status(404).json({ message: "Role not faund"})

        }
        res.json({message: "Role deleled successfully", deleteRole})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

//---------------------updateRole----------------------------
const updateRole = async (req,res)=> {
    try {
        const {id} = req.params;
        const { name, } = req.body;
        const updateDate = {
            name,
        }
        const updateRole = await Role.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateRole) {
                    return res.status(404).json({
                        success: false,
                        message: "Role not faund"
                    })
                }
        
                res.json({
                    success: true,
                    message: "Role updeted successfully",
                    role: updateRole
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}
//------------------------------search--------------------
const searchRole = async (req,res) => {
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
            return res.json({ message: "ism topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching role", error);
        res.status(500).json({message: "Server error: Failed to fetch role"})
        
    }
}

module.exports = {
    createRole,
    getRole,
    getRoleById,  
    deleteRole,
    updateRole,
    searchRole
}