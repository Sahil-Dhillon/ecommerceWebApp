import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                name: { type: String, required: true },
                group: { type: String, required: true },
                subgroup: { type: String, required: true },
                timeSlot: { type: String, required: true },
                comment: { type: String, required: true },
                image: { type: String, required: false },
                price: { type: Number, required: true },
                serviceId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Service',
                    required: true,
                },
            },
        ],
        serviceAddress: {
            fullName: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
            address2: { type: String, required: false },
            city: { type: String, required: true },
            state: { type: String, required: true },
        },
        paymentMethod: { type: String, required: true },
        servicesPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isServed: { type: Boolean, default: false },
        ServedAt: { type: Date },
    },
    {
        timestamps: true,
    }
);
const Order = mongoose.model('Order', orderSchema);
export default Order;