// khai báo 1 schema cho users
// (_id, email, password, name, role, carts, createdAt, updatedAt, available)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    
});
// tiếng anh, số ít, chữ thường, không dấu, không cách
module.exports = mongoose.models.categorys  || mongoose.model('categorys', CategorySchema);