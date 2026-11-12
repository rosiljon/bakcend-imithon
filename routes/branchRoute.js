const { Router } =  require("express")
const branchs  = Router();

const {postBranch,getBranch,getBranchById,searchBranch,deleteBranch,updateBranch}= require('../controller/branch.controller')
const {
    postValidationSchema,
    updateBranchValidationSchema,
} = require("../validation/branchValidation")

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
 *   name: Branch
 *   description: "Foydalanuvchilarni boshqarish uchun API endpointlar"
 */


/**
 * @swagger
 * /branchs/postBranch:
 *   post:
 *     summary: "Yangi Branch ro'yxatdan o'tgazish"
 *     tags: [Branch]
 *     description: "Yangi Branch yaratish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               cal_number:
 *                 type: string
 *     responses:
 *       "201":
 *         description: "Branch muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */

branchs.post('/postBranch', validateSchema(postValidationSchema), postBranch)

/**
 * @swagger
 * /branchs/getBranch:
 *   get:
 *     summary: "Barcha Branchni olish"
 *     tags: [Branch]
 *     description: "Barcha Branchni olish"
 *     responses:
 *       "200":
 *         description: "Barcha Branch muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
branchs.get('/getBranch', getBranch)


/**
 * @swagger
 * /branchs/getBranchById/{id}:
 *   get:
 *     summary: "Branchni ID bo'yicha olish"
 *     tags: [Branch]
 *     description: "Branchni ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Branch muvaffaqiyatli olindi"
 *       "404":
 *         description: "Branch topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
branchs.get('/getBranchById/:id', getBranchById)

/**
 * @swagger
 * /branchs/deleteBranch/{id}:
 *   delete:
 *     summary: "Branchni ID bo'yicha o'chirish"
 *     tags: [Branch]
 *     description: "Branchni ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Branch muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Branch topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
branchs.delete('/deleteBranch/:id', deleteBranch)


/**
 * @swagger
 * /branchs/updateBranchById/{id}:
 *   put:
 *     summary: "Branchni yangilash"
 *     tags: [Branch]
 *     description: "Branchni ID bo'yicha yangilash"
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
 *               address: 
 *                 type: string
 *               cal_number:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "Branch muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Branch topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
branchs.put('/updateBranchById/:id', validateSchema(updateBranchValidationSchema), updateBranch)

/**
 * @swagger
 * /branchs/searchBranch:
 *   get:
 *     summary: "Branchni qidirish"
 *     tags: [Branch]
 *     description: "Branchni qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Branch muvaffaqiyatli topildi"
 *       "404":
 *         description: "Branch topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
branchs.get('/searchBranch', searchBranch)


module.exports = { branchs }