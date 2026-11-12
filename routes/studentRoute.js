const { Router } = require("express")
const students = Router();

const { postStudent, getStudent, getStudentById, searchStudent, deleteStudent, updateStudent } = require('../controller/student.controller')
const {
    studentValidationSchema,
    updateStudentValidationSchema,
} = require("../validation/studentValidation")

const validateSchema = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    next()
}

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: "Studentlarni boshqarish uchun API endpointlar"
 */


/**
 * @swagger
 * /students/postStudent:
 *   post:
 *     summary: "Yangi student ro'yxatdan o'tkazish"
 *     tags: [Student]
 *     description: "Yangi student yaratish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lid_id:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               bithday:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *     responses:
 *       "201":
 *         description: "Student muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */

students.post('/postStudent', validateSchema(studentValidationSchema), postStudent)

/**
 * @swagger
 * /students/getStudent:
 *   get:
 *     summary: "Barcha studentlarni olish"
 *     tags: [Student]
 *     description: "Barcha studentlarni olish"
 *     responses:
 *       "200":
 *         description: "Barcha studentlar muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
students.get('/getStudent', getStudent)


/**
 * @swagger
 * /students/getStudentById/{id}:
 *   get:
 *     summary: "ID bo'yicha student olish"
 *     tags: [Student]
 *     description: "Studentni ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Student muvaffaqiyatli olindi"
 *       "404":
 *         description: "Student topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
students.get('/getStudentById/:id', getStudentById)

/**
 * @swagger
 * /students/deleteStudent/{id}:
 *   delete:
 *     summary: "Studentni ID bo'yicha o'chirish"
 *     tags: [Student]
 *     description: "Studentni ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Student muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Student topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
students.delete('/deleteStudent/:id', deleteStudent)


/**
 * @swagger
 * /students/updateStudentById/{id}:
 *   put:
 *     summary: "Studentni yangilash"
 *     tags: [Student]
 *     description: "Studentni ID bo'yicha yangilash"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               bithday:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "Student muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Student topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
students.put('/updateStudentById/:id', validateSchema(updateStudentValidationSchema), updateStudent)

/**
 * @swagger
 * /students/searchStudent:
 *   get:
 *     summary: "Student qidirish"
 *     tags: [Student]
 *     description: "Student qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Student muvaffaqiyatli topildi"
 *       "404":
 *         description: "Student topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
students.get('/searchStudent', searchStudent)


module.exports = { students }