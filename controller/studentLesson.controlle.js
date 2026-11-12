const { StudentLesson } = require("../model/studentLesson")



//  ------------postStudentLesson ------------

const postStudentLesson = async (req, res) => {
    try {
        const {
            lesson_id,
            student_id,
            is_there,
            reason,
            be_paid
        } = req.body;

        const existingStudentLesson = await StudentLesson.findOne({ lesson_id, student_id })
        console.log(existingStudentLesson)
        if (existingStudentLesson) {
            return res.status(400).json({
                success: false,
                message: "Bu studentLesson bn ro'yxatdan otgan yozuv mavjud"

            })

        } else {
            const newStudentLesson = new StudentLesson({
                lesson_id,
                student_id,
                is_there,
                reason,
                be_paid,
            })
            await newStudentLesson.save();

            return res.status(201).json({
                success: true,
                message: "Student_lesson muvaffaquyatli ro'xatdan otdi ",
                student_lesson: newStudentLesson,

            })

        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message,
        })
    }
}

// ----------- get StudentLesson -----------

const getStudentLesson = async (req, res) => {
    try {
        const studentLessons = await StudentLesson.find({})
        res.json({
            success: true,
            message: "barcha student_lesson ro'yxxatga olingan",
            innerData: studentLessons,
        })
    } catch (error) {
        console.error("Error fetching student_lesson:", error)
        res.status(500).json({
            success: false,
            message: 'Serverda xatosi student_lesson olishda  xatolik yuz berdi'

        })
    }
}

// ------------getStudentLessonById---------------

const getStudentLessonById = async (req, res) => {
    try {
        const studentLessonId = req.params.id;

        const studentLesson = await StudentLesson.findById(studentLessonId).populate("lesson_id").populate("student_id")

        if (!studentLesson) {
            return res.status(404).json({ message: "Student_lesson not faund" })

        }
        return res.status(200).json({ message: "Student_lesson faund", studentLesson })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }

}


// ---------deleteStudentLesson---------

const deleteStudentLesson = async (req, res) => {
    try {
        const studentLessonId = req.params.id;

        const deletedStudentLesson = await StudentLesson.findByIdAndDelete(studentLessonId)

        if (!deletedStudentLesson) {
            return res.status(404).json({ message: "Student_lesson not faund" })
        }
        res.json({ message: "Student_lesson deteled successfully", deletedStudentLesson })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


// ------------- update StudentLesson -----
const updateStudentLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason, } = req.body;

        const updateDate = {
            reason,
        }


        const updatedStudentLesson = await StudentLesson.findByIdAndUpdate(id, updateDate, {
            new: true,
            runValidators: true,
        })

        if (!updatedStudentLesson) {
            return res.status(404).json({
                success: false,
                message: "Student_lesson not faund"
            })
        }

        res.json({
            success: true,
            message: "Student_lesson updeted successfully",
            student_lesson: updatedStudentLesson,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}

// --------- search StudentLesson ---------

const searchStudentLesson = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Qidiruv So'sini yozing" })

        }
        const result = await StudentLesson.find({
            $or: [
                { reason: { $regex: query, $options: "i" } }
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Student_lesson topilmadi" })
        }
        res.json({ result });

    } catch (error) {
        console.error("error fetching student_lesson", error);
        res.status(500).json({ message: "Server error: Failed to fetch student_lesson" })

    }

}

module.exports = { postStudentLesson, getStudentLesson, getStudentLessonById, deleteStudentLesson, updateStudentLesson, searchStudentLesson }