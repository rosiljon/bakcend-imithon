const { Router } = require('express')
const studentLessons = Router();
const { postStudentLesson, getStudentLessonById, getStudentLesson, deleteStudentLesson, updateStudentLesson, searchStudentLesson } = require("../controller/studentLesson.controlle")
const {
    postStudentLessonValidationSchema,
    updateStudentLessonValidationSchema,
} = require("../validation/student_lessonValidation")

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
*   name: StudentLesson
*   description: StudentLesson boshqarish uchun API endpointlari
*/


/**
 * @swagger
 * /studentLessons/postStudentLesson:
 *   post:
 *     summary: Yangi StudentLesson ro'yxatdan o'tkazish
 *     tags: [StudentLesson]
 *     description: Yangi StudentLesson yaratish 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lesson_id:
 *                 type: string
 *               student_id:
 *                 type: string
 *               is_there:
 *                 type: boolean
 *               reason:
 *                 type: string
 *               be_paid:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: StudentLesson muvaffaqiyatli ro'yxatdan o'tdi
 *       '400':
 *         description: Yomon so'rov , validatsiya xatolari
 *       '500': 
 *         description: Server xatosi
 */
studentLessons.post("/postStudentLesson", validateSchema(postStudentLessonValidationSchema), postStudentLesson);


/**
 * @swagger
 * /studentLessons/getStudentLesson:
 *   get:
 *     summary: Barcha StudentLesson olish
 *     tags: [StudentLesson]
 *     description: Barcha StudentLesson olish
 *     responses:
 *       '200':
 *         description: Barcha StudentLesson muvaffaqiyatli olindi
 *       '500':
 *         description: Server xatosi
 */
studentLessons.get("/getStudentLesson", getStudentLesson);


/** 
 * @swagger
 * /studentLessons/getStudentLessonById/{id}:
 *   get:
 *     summary: StudentLesson ID bo'yicha olish
 *     tags: [StudentLesson]
 *     description: StudentLesson ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: StudentLesson ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: StudentLesson muvaffaqiyatli olindi
 *       '404':
 *         description: StudentLesson topilmadi
 *       '500':
 *         description: Server xatosi
 */
studentLessons.get("/getStudentLessonById/:id", getStudentLessonById);


/**
 * @swagger
 * /studentLessons/updateStudentLessonById/{id}:
 *   put:
 *     summary: StudentLessonni yangilash
 *     tags: [StudentLesson]
 *     description: StudentLessonni ID bo'yicha yangilash
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
 *               reason:
 *                 type: string
 *     responses:
 *       '200':
 *         description: StudentLesson muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatolari
 *       '404':
 *         description: StudentLesson topilmadi
 *       '500':
 *         description: Server xatosi
 */
studentLessons.put("/updateStudentLessonById/:id", validateSchema(updateStudentLessonValidationSchema), updateStudentLesson);


/**
 * @swagger
 * /studentLessons/deleteStudentLesson/{id}:
 *   delete:
 *     summary: Delete a StudentLesson by ID
 *     tags: [StudentLesson]
 *     description: Delete a StudentLesson by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the StudentLesson to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: StudentLesson successfully deleted
 *       '404':
 *         description: StudentLesson not found
 *       '500':
 *         description: Server error
*/
studentLessons.delete("/deleteStudentLesson/:id", deleteStudentLesson);


/**
 * @swagger
 * /studentLessons/searchStudentLesson:
 *   get:
 *     summary: "StudentLessonni qidirish"
 *     tags: [StudentLesson]
 *     description: "StudentLessonni qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "StudentLesson muvaffaqiyatli topildi"
 *       "404":
 *         description: "StudentLesson topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
studentLessons.get('/searchStudentLesson', searchStudentLesson)



module.exports = { studentLessons };