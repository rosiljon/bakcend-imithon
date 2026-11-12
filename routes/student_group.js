const { Router } = require("express")
const student_group = Router()

const {
    postStudent_group,
    getStudent_groupById,
    getStudent_group,
    deleteStudent_group,
} = require("../controller/student_group.controlle")
const {
    postStudent_groupValidateSchema,
} = require("../validation/student_groupValidation")

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
 *   name: StudentGroup
 *   description: Student va group bog'lanishlarini boshqarish
 */

/**
 * @swagger
 * /student_group/postStudent_group:
 *   post:
 *     summary: Studentni guruhga qo'shish
 *     tags: [StudentGroup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - group_id
 *             properties:
 *               student_id:
 *                 type: string
 *               group_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Student guruhga qo'shildi
 *       '400':
 *         description: Yaroqsiz so'rov yoki bog'lanish mavjud
 *       '500':
 *         description: Server xatosi
 */
student_group.post("/postStudent_group", validateSchema(postStudent_groupValidateSchema), postStudent_group)

/**
 * @swagger
 * /student_group/getStudent_group:
 *   get:
 *     summary: Barcha student-guruh bog'lanishlarini olish
 *     tags: [StudentGroup]
 *     responses:
 *       '200':
 *         description: Bog'lanishlar ro'yxati
 *       '500':
 *         description: Server xatosi
 */
student_group.get("/getStudent_group", getStudent_group)

/**
 * @swagger
 * /student_group/getStudent_groupById/{id}:
 *   get:
 *     summary: ID bo'yicha student-guruh bog'lanishini olish
 *     tags: [StudentGroup]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Bog'lanish topildi
 *       '404':
 *         description: Bog'lanish topilmadi
 *       '500':
 *         description: Server xatosi
 */
student_group.get("/getStudent_groupById/:id", getStudent_groupById)

/**
 * @swagger
 * /student_group/deleteStudent_group/{id}:
 *   delete:
 *     summary: ID bo'yicha student-guruh bog'lanishini o'chirish
 *     tags: [StudentGroup]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Bog'lanish o'chirildi
 *       '404':
 *         description: Bog'lanish topilmadi
 *       '500':
 *         description: Server xatosi
 */
student_group.delete("/deleteStudent_group/:id", deleteStudent_group)

module.exports = { student_group }