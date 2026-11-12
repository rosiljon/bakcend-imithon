const { Router } = require("express");
const Role = Router();

const {
  createRole,
  getRole,
  getRoleById,
  deleteRole,
  updateRole,
  searchRole,
} = require("../controller/role.controller");

const validateSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error){
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
}
const {
  registerValidationSchema,
  updateRoleValidationSchema,
} = require("../validation/roleValidaition");



/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Rol boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /role/create:
 *   post:
 *     summary: Yangi Rol ro'yhatdan o'tkazish
 *     tags: [Role]
 *     description: Yangi Rol yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Admin
 *     responses:
 *       '201':
 *         description: Rol muvaffaqiyatli ro'yhatdan o'tdi
 *       '400':
 *         description: name band yoki notog'ri malumot yuborilgan
 *       '505':
 *         description: Ichki server xatosi
 */
Role.post("/create", validateSchema(registerValidationSchema), createRole)
/**
 * @swagger
 * /role/getRole:
 *   get:
 *     summary: Barcha ism olish
 *     tags: [Role]
 *     description: Barcha ism ro'yxatini olish
 *     responses:
 *       '200':
 *         description: ism muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
Role.get("/getRole", getRole)
/**
 * @swagger
 * /role/getRoleById/{id}:
 *   get:
 *     summary: ism ID bo'yicha olish
 *     tags: [Role]
 *     description: ism ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ism olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: ism muvaffaqiyatli qaytarildi
 *       '404':
 *         description: ism topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
Role.get("/getRoleById/:id", getRoleById)
/**
 * @swagger
 * /role/delete/{id}:
 *   delete:
 *     summary: Delete a name by ID
 *     tags: [Role]
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
Role.delete("/delete/:id", deleteRole)
/**
 * @swagger
 * /role/update/{id}:
 *   put:
 *     summary: ism yangilash
 *     tags: [Role]
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
Role.put("/update/:id", validateSchema(updateRoleValidationSchema), updateRole)
/**
 * @swagger
 * /role/search:
 *   get:
 *     summary: ism qidirish
 *     tags: [Role]
 *     description: ism holos qidirsa
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
 *         description: ism topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
Role.get("/search", searchRole)
module.exports = { Role };