var express = require('express');
var router = express.Router();
const productController = require('../controllers/ProductController');

// 1. API Lấy danh sách tất cả sản phẩm
// method: get
// url: http://localhost:8686/san-pham
// kết quả: danh sách sản phẩm có sắp xếp giảm dần theo giá tiền

router.get('/', async (req, res, next) => {
    const { page, limit } = req.query;
    try {
        const result = await productController.getproducts(page, limit)
        if (!result) {
            return res.status(500).json({ status: 'Error get product' });
        }
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('------------------errorproductlist: ', error.message);
        return res.status(500).json({ status: 'Error get product' });
    }
});

// 2. API tìm kiếm sản phẩm theo từ khóa
// method: get
// url: http://localhost:8686/san-pham/tim-kiem?key=Product 1
// kết quả: danh sách sản phẩm có tên hoặc mô tả chứa từ khóa tìm kiếm
router.get('/tim-kiem', async function (req, res, next) {
    const { _id } = req.query;
    console.log(_id);
    try {
        const result = await productController.findproductById(_id)
        if (!result) {
            return res.status(500).json({ status: 'do not find id product' });
        }
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('------------------error find product: ', error.message);
        return res.status(500).json({ status: 'Error find product' });
    }
})

// 3. API lấy danh sách sản phẩm theo 1 danh mục
// method: get
// url: http://localhost:8686/san-pham/danh-muc?id=1
// kết quả: danh sách sản phẩm theo danh mục

router.get('/danh-muc', async function (req, res, next) {
    const { _id, page, limit } = req.query;
    try {
        const result = await productController.findCategory(_id, page, limit)
        if (!result) {
            throw new Error('Not found category')
        }
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('------------------error category list: ', error.message);
        return res.status(500).json({ status: 'Error category list' });
    }
})

// 4. API lấy danh sách sản phẩm có giá trong khoảng min, max
// và có số lượng lớn hơn 0
// method: get
// url: http://localhost:8686/san-pham/loc-theo-gia?min=1&max=10
// kết quả: danh sách sản phẩm theo như yêu cầu, có sắp xếp tăng dần theo số lượng
// API sử dụng database mongodb

router.get('/loc-theo-gia', async function (req, res, next) {
    const { min, max, page, limit } = req.query;
    try {
        const result = await productController.filterPrice(min, max, page, limit)
        if (!result) {
            throw new Error('Can not found  products');
        }
        return res.status(200).json({ status: true, filterPrice: result });
    } catch (error) {
        console.log('------------------error filterPrice: ', error.message);
        return res.status(500).json({ status: 'Error filterPrice' });
    }
})
// add product

router.post('/addproduct/', async (req, res, next) => {
    try {
        const { name, price, quantity, description, images, size, status, origin, category_id, type } = req.body;


        const result = await productController.addproduct(name, price, quantity, description, images, size, status, origin, category_id, type);

        if (!result) {
            return res.status(500).json({ status: false });
        }
        return res.status(200).json({ status: true });

    } catch (error) {
        console.log('Error addproduct--------------', error.message);
        return res.status(500).json({ message: error.message })
    }
});

router.post('/updateproduct/', async (req, res, next) => {
    try {
        const {_id, name, price, quantity, description, images, size, status, origin, category_id, type } = req.body;


        const result = await productController.updateproduct(_id,name, price, quantity, description, images, size, status, origin, category_id, type);

        if (!result) {
            return res.status(500).json({ status: false });
        }
        return res.status(200).json({ status: true , data: result });

    } catch (error) {
        console.log('Error addproduct--------------', error.message);
        return res.status(500).json({ message: error.message })
    }
});


// deleteproduct 
router.get('/delete_product', async function (req, res, next) {
    const { _id } = req.query;
    console.log(_id);
    try {
        const result = await productController.deleteproducts(_id)
        if (!result) {
            return res.status(500).json({ status: false,data:'delete unsuccess' });
        }
        return res.status(200).json({ status: true, data: 'delete success' });
    } catch (error) {
        console.log('------------------error delete product: ', error.message);
        return res.status(500).json({ status: 'Error delete product' });
    }
})

module.exports = router;
