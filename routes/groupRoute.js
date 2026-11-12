const { Router } = require("express"); 
const groups = Router(); 
 
const { postGroup,getGroup,getGroupById,deleteGroup,searchGroup,updateGroup } = require("../controller/group.controller"); 
const { 
    groupValidationSchema, 
    updateGroupValidationSchema, 
}= require("../validation/groupValidation"); 
 
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
*   name: Groups 
*   description: Grouplarni boshqarish uchun API endpointlari 
*/ 
 
 
/** 
 * @swagger 
 * /groups/postGroup: 
 *   post: 
 *     summary: Yangi Group yaratish 
 *     tags: [Groups] 
 *     description: Yangi Group yaratish  
 *     requestBody: 
 *       required: true 
 *       content: 
 *         application/json: 
 *           schema: 
 *             type: object 
 *             properties: 
 *               group_name: 
 *                 type: string 
 *               lesson_start_time: 
 *                 type: string 
 *               lesson_continuous: 
 *                 type: string 
 *               lesson_week_day: 
 *                 type: string 
 *               group_stage_idint: 
 *                 type: string 
 *               room_number: 
 *                 type: string 
 *               room_floor: 
 *                 type: number 
 *               branch_id: 
 *                 type: string 
 *               lessons_quant: 
 *                 type: number 
 *               is_active: 
 *                 type: boolean 
 *     responses: 
 *       '201': 
 *         description: Group muvaffaqiyatli yaratildi 
 *       '400': 
 *         description: Yomon so'rov , validatsiya xatolari 
 *       '500':  
 *         description: Server xatosi 
 */ 
groups.post("/postGroup",validateSchema(groupValidationSchema),postGroup); 
 
/** 
 * @swagger 
 * /groups/getGroups: 
 *   get: 
 *     summary: Barcha Grouplarni olish 
 *     tags: [Groups] 
 *     description: Barcha Grouplarni olish 
 *     responses: 
 *       '200': 
 *         description: Barcha Grouplar muvaffaqiyatli olindi 
 *       '500': 
 *         description: Server xatosi 
 */ 
groups.get("/getGroups" , getGroup); 
 
 
/**  
 * @swagger 
 * /groups/getGroupById/{id}: 
 *   get: 
 *     summary: Groupni ID bo'yicha olish 
 *     tags: [Groups] 
 *     description: Groupni ID bo'yicha olish 
 *     parameters: 
 *       - in: path 
 *         name: id 
 *         description: Group ID si 
 *         required: true 
 *         schema: 
 *           type: string 
 *     responses: 
 *       '200': 
 *         description: Group muvaffaqiyatli olindi 
 *       '404': 
 *         description: Group topilmadi 
 *       '500': 
 *         description: Server xatosi 
 */ 
groups.get("/getGroupById/:id", getGroupById); 
 
 
/** 
 * @swagger 
 * /groups/searchGroup: 
 *   get: 
 *     summary: Groupni qidirish 
 *     tags: [Groups] 
 *     description: Groupni qidirish 
 *     parameters: 
 *       - in: query 
 *         name: query 
 *         description: Qidiruv so'rovi 
 *         required: true 
 *         schema: 
 *           type: string 
 *     responses: 
 *       '200': 
 *         description: Group muvaffaqiyatli topildi 
 *       '404': 
 *         description: Group topilmadi 
 *       '500': 
 *         description: Server xatosi 
 */ 
 
groups.get("/searchGroup", searchGroup); 
 
 
 
/** 
 * @swagger 
 * /groups/updateGroupById/{id}: 
 *   put: 
 *     summary: Groupni yangilash 
 *     tags: [Groups] 
 *     description: Groupni ID bo'yicha yangilash 
 *     parameters: 
 *       - in: path 
 *         name: id 
 *         description: ID of the group to update 
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
 *               group_name: 
 *                 type: string 
 *               lesson_start_time: 
 *                 type: string 
 *               lesson_continuous: 
 *                 type: string 
 *               lesson_week_day: 
 *                 type: string 
 *               room_number: 
 *                 type: string 
 *               room_floor: 
 *                 type: number 
 *               lessons_quant: 
 *                 type: number 
 *     responses: 
 *       '200': 
 *         description: Group muvaffaqiyatli yangilandi 
 *       '400': 
 *         description: Yomon so'rov , validatsiya xatolari 
 *       '404': 
 *         description: Group topilmadi 
 *       '500': 
 *         description: Server xatosi 
 */ 
groups.put("/updateGroupById/:id", validateSchema(updateGroupValidationSchema), updateGroup); 
 
/** 
 * @swagger 
 * /groups/deleteGroup/{id}: 
 *   delete: 
 *     summary: Delete a group by ID 
 *     tags: [Groups] 
 *     description: Delete a group by their ID 
 *     parameters: 
 *       - in: path 
 *         name: id 
 *         description: ID of the group to delete 
 *         required: true 
 *         schema: 
 *           type: string 
 *     responses: 
 *       '200': 
 *         description: Group successfully deleted 
 *       '404': 
 *         description: Group not found 
 *       '500': 
 *         description: Server error 
*/ 
groups.delete("/deleteGroup/:id", deleteGroup);

module.exports = { groups };