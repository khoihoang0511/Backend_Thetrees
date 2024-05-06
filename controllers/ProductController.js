const productModel = require('../model/ProductModel');

// ----------------------------------------------------- products


//lấy dữ liệu products
const getproducts = async (page, limit) => {
    try {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 2;
        let skip = (page - 1) * limit;
        let sort = { timeadd: -1 };
        let products = productModel
            .find()
            .skip(skip)
            .limit(limit)
            .sort(sort)
        return products
    } catch (error) {
        console.log('Error getProduct', error.message);
        throw new Error('getProduct do not success');
    }
}

//tìm kiếm product theo id

const findproductById = async (_id) => {
    try {
        let result = await productModel.findOne({ _id: _id });
        if (!result) {
            return false;
        }
        console.log(result)
        return result;

    } catch (error) {
        console.log('lỗi tìm kiếm controller ---------------', error);
        throw new Error('find product error');
    }
}

//tìm kiểm theo danh mục
const findCategory = async (_id, page, limit) => {
    try {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10; // Giả sử mặc định là 10 sản phẩm mỗi trang
        let skip = (page - 1) * limit;
        let sort = { timeadd: -1 };
        const result = await productModel.find({ category_id: _id }) // _id của danh mục
            .skip(skip)
            .limit(limit)
            .sort(sort);
        if (!result || result.length === 0) {
            return false; // Trả về false nếu không tìm thấy kết quả
        }
        return result;
    } catch (error) {
        console.log('Lỗi tìm kiếm category controller ---------------', error);
        throw new Error('Lỗi tìm kiếm danh mục');
    }
};


// lọc sản phẩm theo giá
const filterPrice = async (min, max, limit, page) => {
    try {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 2;
        let skip = (page - 1) * limit;
        let sort = { timeadd: 1 };
        let query = {
            price: { $gte: min, $lt: max },
        };

        let products = productModel
            .find(query)
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .exec();

        return products;

    } catch (error) {
        console.log('lỗi filterPrice controller---------------', error);
        throw new Error('find filterPrice error');
    }
}


//add product
const addproduct = async (name, price, quantity, description, images, size, status, origin, category_id, type) => {
    try {
        let newproduct = new productModel({
            name: name,
            price: price,
            quantity: quantity,
            description: description,
            images: images,
            size: size,
            status: status,
            origin: origin,
            category_id: category_id,
            type: type,
        });
        // save user 
        const result = await newproduct.save();
        console.log(result);

        return result;
    } catch (error) {
        console.log('Error addproduct---------------', error.message);
        throw new Error('addproduct do not success');
    }
}

// deleteproducts 
const deleteproducts = async (_id) => {
    try {
        let result = await productModel.findOne({ _id: _id });
        if (!result) {
            return false; 
        }
        await result.deleteOne(); // Sử dụng deleteOne() để xóa
        return true;
    } catch (error) {
        console.log( 'lỗi delete product controller ---------------', error);
        throw new Error('delete product error');
    }
}

// updateproduct
const updateproduct = async (_id, name, price, quantity, description, images, size, status, origin, category_id, type) => {
    try {
        const product = await productModel.findOne({ _id: _id })
        // console.log(product)
        if (!product) {
            throw new Error('Can not find product')
        }
        product.name = name || product.name,
        product.price = price || product.price,
        product.quantity = quantity || product.quantity,
        product.description = description || product.description,
        product.images = images || product.images,
        product.size = size || product.size,
        product.status = status || product.status,
        product.origin = origin || product.origin,
        product.category_id = category_id || product.category_id,
        product.type = type || product.type;

        // save user 
        const result = await product.save();
        return result;
    } catch (error) {
        console.log('Error updateproduct---------------', error);
        throw new Error('updateproduct do not success');
    }
}

module.exports = { updateproduct, getproducts, findproductById, findCategory, filterPrice, addproduct, deleteproducts };