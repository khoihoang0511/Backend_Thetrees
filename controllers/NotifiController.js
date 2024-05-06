const UserModel = require("../model/UserModel");

//add notification
const addnotification = async (id_User, id, date, day, month, year, profilename, profileemail,
    profileaddress, profilephone, expressname, expresstime, namepay, pricepaysum, pricepayExpress, products) => {
    try {
        const user = await UserModel.findById(id_User);

        if (!user) {
            throw new Error("Người dùng không tồn tại");
        }

        let newNotification = {
            date: date,
            id: id,
            day: day,
            month: month,
            year: year,
            status: "Đang giao",
            profilename: profilename,
            profileemail: profileemail,
            profileaddress: profileaddress,
            profilephone: profilephone,
            expressname: expressname,
            expresstime: expresstime,
            namepay: namepay,
            pricepaysum: pricepaysum,
            pricepayExpress: pricepayExpress,
            products: [...products],

        }

        // Thêm thông báo
        user.notification.push(newNotification);

        await user.save();

        // Trả về giỏ hàng sau khi thêm hoặc cập nhật
        return user.notification;
    } catch (error) {
        console.log('Lỗi khi thêm vào giỏ hàng:', error.message);
        throw error;
    }
}

//get notification
const getnotification = async (id_User) => {
    try {
        const user = await UserModel.findById(id_User);

        if (!user) {
            throw new Error("Người dùng không tồn tại");
        }

        return user.notification.reverse();
    } catch (error) {
        console.log('Lỗi khi thêm vào giỏ hàng:', error.message);
        throw error;
    }
}

// upodate status 
const updatestatus = async (id_User, id, status) => {
    try {
        // Tìm người dùng bằng id
        const user = await UserModel.findById(id_User);
        if (!user) {
            throw new Error("Không tìm thấy thành viên");
        }
        
        // Tìm thông báo cần cập nhật
        const itemIndex = user.notification.findIndex(item => item.id.toString() === id.toString());
        console.log(itemIndex)
        if (itemIndex === -1) {
            throw new Error("Không tìm thấy thông báo với ID đã cho");
        }
        
        // Cập nhật trạng thái của thông báo
        user.notification[itemIndex].status = status;
        user.notification[itemIndex] = user.notification[itemIndex]
        
        // Lưu thay đổi
        await user.save();

        // Trả về thông báo đã được cập nhật
        return user.notification[itemIndex];
        
    } catch (error) {
        console.error('Cập nhật trạng thái thất bại:', error.message);
        throw error;
    }
};


module.exports = { addnotification, getnotification, updatestatus }
