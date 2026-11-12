const { Router } = require('express');
const payments = Router();
const { postPayment, getPaymentById, getPayment, deletePayment, updatePayment, searchPayment } = require("../controller/payment.controller")
const {
    postPaymentValidationSchema,
    updatePaymentValidationSchema,
} = require("../validation/paymentValidation")

const validateSchema = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}

/**
* @swagger  
* tags:
*   name: Payment
*   description: Payment boshqarish uchun API endpointlari
*/


/**
 * @swagger
 * /payments/postPayment:
 *   post:
 *     summary: Yangi Payment ro'yxatdan o'tkazish
 *     tags: [Payment]
 *     description: Yangi Payment yaratish 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *               payment_last_date:
 *                 type: string
 *               payment_date:
 *                 type: string
 *               price:
 *                 type: string
 *               is_paid:
 *                 type: boolean
 *               total_attent:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Payment muvaffaqiyatli ro'yxatdan o'tdi
 *       '400':
 *         description: Yomon so'rov , validatsiya xatolari
 *       '500': 
 *         description: Server xatosi
 */
payments.post("/postPayment", validateSchema(postPaymentValidationSchema), postPayment);


/**
 * @swagger
 * /payments/getPayment:
 *   get:
 *     summary: Barcha Payment olish
 *     tags: [Payment]
 *     description: Barcha Payment olish
 *     responses:
 *       '200':
 *         description: Barcha Payment muvaffaqiyatli olindi
 *       '500':
 *         description: Server xatosi
 */
payments.get("/getPayment", getPayment);


/** 
 * @swagger
 * /payments/getPaymentById/{id}:
 *   get:
 *     summary: Payment ID bo'yicha olish
 *     tags: [Payment]
 *     description: Payment ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Payment ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment muvaffaqiyatli olindi
 *       '404':
 *         description: Payment topilmadi
 *       '500':
 *         description: Server xatosi
 */
payments.get("/getPaymentById/:id", getPaymentById);


/**
 * @swagger
 * /payments/updatePaymentById/{id}:
 *   put:
 *     summary: Paymentni yangilash
 *     tags: [Payment]
 *     description: Paymentni ID bo'yicha yangilash
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
 *               price:
 *                 type: string
 *               total_attent:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Payment muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatolari
 *       '404':
 *         description: Payment topilmadi
 *       '500':
 *         description: Server xatosi
 */
payments.put("/updatePaymentById/:id", validateSchema(updatePaymentValidationSchema), updatePayment);


/**
 * @swagger
 * /payments/deletePayment/{id}:
 *   delete:
 *     summary: Delete a Payment by ID
 *     tags: [Payment]
 *     description: Delete a Payment by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Payment to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment successfully deleted
 *       '404':
 *         description: Payment not found
 *       '500':
 *         description: Server error
*/
payments.delete("/deletePayment/:id", deletePayment);


/**
 * @swagger
 * /payments/searchPayment:
 *   get:
 *     summary: "Paymentni qidirish"
 *     tags: [Payment]
 *     description: "Paymentni qidirish (is_paid: true/false yoki price/total_attent bo'yicha)"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Payment muvaffaqiyatli topildi"
 *       "404":
 *         description: "Payment topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
payments.get('/searchPayment', searchPayment)



module.exports = { payments };