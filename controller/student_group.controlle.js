const { studentGroup } = require("../model/student_group")

const postStudent_group = async (req, res) => {
    try {
        const { student_id, group_id } = req.body
        const existingStudentGroup = await studentGroup.findOne({ student_id, group_id })

        if (existingStudentGroup) {
            return res.status(400).json({
                success: false,
                message: "Bu student ushbu guruhga oldin qo'shilgan",
            })
        }

        const newStudentGroup = new studentGroup({ student_id, group_id })
        await newStudentGroup.save()

        return res.status(201).json({
            success: true,
            message: "Student guruhga muvaffaqiyatli qo'shildi",
            student_group: newStudentGroup,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message,
        })
    }
}

const getStudent_group = async (req, res) => {
    try {
        const studentGroups = await studentGroup.find({})
            .populate("student_id")
            .populate("group_id")

        return res.json({
            success: true,
            message: "Barcha student-guruh bog'lanishlari",
            innerData: studentGroups,
        })
    } catch (error) {
        console.error("Error fetching student groups:", error)
        return res.status(500).json({
            success: false,
            message: "Student-guruh ma'lumotlarini olishda server xatosi",
        })
    }
}

const getStudent_groupById = async (req, res) => {
    try {
        const studentGroupData = await studentGroup.findById(req.params.id)
            .populate("student_id")
            .populate("group_id")

        if (!studentGroupData) {
            return res.status(404).json({
                success: false,
                message: "Student-guruh bog'lanishi topilmadi",
            })
        }

        return res.status(200).json({
            success: true,
            student_group: studentGroupData,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
        })
    }
}

const deleteStudent_group = async (req, res) => {
    try {
        const deletedStudentGroup = await studentGroup.findByIdAndDelete(req.params.id)

        if (!deletedStudentGroup) {
            return res.status(404).json({
                success: false,
                message: "Student-guruh bog'lanishi topilmadi",
            })
        }

        return res.json({
            success: true,
            message: "Student-guruh bog'lanishi o'chirildi",
            student_group: deletedStudentGroup,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
        })
    }
}

module.exports = {
    postStudent_group,
    getStudent_group,
    getStudent_groupById,
    deleteStudent_group,
}