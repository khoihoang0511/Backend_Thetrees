const categoryModel = require("../model/CategoryModel");

// getcategory
//lấy dữ liệu products
const getcategory = async () => {
    try {
        let category = await categoryModel.find();
    console.log(category)
        return category;
    } catch (error) {
        console.log('Error getcategory', error.message);
        throw new Error('getcategory do not success');
    }
}
const findCategory = async (_id) => {
    try {
        const category = await categoryModel.find({ _id: _id })
        if(!category){
            throw new Error('Can not find category')
        }
        return category;
    } catch (error) {
        console.log('Error findCategory', error);
        throw new Error('findCategory do not success');
    }
}
module.exports = { getcategory,findCategory};