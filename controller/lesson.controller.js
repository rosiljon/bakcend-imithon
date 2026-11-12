const { Lesson } = require("../model/lessonSchema");

const postLesson = async (req, res) => {
    try {
        const {
            lesson_theme,
            lesson_number,
            group_id,
            lesson_date,
        } = req.body;

        const existingLesson = await Lesson.findOne({ lesson_theme,lesson_number,group_id,lesson_date,});
        console.log(existingLesson);

        if (existingLesson) {
            return res.status(400).json({
                success: false,
                message: "Bu lesson ro'yhatdan otgan",
            });
        } else {
            const newLesson = new Lesson({
                lesson_theme,
                lesson_number,
                group_id,
                lesson_date,
            });

            await newLesson.save();

            return res.status(201).json({
                success: true,
                message: "Lesson muvaffaqiyatli ro'yxatdan o'tdi",
                lesson: newLesson,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message,
        });
    }
};


// ---------- Get Lesson ----------

const getLesson = async (req, res) => {
    try {
        const lesson = await Lesson.find({});

        res.json({
            success: true,
            message: "Barcha Lesson royxati olingan",
            innerData: lesson,
        });
    } catch (error) {
        console.error("Error fetching Lesson:", error);

        res.status(500).json({
            success: false,
            message: "Serverda xatosi: Lesson olishda xatolik yuz berdi",
        });
    }
};


// ---------- GetLessonByID ----------
const getLessonById = async (req, res) => {
    try {
        const lessonId = req.params.id;
        const lesson = await Lesson.findById(lessonId).populate("group_id")

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found",
            });
        }

        return res.status(200).json({ message: "Lesson found", lesson });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


// ---------- deleteLesson ----------

const deleteLesson = async (req, res) => {
    try {
        const lessonId = req.params.id;
        const deletedLesson = await Lesson.findByIdAndDelete(lessonId);

        if (!deletedLesson) {
            return res.status(404).json({
                message: "Lesson not found",
            });
        }

        res.json({
            message: "Lesson deleted successfully",
            deletedLesson,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


// ---------- Update Lesson ----------

const updateLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            lesson_theme,
            lesson_number,
            lesson_date,
        } = req.body;

        const updateData = Object.fromEntries(
            Object.entries({ lesson_theme, lesson_number, lesson_date })
                .filter(([, value]) => value !== undefined)
        );

        const updatedLesson = await Lesson.findByIdAndUpdate( id, updateData,{
            new: true,
            });

        if (!updatedLesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found",
            });
        }

        res.json({
            success: true,
            message: "Lesson updated successfully",
            lesson: updatedLesson,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


// ---------- Search Lesson ----------

const searchLesson = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Qidiruv So'zini kiriting", });
        }

        const result = await Lesson.find({
            $or: [
                { lesson_theme: { $regex: query, $options: "i",}, },
            ],
        });

        if (result.length === 0) {
            return res.json({
                message: "Lesson topilmadi",
            });
        }

        res.json({ result, });

    } catch (error) {
        console.error("error fetching lessons", error);
        res.status(500).json({
            message: "Server error: Failed to fetch lessons.",
        });
    }
};


module.exports = {postLesson,getLesson,getLessonById,updateLesson,deleteLesson,searchLesson}