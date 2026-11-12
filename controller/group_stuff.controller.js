const {groupStuff} = require('../model/group_stuffSchema')

const postGroup_stuff = async (req, res) => {
    try {
        const {
            group_id,
            stuff_id,
        } = req.body;
        const existingGroup_stuff = await groupStuff.findOne({ group_id, stuff_id });
        console.log(existingGroup_stuff)
        if (existingGroup_stuff) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yhatdan otgan Id  mavjud",
            })
        }else {
            const newGroup_stuff = new groupStuff({
                group_id,
                stuff_id,
            })
            await newGroup_stuff.save();

            return res.status(201).json({
                success: true,
                message: "Id muvaffaqiyatli ro'yxatdan o'tdi",
                group_stuff: newGroup_stuff,
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

// --------get Group_stuff .................


const getGroup_stuff = async (req, res) => {
    try {
        const Group_stuff = await groupStuff.find({});
        res.json({
            success: true,
            message: 'barcha Id royxati olingan',
            innerData: Group_stuff
        });
    } catch (error) {
        console.error("Error fetching Id:", error);
        res.status(500).json({
            success: false,
            message: 'Serverda xatosi: Id olishda xatolik yuz berdi',

        });
    }
}

// ---------------- getGroup_stuffById---------

const getGroup_stuffById = async (req, res) => {
    try {
        const Group_stuffId = req.params.id;

        const group_stuff = await groupStuff.findById(Group_stuffId).populate("stuff_id").populate('group_id')

        if (!group_stuff) {
            return res.status(404).json({ message: "Group_stuff not faund" });
        }
        return res.status(200).json({ message: "Group_stuff faund", group_stuff });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
};

// --------- deleteGroup_stuff
const deleteGroup_stuff = async (req, res) => {
    try {
        const Group_stuffId = req.params.id;

        const deletedGroup_stuff = await groupStuff.findByIdAndDelete(Group_stuffId);

       if (!deletedGroup_stuff) {
            return res.status(404).json({ message: "Group_stuff not found" });
        }   

        res.json({ message: "Group_stuff deleted successfully", group_stuff: deletedGroup_stuff });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
       
};

module.exports = {postGroup_stuff,getGroup_stuff,getGroup_stuffById,deleteGroup_stuff}