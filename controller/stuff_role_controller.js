const {StuffRole} = require('../model/stuffSchema3')

const postStuff_role = async (req, res) => {
    try {
        const {
            role_id,
            stuff_id,
        } = req.body;
        const existingStuff_role = await StuffRole.findOne({ role_id, stuff_id });
        console.log(existingStuff_role)
        if (existingStuff_role) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yhatdan otgan Id  mavjud",
            })
        }else {
            const newStuff_role = new StuffRole({
                role_id,
                stuff_id,
            })
            await newStuff_role.save();

            return res.status(201).json({
                success: true,
                message: "Id muvaffaqiyatli ro'yxatdan o'tdi",
                stuff_role: newStuff_role,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message,
        });
    }
}

// --------get stuff_role .................


const getStuff_role = async (req, res) => {
    try {
        const Stuff_Roles = await StuffRole.find({});
        res.json({
            success: true,
            message: 'barcha Id royxati olingan',
            innerData: Stuff_Roles
        });
    } catch (error) {
        console.error("Error fetching Id:", error);
        res.status(500).json({
            success: false,
            message: 'Serverda xatosi: Id olishda xatolik yuz berdi',

        });
    }
}

// ---------------- getStuff_roleById---------

const getStuff_RoleById = async (req, res) => {
    try {
        const stuff_roleId = req.params.id;

        const stuff_role = await StuffRole.findById(stuff_roleId).populate("stuff_id").populate('role_id')

        if (!stuff_role) {
            return res.status(404).json({ message: "stuff_role not faund" });
        }
        return res.status(200).json({ message: "stuff_role faund", stuff_role });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
};

// --------- deleteStuff_role
const deleteStuff_role = async (req, res) => {
    try {
        const stuff_roleId = req.params.id;

        const deletedstuff_role = await StuffRole.findByIdAndDelete(stuff_roleId);

       if (!deletedstuff_role) {
            return res.status(404).json({ message: "Stuff_role not found" });
        }   

        res.json({ message: "stuff_role deleted successfully", stuff_role: deletedstuff_role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
       
};

module.exports = {postStuff_role,getStuff_role,getStuff_RoleById,deleteStuff_role}