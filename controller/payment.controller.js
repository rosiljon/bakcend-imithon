const { Payment } = require("../model/paymentSchema")


//  ------------postPayment ------------

const postPayment = async (req, res) => {
    try {
        const {
            student_id,
            payment_last_date,
            payment_date,
            price,
            is_paid,
            total_attent
        } = req.body;

        const newPayment = new Payment({
            student_id,
            payment_last_date,
            payment_date,
            price,
            is_paid,
            total_attent,
        })
        await newPayment.save();

        return res.status(201).json({
            success: true,
            message: "Payment muvaffaqiyatli ro'yxatdan o'tdi",
            payment: newPayment,
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

// ----------- get Payment -----------

const getPayment = async (req, res) => {
    try {
        const payments = await Payment.find({}).populate("student_id")
        res.json({
            success: true,
            message: "barcha payment ro'yxxatga olingan",
            innerData: payments,
        })
    } catch (error) {
        console.error("Error fetching payment:", error)
        res.status(500).json({
            success: false,
            message: 'Serverda xatosi payment olishda  xatolik yuz berdi'

        })
    }
}

// ------------getPaymentById---------------

const getPaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;

        const payment = await Payment.findById(paymentId).populate("student_id")

        if (!payment) {
            return res.status(404).json({ message: "Payment not faund" })

        }
        return res.status(200).json({ message: "Payment faund", payment })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }

}


// ---------deletePayment---------

const deletePayment = async (req, res) => {
    try {
        const paymentId = req.params.id;

        const deletedPayment = await Payment.findByIdAndDelete(paymentId)

        if (!deletedPayment) {
            return res.status(404).json({ message: "Payment not faund" })
        }
        res.json({ message: "Payment deteled successfully", deletedPayment })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


// ------------- update Payment -----
const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            price,
            total_attent
        } = req.body;

        const updateDate = {
            price,
            total_attent
        }


        const updatedPayment = await Payment.findByIdAndUpdate(id, updateDate, {
            new: true,
            runValidators: true,
        })

        if (!updatedPayment) {
            return res.status(404).json({
                success: false,
                message: "Payment not faund"
            })
        }

        res.json({
            success: true,
            message: "Payment updeted successfully",
            payment: updatedPayment,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}

// --------- search Payment ---------

const searchPayment = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Qidiruv So'sini yozing" })

        }

        const filter = {}

        if (query === "true" || query === "false") {
            filter.is_paid = query === "true"
        } else if (Number.isFinite(Number(query))) {
            filter.$or = [
                { price: query },
                { total_attent: Number(query) }
            ]
        } else {
            return res.json({ message: "Payment topilmadi" })
        }

        const result = await Payment.find(filter)

        if (result.length === 0) {
            return res.json({ message: "Payment topilmadi" })
        }
        res.json({ result });

    } catch (error) {
        console.error("error fetching payment", error);
        res.status(500).json({ message: "Server error: Failed to fetch payment" })

    }

}

module.exports = { postPayment, getPayment, getPaymentById, deletePayment, updatePayment, searchPayment }