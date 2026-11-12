const { Router } = require('express');
const group_stuff = Router();

const  {postGroup_stuff,getGroup_stuffById,getGroup_stuff,deleteGroup_stuff} = require("../controller/group_stuff.controller")
const {
    postGroup_stuffValidateSchema
}=require("../validation/group_stuffValidation")

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
*   name: GroupStuff
*   description: GroupStuff boshqarish uchun API endpointlari
*/


/**
 * @swagger
 * /group_stuff/postGroup_stuff:
 *   post:
 *     summary: Yangi GroupStuff ro'yxatdan o'tkazish
 *     tags: [GroupStuff]
 *     description: Yangi GroupStuff yaratish 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stuff_id:
 *                 type: string
 *               group_id:
 *                  type: string
 *     responses:
 *       '201':
 *         description: GroupStuff muvaffaqiyatli ro'yxatdan o'tdi
 *       '400':
 *         description: Yomon so'rov , validatsiya xatolari
 *       '500': 
 *         description: Server xatosi
 */
group_stuff.post("/postGroup_stuff",validateSchema(postGroup_stuffValidateSchema),postGroup_stuff);


/**
 * @swagger
 * /group_stuff/getGroup_stuff:
 *   get:
 *     summary: Barcha GroupStuff olish
 *     tags: [GroupStuff]
 *     description: Barcha GroupStuff olish
 *     responses:
 *       '200':
 *         description: Barcha GroupStuff muvaffaqiyatli olindi
 *       '500':
 *         description: Server xatosi
 */
group_stuff.get("/getGroup_stuff" , getGroup_stuff);



/** 
 * @swagger
 * /group_stuff/getGroup_stuffById/{id}:
 *   get:
 *     summary: GroupStuff ID bo'yicha olish
 *     tags: [GroupStuff]
 *     description: GroupStuff ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: GroupStuff ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: GroupStuff muvaffaqiyatli olindi
 *       '404':
 *         description: GroupStuff topilmadi
 *       '500':
 *         description: Server xatosi
 */
group_stuff.get("/getGroup_stuffById/:id", getGroup_stuffById);


/**
 * @swagger
 * /group_stuff/deleteGroup_stuff/{id}:
 *   delete:
 *     summary: Delete a GroupStuff by ID
 *     tags: [GroupStuff]
 *     description: Delete a GroupStuff by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the GroupStuff to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: GroupStuff successfully deleted
 *       '404':
 *         description: GroupStuff not found
 *       '500':
 *         description: Server error
*/
group_stuff.delete("/deleteGroup_stuff/:id", deleteGroup_stuff);

module.exports = { group_stuff };