const {Group} = require("../model/groupSchema6")

const postGroup = async (req, res) => {
    try {
        const {
            group_name,
            lesson_start_time,
            lesson_continuous,
            lesson_week_day,
            group_stage_idint,
            room_number,
            room_floor,
            branch_id,
            lessons_quant,
            is_active,
        } = req.body;

        const existingGroup = await Group.findOne({ group_name });
        console.log(existingGroup)
        if (existingGroup) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yhatdan otgan Group mavjud",
            })
        } else {
            const newGroup = new Group({
                group_name,
                lesson_start_time,
                lesson_continuous,
                lesson_week_day,
                group_stage_idint,
                room_number,
                room_floor,
                branch_id,
                lessons_quant,
                is_active,
            });
            await newGroup.save();

            return res.status(201).json({
                success: true,
                message: "Group muvaffaqiyatli ro'yxatdan o'tdi",
                group: newGroup,
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
};

// ----------
const getGroup = async (req, res) => {
    try {
        const group = await Group.find({});
        res.json({
            success: true,
            message: 'Barcha Group royxati olingan',
            innerData: group
        });
    } catch (error) {
        console.error("Error fetching Group:", error);
        res.status(500).json({
            success: false,
            message: 'Serverda xatosi: Group olishda xatolik yuz berdi',

        });
    }
}
// ---------------------

const getGroupById = async (req, res) => {
    try {
        const groupId = req.params.id;

        const group = await Group.findById(groupId).populate("group_stage_idint").populate("branch_id")

        if (!group) {
            return res.status(404).json({ message: "Group not faund" });
        }
        return res.status(200).json({ message: "Group faund", group });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
};

const deleteGroup = async (req, res) => {
    try {
        const groupId = req.params.id;

        const deletedGroup = await Group.findByIdAndDelete(groupId);

       if (!deletedGroup) {
            return res.status(404).json({ message: "Group not found" });
        }   

        res.json({ message: "Group deleted successfully", group: deletedGroup });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
       
};

// ---------------------


const updateGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const { group_name, lesson_start_time, lesson_continuous, lesson_week_day, room_number, room_floor, lessons_quant,  } = req.body;

        const updateDate = {group_name, lesson_start_time, lesson_continuous, lesson_week_day, room_number, room_floor, lessons_quant, };
        

        const uptetedGroup = await Group.findByIdAndUpdate(id, updateDate, {
        new: true,
        })

        if (!uptetedGroup) {
            return res.status(404).json({ 
                success: false,
                message: "Group not found" 
            });

        }

        res.json({
            success: true,
            message: "Group updated successfully",
            group: uptetedGroup,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Irternal Server Error",
            error: error.message,
        });
    }
}


// ----------------search Group ----------------

const searchGroup  = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Qidiruv So'zini kiriting"});    
            
        }

        const result = await  Group.find({
            $or: [
                { group_name: { $regex: query, $options: "i" } },
            ]
            });
            if (result.length === 0) {
                return res.json({ message: "Foydalanuvchi topilmadi" });
            }
            res.json({result}); 
    }catch (error) {
        console.error("error fetching users", error);
        res.status(500).json({message:"Server error: Failed to fetch users."})
    }
}

module.exports = {
    postGroup,getGroup,getGroupById,deleteGroup,updateGroup,searchGroup
}