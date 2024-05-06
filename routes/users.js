var express = require('express');
var router = express.Router();
var userController = require("../controllers/UsersController");


// 2. API đăng ký tài khoản, có gửi email xác thực
// method: post
// url: http://localhost:8686/dang-ky
// kết quả: đăng ký thành công hoặc thất bại
let account = {};
router.post('/register/vetification', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    account = await userController.checkemail(email, password, name);
    setTimeout(() => {
      account = {};
    }, 300000);

    if (account) {
      return res.status(200).json({ status: true, data : account})
    } else {
      return res.status(500).json({ status: false })
    }

  } catch (error) {
    console.log('Error Register--------------', error.message);
    return res.status(500).json({ message: error.message })
  }
});



router.post('/register/', async (req, res, next) => {
  try {
    const { code } = req.query;
    if (code) {
      const result = await userController.register(account, code);
      if (result) {
        return res.status(200).json({ status: true, data: result });
      } else {
        return res.status(500).json({ status: false });
      }

    }
  } catch (error) {
    console.log('Error Register--------------', error.message);
    return res.status(500).json({ message: error.message })
  }
});
// Tạo các API sau, có kết nối với MongoDB
// 1. API đăng nhập tài khoản
// method: post
// url: http://localhost:8686/dang-nhap
// kết quả: đăng nhập thành công hoặc thất bại

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userController.login(email, password);
    if (result) {
      return res.status(200).json({ status: true, data: result });
    } else {
      return res.status(500).json({ status: false });
    }
  } catch (error) {
    console.log('Error login--------------', error.message);
    return res.status(500).json({ message: error.message })
  }
});

// 3. API cập nhật tài khoản
// method: post
// url: http://localhost:8686/cap-nhat-tai-khoan
// kết quả: cập nhật thành công hoặc thất bại

router.post('/update_user', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    console.log(email, password, name);
    const result = await userController.updateUser(email, password, name);
    return res.status(200).json(result)
  } catch (error) {
    console.log('Error Register--------------', error.message);
    return res.status(500).json({ message: error.message })
  }
});

router.post('/updateProfile', async (req, res, next) => {
  try {
    const { id_User, email, name, address, phone } = req.body;
    const result = await userController.updateProfile(id_User, email, name, address, phone);
    if (result) {
      return res.status(200).json({ status: true })
    } else {
      return res.status(500).json({ status: false })
    }
  } catch (error) {
    console.log('Error Register--------------', error.message);
    return res.status(500).json({ message: error.message });
  }
});

// 4. API xác thực email
// method: get
// url: http://localhost:8686/xac-thuc-email?email=abc@gmail&code=123
// kết quả: xác thực thành công hoặc thất bại



module.exports = router;
