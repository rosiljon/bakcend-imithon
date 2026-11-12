const { Router } = require("express"); 
const lesson = Router(); 
 
const { postLesson,getLesson,getLessonById,deleteLesson,searchLesson,updateLesson } = require("../controller/lesson.controller"); 
const { 
    lessonValidationSchema, 
    updateLessonValidationSchema, 
}= require("../validation/lessonValidation"); 

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
*   name: Lessons 
*   description: Lessonlarni boshqarish uchun API endpointlari 
*/ 
 
 
/** 
 * @swagger 
 * /lesson/postLesson: 
 *   post: 
 *     summary: Yangi Lesson yaratish 
 *     tags: [Lessons] 
 *     description: Yangi Lesson yaratish  
 *     requestBody: 
 *       required: true 
 *       content: 
 *         application/json: 
 *           schema: 
 *             type: object 
 *             properties: 
 *               lesson_theme: 
 *                 type: string 
 *               lesson_number: 
 *                 type: number 
 *               group_id: 
 *                 type: string 
 *               lesson_date: 
 *                 type: string 
 *     responses: 
 *       '201': 
 *         description: Lesson muvaffaqiyatli yaratildi 
 *       '400': 
 *         description: Yomon so'rov , validatsiya xatolari 
 *       '500':  
 *         description: Server xatosi 
 */ 
lesson.post("/postLesson",validateSchema(lessonValidationSchema),postLesson); 
 
/** 
 * @swagger 
 * /lesson/getLessons: 
 *   get: 
 *     summary: Barcha Lessonlarni olish 
 *     tags: [Lessons] 
 *     description: Barcha Lessonlarni olish 
 *     responses: 
 *       '200': 
 *         description: Barcha Lessonlar muvaffaqiyatli olindi 
 *       '500': 
 *         description: Server xatosi 
 */ 
lesson.get("/getLessons" , getLesson); 
 
 
/**  
 * @swagger 
 * /lesson/getLessonById/{id}: 
 *   get: 
 *     summary: Lessonni ID bo'yicha olish 
 *     tags: [Lessons] 
 *     description: Lessonni ID bo'yicha olish 
 *     parameters: 
 *       - in: path 
 *         name: id 
 *         description: Lesson ID si 
 *         required: true 
 *         schema: 
 *           type: string 
 *     responses: 
 *       '200': 
 *         description: Lesson muvaffaqiyatli olindi 
 *       '404': 
 *         description: Lesson topilmadi 
 *       '500': 
 *         description: Server xatosi 
 */ 
lesson.get("/getLessonById/:id", getLessonById); 
 
 
/** 
 * @swagger 
 * /lesson/searchLesson: 
 *   get: 
 *     summary: Lessonni qidirish 
 *     tags: [Lessons] 
 *     description: Lessonni qidirish 
 *     parameters: 
 *       - in: query 
 *         name: query 
 *         description: Qidiruv so'rovi 
 *         required: true 
 *         schema: 
 *           type: string 
 *     responses: 
 *       '200': 
 *         description: Lesson muvaffaqiyatli topildi 
 *       '404': 
 *         description: Lesson topilmadi 
 *       '500': 
 *         description: Server xatosi 
 */ 
 
lesson.get("/searchLesson", searchLesson); 
 
 
 
/** 
 * @swagger 
 * /lesson/updateLessonById/{id}: 
 *   put: 
 *     summary: Lessonni yangilash 
 *     tags: [Lessons] 
 *     description: Lessonni ID bo'yicha yangilash 
 *     parameters: 
 *       - in: path 
 *         name: id 
 *         description: ID of the lesson to update 
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
 *               lesson_theme: 
 *                 type: string 
 *               lesson_number: 
 *                 type: number  
 *               lesson_date: 
 *                 type: string 
 *     responses: 
 *       '200': 
 *         description: Lesson muvaffaqiyatli yangilandi 
 *       '400': 
 *         description: Yomon so'rov , validatsiya xatolari 
 *       '404': 
 *         description: Lesson topilmadi 
 *       '500': 
 *         description: Server xatosi 
 */ 
lesson.put("/updateLessonById/:id", validateSchema(updateLessonValidationSchema), updateLesson); 
 
/** 
 * @swagger 
 * /lesson/deleteLesson/{id}: 
 *   delete: 
 *     summary: Delete a lesson by ID 
 *     tags: [Lessons] 
 *     description: Delete a lesson by their ID 
 *     parameters: 
 *       - in: path 
 *         name: id 
 *         description: ID of the lesson to delete 
 *         required: true 
 *         schema: 
 *           type: string 
 *     responses: 
 *       '200': 
 *         description: Lesson successfully deleted 
 *       '404': 
 *         description: Lesson not found 
 *       '500': 
 *         description: Server error 
*/ 
lesson.delete("/deleteLesson/:id", deleteLesson);

module.exports = { lesson };