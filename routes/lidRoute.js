const { Router } = require("express")
const lid = Router()

const {
    postLid,
    getLid,
    getLidById,
    updateLid,
    deleteLid,
    searchLid,
} = require("../controller/lid.controller")
const {
    postValidationSchema,
    updateLidValidationSchema,
} = require("../validation/lidValidation")

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
 *   name: Lid
 *   description: "Lidlarni boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /lid/postLid:
 *   post:
 *     summary: "Yangi lid qo'shish"
 *     tags: [Lid]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - phone_number
 *               - lid_stage_id
 *               - test_date
 *               - trial_lesson_date
 *               - trial_lesson_time
 *               - trial_lesson_group_id
 *               - lid_status_id
 *               - cancel_reson_id
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               lid_stage_id:
 *                 type: string
 *               test_date:
 *                 type: string
 *               trial_lesson_date:
 *                 type: string
 *               trial_lesson_time:
 *                 type: string
 *               trial_lesson_group_id:
 *                 type: string
 *               lid_status_id:
 *                 type: string
 *               cancel_reson_id:
 *                 type: string
 *     responses:
 *       "201":
 *         description: "Lid muvaffaqiyatli yaratildi"
 *       "400":
 *         description: "Yaroqsiz so'rov"
 *       "500":
 *         description: "Server xatosi"
 */
lid.post("/postLid", validateSchema(postValidationSchema), postLid)

/**
 * @swagger
 * /lid/getLid:
 *   get:
 *     summary: "Barcha lidlarni olish"
 *     tags: [Lid]
 *     responses:
 *       "200":
 *         description: "Lidlar ro'yxati"
 *       "500":
 *         description: "Server xatosi"
 */
lid.get("/getLid", getLid)

/**
 * @swagger
 * /lid/getLidById/{id}:
 *   get:
 *     summary: "ID bo'yicha lid olish"
 *     tags: [Lid]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Lid topildi"
 *       "404":
 *         description: "Lid topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
lid.get("/getLidById/:id", getLidById)

/**
 * @swagger
 * /lid/deleteLid/{id}:
 *   delete:
 *     summary: "ID bo'yicha lidni o'chirish"
 *     tags: [Lid]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Lid o'chirildi"
 *       "404":
 *         description: "Lid topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
lid.delete("/deleteLid/:id", deleteLid)

/**
 * @swagger
 * /lid/updateLidById/{id}:
 *   put:
 *     summary: "ID bo'yicha lidni yangilash"
 *     tags: [Lid]
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
 *               lid_stage_id:
 *                 type: string
 *               test_date:
 *                 type: string
 *               trial_lesson_date:
 *                 type: string
 *               trial_lesson_time:
 *                 type: string
 *               trial_lesson_group_id:
 *                 type: string
 *               lid_status_id:
 *                 type: string
 *               cancel_reson_id:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "Lid yangilandi"
 *       "400":
 *         description: "Yaroqsiz so'rov"
 *       "404":
 *         description: "Lid topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
lid.put("/updateLidById/:id", validateSchema(updateLidValidationSchema), updateLid)

/**
 * @swagger
 * /lid/searchLid:
 *   get:
 *     summary: "Lid qidirish"
 *     tags: [Lid]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Qidiruv natijalari"
 *       "404":
 *         description: "Lid topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
lid.get("/searchLid", searchLid)

module.exports = { lid }