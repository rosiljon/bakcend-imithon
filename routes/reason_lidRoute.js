const { Router } = require("express")
const reason_lid = Router();

const { postReason,getReason,getReasonById,searchReason,deleteReason,updateReason} = require('../controller/reason_lid.controller')
const {
    postValidationSchema,
    updateReasonValidationSchema
} = require('../validation/reason_lidValidation');

const validateSchema = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

/**
 * @swagger
 * tags:
 *   name: Reason
 *   description: "Reason_lid larni boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /reason_lid/postReason:
 *   post:
 *     summary: "Yangi Reason ro'yxatdan o'tgazish"
 *     tags: [ Reason]
 *     description: "Yangi Reason yaratish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason_lid:
 *                  type: string
 *     responses:
 *       "201":
 *         description: "Reason muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
reason_lid.post('/postReason', validateSchema(postValidationSchema), postReason)


/**
 * @swagger
 * /reason_lid/getReason:
 *   get:
 *     summary: "Reason olish"
 *     tags: [ Reason]
 *     description: "Reason olish"
 *     responses:
 *       "200":
 *         description: "Reason muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
reason_lid.get('/getReason', getReason)


/**
 * @swagger
 * /reason_lid/getReasonById/{id}:
 *   get:
 *     summary: "Reason ID bo'yicha olish"
 *     tags: [ Reason]
 *     description: "Reason ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Reason muvaffaqiyatli olindi"
 *       "404":
 *         description: "Reason topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
reason_lid.get('/getReasonById/:id', getReasonById)


/**
 * @swagger
 * /reason_lid/deleteReason/{id}:
 *   delete:
 *     summary: "Reason ID bo'yicha o'chirish"
 *     tags: [ Reason]
 *     description: "Reason ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Reason muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Reason topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
reason_lid.delete('/deleteReason/:id', deleteReason)



/**
 * @swagger
 * /reason_lid/updateReasonById/{id}:
 *   put:
 *     summary: "Reason yangilash"
 *     tags: [ Reason]
 *     description: "Reason ID bo'yicha yangilash"
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
 *               reason_lid:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "Reason muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Reason topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
reason_lid.put('/updateReasonById/:id', validateSchema(updateReasonValidationSchema), updateReason)

/**
 * @swagger
 * /reason_lid/searchReason:
 *   get:
 *     summary: "Reason qidirish"
 *     tags: [ Reason]
 *     description: "Reason qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Reason muvaffaqiyatli topildi"
 *       "404":
 *         description: "Reason topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
reason_lid.get('/searchReason', searchReason)

module.exports = {reason_lid}