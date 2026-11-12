const { Router } = require('express');
const stuff_roles = Router();

const  {postStuff_role,getStuff_RoleById,getStuff_role,deleteStuff_role} = require("../controller/stuff_role_controller")
const {
    postStuff_roleValidateSchema
}=require("../validation/stuff_roleValidation")

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
*   name: StuffRole
*   description: stuffRole boshqarish uchun API endpointlari
*/


/**
 * @swagger
 * /stuff_roles/postStuff_role:
 *   post:
 *     summary: Yangi StuffRole ro'yxatdan o'tkazish
 *     tags: [StuffRole]
 *     description: Yangi StuffRole yaratish 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stuff_id:
 *                 type: string
 *               role_id:
 *                  type: string
 *     responses:
 *       '201':
 *         description: StuffRole muvaffaqiyatli ro'yxatdan o'tdi
 *       '400':
 *         description: Yomon so'rov , validatsiya xatolari
 *       '500': 
 *         description: Server xatosi
 */
stuff_roles.post("/postStuff_role",validateSchema(postStuff_roleValidateSchema),postStuff_role);


/**
 * @swagger
 * /stuff_roles/getStuff_role:
 *   get:
 *     summary: Barcha StuffRole olish
 *     tags: [StuffRole]
 *     description: Barcha StuffRole olish
 *     responses:
 *       '200':
 *         description: Barcha StuffRole muvaffaqiyatli olindi
 *       '500':
 *         description: Server xatosi
 */
stuff_roles.get("/getStuff_role" , getStuff_role);



/** 
 * @swagger
 * /stuff_roles/getStuff_roleById/{id}:
 *   get:
 *     summary: StuffRole ID bo'yicha olish
 *     tags: [StuffRole]
 *     description: StuffRole ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: StuffRole ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: StuffRole muvaffaqiyatli olindi
 *       '404':
 *         description: StuffRole topilmadi
 *       '500':
 *         description: Server xatosi
 */
stuff_roles.get("/getStuff_roleById/:id", getStuff_RoleById);


/**
 * @swagger
 * /stuff_roles/deleteStuff_role/{id}:
 *   delete:
 *     summary: Delete a StuffRole by ID
 *     tags: [StuffRole]
 *     description: Delete a StuffRole by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the StuffRole to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: StuffRole successfully deleted
 *       '404':
 *         description: StuffRole not found
 *       '500':
 *         description: Server error
*/
stuff_roles.delete("/deleteStuff_role/:id", deleteStuff_role);

module.exports = { stuff_roles };