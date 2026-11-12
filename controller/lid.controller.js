const { Lid } = require("../model/lidSchema")

const postLid = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            phone_number,
            lid_stage_id,
            test_date,
            trial_lesson_date,
            trial_lesson_time,
            trial_lesson_group_id,
            lid_status_id,
            cancel_reson_id,
        } = req.body

        const newLid = new Lid({
            first_name,
            last_name,
            phone_number,
            lid_stage_id,
            test_date,
            trial_lesson_date,
            trial_lesson_time,
            trial_lesson_group_id,
            lid_status_id,
            cancel_reson_id,
        })
        await newLid.save()

        return res.status(201).json({
            success: true,
            message: "Lid muvaffaqiyatli ro'yxatdan o'tdi",
            lid: newLid,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message,
        })
    }
}

const getLid = async (req, res) => {
    try {
        const lids = await Lid.find({})
        return res.json({
            success: true,
            message: "Barcha lidlar ro'yxati",
            innerData: lids,
        })
    } catch (error) {
        console.error("Error fetching lids:", error)
        return res.status(500).json({
            success: false,
            message: "Lidlarni olishda server xatosi",
        })
    }
}

const getLidById = async (req, res) => {
    try {
        const lid = await Lid.findById(req.params.id)

        if (!lid) {
            return res.status(404).json({
                success: false,
                message: "Lid topilmadi",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Lid topildi",
            lid,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
        })
    }
}

const deleteLid = async (req, res) => {
    try {
        const deletedLid = await Lid.findByIdAndDelete(req.params.id)

        if (!deletedLid) {
            return res.status(404).json({
                success: false,
                message: "Lid topilmadi",
            })
        }

        return res.json({
            success: true,
            message: "Lid muvaffaqiyatli o'chirildi",
            lid: deletedLid,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
        })
    }
}

const updateLid = async (req, res) => {
    try {
        const updatedLid = await Lid.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        if (!updatedLid) {
            return res.status(404).json({
                success: false,
                message: "Lid topilmadi",
            })
        }

        return res.json({
            success: true,
            message: "Lid muvaffaqiyatli yangilandi",
            lid: updatedLid,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message,
        })
    }
}

const searchLid = async (req, res) => {
    try {
        const { query } = req.query

        if (!query || typeof query !== "string") {
            return res.status(400).json({
                success: false,
                message: "Qidiruv so'zini kiriting",
            })
        }

        const result = await Lid.find({
            $or: [
                { first_name: { $regex: query, $options: "i" } },
                { last_name: { $regex: query, $options: "i" } },
                { phone_number: { $regex: query, $options: "i" } },
            ],
        })

        if (result.length === 0) {
            return res.json({ message: "Lid topilmadi" })
        }

        return res.json({ success: true, result })
    } catch (error) {
        console.error("Error searching lids:", error)
        return res.status(500).json({
            success: false,
            message: "Lid qidirishda server xatosi",
        })
    }
}

module.exports = { postLid, getLid, getLidById, deleteLid, updateLid, searchLid }