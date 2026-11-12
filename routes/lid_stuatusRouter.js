const { Router } = require("express")
const status = Router();

const { postStatus,getStatus,getStatusById,updateStatus,deleteStatus,searchStatus} = require('../controller/lid_status.controller')
const {
    postValidationSchema,
    updateStatusValidationSchema
} = require('../validation/lid_statusValidation');
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
 *   name: Lid_status
 *   description: "Statuslarni boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /status/postStatus:
 *   post:
 *     summary: "Yangi Status ro'yxatdan o'tgazish"
 *     tags: [ Lid_status]
 *     description: "Yangi Status yaratish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                  type: string
 *     responses:
 *       "201":
 *         description: "Status muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
status.post('/postStatus', validateSchema(postValidationSchema), postStatus)


/**
 * @swagger
 * /status/getStatus:
 *   get:
 *     summary: "Status olish"
 *     tags: [ Lid_status]
 *     description: "Status olish"
 *     responses:
 *       "200":
 *         description: "Status muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
status.get('/getStatus', getStatus)


/**
 * @swagger
 * /status/getStatusById/{id}:
 *   get:
 *     summary: "Status ID bo'yicha olish"
 *     tags: [ Lid_status]
 *     description: "Status ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Status muvaffaqiyatli olindi"
 *       "404":
 *         description: "Status topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
status.get('/getStatusById/:id', getStatusById)


/**
 * @swagger
 * /status/deleteStatus/{id}:
 *   delete:
 *     summary: "Status ID bo'yicha o'chirish"
 *     tags: [ Lid_status]
 *     description: "Status ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Status muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Status topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
status.delete('/deleteStatus/:id', deleteStatus)



/**
 * @swagger
 * /status/updateStatusById/{id}:
 *   put:
 *     summary: "Status yangilash"
 *     tags: [ Lid_status]
 *     description: "Status ID bo'yicha yangilash"
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
 *               status:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "Status muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Status topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
status.put('/updateStatusById/:id', validateSchema(updateStatusValidationSchema), updateStatus)

/**
 * @swagger
 * /status/searchStatus:
 *   get:
 *     summary: "Status qidirish"
 *     tags: [ Lid_status]
 *     description: "Status qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Status muvaffaqiyatli topildi"
 *       "404":
 *         description: "Status topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
status.get('/searchStatus', searchStatus)

module.exports = {status}