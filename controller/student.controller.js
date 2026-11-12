const { Student } = require("../model/studentSchema")

const postStudent = async (req, res) => {
    try {
        const {
            lid_id,
            first_name,
            last_name,
            phone_number,
            bithday,
            gender
        } = req.body;

        const existingStudent = await Student.findOne({ phone_number })
        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: "Bu raqam bilan ro'yxatdan o'tgan student mavjud",

            })

        } else {
            const newStudent = new Student({
                lid_id,
                first_name,
                last_name,
                phone_number,
                bithday,
                gender,
            })
            await newStudent.save();

            return res.status(201).json({
                success: true,
                message: "Student muvaffaqiyatli ro'yxatdan o'tdi",
                student: newStudent,

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

// ----------- get Lid -----------

const getStudent = async (req, res) => {
    try {
        const students = await Student.find({})
        res.json({
            success: true,
            message: "Barcha studentlar ro'yxati",
            innerData: students,
        })
    } catch (error) {
        console.error("Error fetching students:", error)
        res.status(500).json({
            success: false,
            message: "Studentlarni olishda server xatosi",

        })
    }
}

// ------------getLidById---------------

const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;

        const student = await Student.findById(studentId)

        if (!student) {
            return res.status(404).json({ message: "Student topilmadi" })

        }
        return res.status(200).json({ message: "Student topildi", student })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }

}


// ---------deleteLid---------

const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        const deletedStudent = await Student.findByIdAndDelete(studentId)

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student topilmadi" })
        }
        res.json({ message: "Student muvaffaqiyatli o'chirildi", student: deletedStudent })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


// ------------- update Lid -----
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { lid_id, first_name, last_name, phone_number, bithday, gender } = req.body;

        const updateDate = {
            lid_id,
            first_name,
            last_name,
            phone_number,
            bithday,
            gender,
        }


        const updatedStudent = await Student.findByIdAndUpdate(id, updateDate, {
            new: true,
            runValidators: true,
        })

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student topilmadi",
            })
        }

        res.json({
            success: true,
            message: "Student muvaffaqiyatli yangilandi",
            student: updatedStudent,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}


// --------- search Lid ---------

const searchStudent = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Qidiruv So'sini yozing" })

        }
        const result = await Student.find({
            $or: [
                { first_name: { $regex: query, $options: "i" } },
                { last_name: { $regex: query, $options: "i" } },
                { phone_number: { $regex: query, $options: "i" } },
            ]
        })

        if (result.length === 0) {  
            return res.json({ message: "Student topilmadi" })
        }
        res.json({ result });

    } catch (error) {
        console.error("Error searching students:", error)
        res.status(500).json({ message: "Student qidirishda server xatosi" })

    }

}

module.exports = { postStudent, getStudent, getStudentById, deleteStudent, updateStudent, searchStudent }