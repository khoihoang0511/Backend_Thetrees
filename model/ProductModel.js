// khai báo 1 schema cho users
// (_id, email, password, name, role, carts, createdAt, updatedAt, available)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    size:{ type: String, required: true },
    status:{ type: Number, required: true },
    origin:{ type: String,required: true},
    category_id: { type: String},
    type:{ type: String, required: true },
    timeadd:{type:String , default:Date.now()},
    timeupdate:{type:String , default:Date.now()},
});
// tiếng anh, số ít, chữ thường, không dấu, không cách
module.exports = mongoose.models.product || mongoose.model('product', ProductSchema);