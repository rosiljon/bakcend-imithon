const { Router } = require("express");
const Stuff = Router();


const { createStuff, getStuff, getStuffById, deleteStuff, updateStuff, searchStuff } = require("../controller/stuff.controller2");

const validateSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error){
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
}
const {
  registerValidationSchema,
  updateStuffValidationSchema,
} = require("../validation/stuffValidation");

/**
 * @swagger
 * tags:
 *   name: Stuff
 *   description: xodim boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /stuff/create:
 *   post:
 *     summary: Yangi xodim ro'yhatdan o'tkazish
 *     tags: [Stuff]
 *     description: Yangi xodim yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: xodim
 *               last_name:
 *                 type: string
 *                 example: b
 *               phone_number:
 *                 type: string
 *                 example: +998901234567
 *               login:
 *                 type: string
 *                 example: rosiljon
 *               parol:
 *                 type: string
 *                 example: 123456
 *               is_active:
 *                 type: string
 *                 example: rosiljon
 *     responses:
 *       '201':
 *         description: xodim muvaffaqiyatli ro'yhatdan o'tdi
 *       '400':
 *         description: xodim band yoki notog'ri malumot yuborilgan
 *       '505':
 *         description: Ichki server xatosi
 */
Stuff.post("/create", validateSchema(registerValidationSchema), createStuff)
/**
 * @swagger
 * /stuff/getStuff:
 *   get:
 *     summary: Barcha malumot olish
 *     tags: [Stuff]
 *     description: Barcha malumot ro'yxatini olish
 *     responses:
 *       '200':
 *         description: malumot muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
Stuff.get("/getStuff", getStuff)

/**
 * @swagger
 * /stuff/getstuff/{id}:
 *   get:
 *     summary: xodim ID bo'yicha olish
 *     tags: [Stuff]
 *     description: xodim ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: xodim olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: xodim muvaffaqiyatli qaytarildi
 *       '404':
 *         description: xodim topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
Stuff.get("/getStuff/:id", getStuffById)

/**
 * @swagger
 * /stuff/delete/{id}:
 *   delete:
 *     summary: Delete a name by ID
 *     tags: [Stuff]
 *     description: Delete a name with the provider ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of the name to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: name deleted succesfully
 *       '404':
 *         description: name not found
 *       '500':
 *         description: internal server error
 */
Stuff.delete("/delete", deleteStuff)


/**
 * @swagger
 * /stuff/update/{id}:
 *   put:
 *     summary: ism yangilash
 *     tags: [Stuff]
 *     description: ism ma'lumotlarini yangilash 
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ism ID raqami
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
 *                 description: Yangi rol nomi
 *     responses:
 *       '200':
 *         description: ism muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: ism topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
Stuff.put("/update", updateStuff)


/**
 * @swagger
 * /stuff/search:
 *   get:
 *     summary: stuff qidirish
 *     tags: [Stuff]
 *     description: Stuff qidirish
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidiruv so'rovi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *       '404':
 *         description: stuff topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */

Stuff.get("/search", searchStuff)
module.exports = { Stuff };