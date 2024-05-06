const userModel = require('../model/UserModel');
const { sendMail } = require('../vetify/Mailer');
const mailContent = require('../vetify/MailContent');
//register
const register = async (account, code) => {
    try {
        if (account.code != code) {
           return false;
        }
        let user = new userModel({
            email: account.email,
            password: account.password,
            name: account.name
        });
        // save user 
        const result = await user.save();
        return result;
    } catch (error) {
        console.log('Error Register---------------', error.message);
        throw new Error('Register do not success');
    }
}
//check email
const checkemail = async (email, password, name) => {
    try {
         // Chuyển email nhập vào thành chữ thường
         const lowercasedEmail = email.toLowerCase();

        // check email exists in db - seclect * from user where email =email
        let user = await userModel.findOne({ email: lowercasedEmail })
        if (user) {
            return false
        }

        // create new user 
        // gửi mail xác thực  tài khoản cho người dùng
        let code = Math.floor(Math.random() * 1000000)
        setTimeout(async () => {
            const data = {
                email: email,
                subject: `Xác thực tài khoản ${email}`,
                content: mailContent.html(email, code)
            }
            await sendMail(data);
        }, 1000);

        var account = {
            email: lowercasedEmail,
            password: password,
            name: name,
            code: code
        }

        return account;
    } catch (error) {
        console.log('Error Register', error.message);
        throw new Error('Register do not success');
    }
}

//login
const login = async (email, password) => {
    try {
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return false;
        } else {
            const checkpassword = user.password.toString() === password.toString();
            if (!checkpassword) {
                return false
            } else {
                return user;
            }
        }
    } catch (error) {
        console.log('Error Login', error.message);
        throw new Error('Login do not success');
    }
}

//Verify email
const vetifyEmail = async (email) => {
    try {
        // check email exists in db - seclect * from user where email =email
        let user = await userModel.findOne({ email: email })
        if (!user) {
            throw new Error('Can not found email')
        }
        const result = await user.save();
        return result;
    } catch (error) {
        console.log('Error Register', error.message);
        throw new Error('Register do not success');
    }
}

// update user 
const updateUser = async (email, password, name) => {
    try {
        // check email exists in db - seclect * from user where email =email
        let user = await userModel.findOne({ email: email })
        if (!user) {
            throw new Error('Account already exists')
        }
        // update user 
        user.name = name || user.name;
        user.password = password || user.password;
        user.email = email || user.email;
        // save user
        const result = await user.save();
        return result;
    } catch (error) {
        console.log('Error updateUser', error.message);
        throw new Error('updateUser do not success');
    }
}

// update user 
const updateProfile = async (id_User,email, name, address, phone) => {
    try {
        // check email exists in db - seclect * from user where email =email
        let user = await userModel.findOne({ _id: id_User })
        if (!user) {
            throw new Error('Account already exists')
        }
        // update user 
        user.name = name || user.name;
        user.email = email || user.email;
        user.address = address || user.address;
        user.phone = phone || user.phone;
        // save user
        const result = await user.save();
        return result;
    } catch (error) {
        console.log('Error updateprofile', error.message);
        throw new Error('updateprofile do not success');
    }
}









module.exports = { register, login, updateUser, checkemail,updateProfile };