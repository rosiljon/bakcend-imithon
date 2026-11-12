const { Router } = require("express")
const stages = Router();

const { postStage,getStage,getStageById,deleteStage,updateStage,searchStage } = require('../controller/stage.controller')
const {
    postValidationSchema,
    updateStageValidationSchema
} = require('../validation/stageValidation');
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
 *   name: Stage
 *   description: "Ismlarni boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /stages/postStage:
 *   post:
 *     summary: "Yangi Ism ro'yxatdan o'tgazish"
 *     tags: [Stage]
 *     description: "Yangi Ism yaratish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                  type: string
 *     responses:
 *       "201":
 *         description: "Ism muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
stages.post('/postStage', validateSchema(postValidationSchema), postStage)


/**
 * @swagger
 * /stages/getStage:
 *   get:
 *     summary: "Ism olish"
 *     tags: [Stage]
 *     description: "Ism olish"
 *     responses:
 *       "200":
 *         description: "Ism muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
stages.get('/getStage', getStage)


/**
 * @swagger
 * /stages/getStageById/{id}:
 *   get:
 *     summary: "Ism ID bo'yicha olish"
 *     tags: [Stage]
 *     description: "Ism ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Ism muvaffaqiyatli olindi"
 *       "404":
 *         description: "Ism topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
stages.get('/getStageById/:id', getStageById)


/**
 * @swagger
 * /stages/deleteStage/{id}:
 *   delete:
 *     summary: "Ism ID bo'yicha o'chirish"
 *     tags: [Stage]
 *     description: "Ism ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Ism muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Ism topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
stages.delete('/deleteStage/:id', deleteStage)



/**
 * @swagger
 * /stages/updateStageById/{id}:
 *   put:
 *     summary: "Ism yangilash"
 *     tags: [Stage]
 *     description: "Ism ID bo'yicha yangilash"
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
 *               name:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "Ism muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Ism topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
stages.put('/updateStageById/:id', validateSchema(updateStageValidationSchema), updateStage)

/**
 * @swagger
 * /stages/searchStage:
 *   get:
 *     summary: "Ism qidirish"
 *     tags: [Stage]
 *     description: "Ism qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Ism muvaffaqiyatli topildi"
 *       "404":
 *         description: "Ism topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
stages.get('/searchStage', searchStage)

module.exports = {stages}