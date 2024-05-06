
const UserModel = require("../model/UserModel");




//add product
const addproductcart = async (id_User, name, price, quantity, images, product_id, type) => {
    try {
        const user = await UserModel.findById(id_User);

        if (!user) {
            throw new Error("Người dùng không tồn tại");
        }
        let productIndex = user.carts.findIndex(item => item.product_id.toString() === product_id.toString());
        if (productIndex !== -1) {
            user.carts[productIndex].quantity += quantity;
            user.carts[productIndex] = user.carts[productIndex];
        } else {
            let newProductCart = {
                product_id: product_id,
                name: name,
                price: price,
                quantity: quantity,
                images: images,
                type: type,
                checked:false
            };
            // Thêm sản phẩm vào giỏ hàng của người dùng
            user.carts.push(newProductCart);
        }

        await user.save();

        // Trả về giỏ hàng sau khi thêm hoặc cập nhật
        return user.carts;
    } catch (error) {
        console.log('Lỗi khi thêm vào giỏ hàng:', error.message);
        throw error;
    }
}



const getproductcart = async (id_User) => {
    try {
        // Tìm người dùng trong MongoDB
        const user = await UserModel.findById(id_User);
        if (!user) {
            console.log("Người dùng không tồn tại");
            return;
        }

        return user.carts.reverse();
    } catch (error) {
        console.log('Error getproductcart---------------', error.message);
        throw new Error('getproductcart do not success');
    }
}

// deletecart
const deleteproductcart = async (id_User, product_id) => {
    try {
        const user = await UserModel.findById(id_User);
        if (!user) {
            console.log("Người dùng không tồn tại");
            return;
        }
        for (let index = 0; index < product_id.length; index++) {
            user.carts = user.carts.filter(item => item.product_id.toString() !== product_id[index].toString())
        }
        await user.save(); // Di chuyển lệnh save ra khỏi vòng lặp
        console.log("Sản phẩm đã được xóa khỏi giỏ hàng của người dùng");
        return user.carts;
    } catch (error) {
        console.log('Error getproductcart---------------', error.message);
        throw new Error('ADDPRODUCTCART do not success');
    }
}


// updatequantity
const updatequantity = async (id_User, product_id, status) => {
    try {
        const user = await UserModel.findById(id_User);
        if (!user) {
            throw new Error("Người dùng không tồn tại");
        }
        let productIndex = user.carts.findIndex(item => item.product_id.toString() === product_id.toString());
        if (productIndex < 0) {
            throw new Error("Không tìm thấy sản phẩm trong giỏ hàng");
        }

        // // Thực hiện cập nhật số lượng sản phẩm
        if (status === "increase") {
            user.carts[productIndex].quantity += 1;
            user.carts[productIndex] = user.carts[productIndex];
        } else if (status === "decrease") {
            if (user.carts[productIndex].quantity > 1) {
                user.carts[productIndex].quantity -= 1;
                user.carts[productIndex] = user.carts[productIndex];
            }
        } else {
            throw new Error("Trạng thái không hợp lệ");
        }

        // Lưu thông tin người dùng sau khi cập nhật giỏ hàng
        await user.save();

        // Trả về sản phẩm đã cập nhật
        // return user.carts[productIndex];
        return true;
    } catch (error) {
        console.log('Lỗi khi cập nhật số lượng sản phẩm:', error.message);
        throw error;
    }
}




module.exports = { addproductcart, getproductcart, deleteproductcart, updatequantity };


