// khai báo 1 schema cho users
// (_id, email, password, name, role, carts, createdAt, updatedAt, available)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String,default:""},
    phone: { type: String,default:""},
    role: { type: Number, default: 1 }, // 1: user, 2: admin
    carts: { type: Array, default: [] },
    profile: { type: Array, default: [] },
    transaction_history: { type: Array, default: [] },
    notification: { type: Array, default: [] },
    // ngày giờ tạo
    createdAt: { type: String, default: Date.now() },
    // ngày giờ cập nhật
    updatedAt: { type: String, default: Date.now() },
    // tài khoản còn hoạt động hay không
    available: { type: Boolean, default: true },
});
// tiếng anh, số ít, chữ thường, không dấu, không cách
module.exports = mongoose.models.user || mongoose.model('user', UserSchema);