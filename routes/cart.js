var express = require('express');
var router = express.Router();
const CartController = require('../controllers/CartController');

//add cart
router.post('/addcart/', async (req, res, next) => {
    try {
        const { id_User, name, price, quantity, images, product_id, type } = req.body;
        const result = await CartController.addproductcart(id_User, name, price, quantity, images, product_id, type);

        if (!result) {
            return res.status(500).json({ status: false });
        }
        return res.status(200).json({ status: true, data: result });

    } catch (error) {
        console.log('Error addproduct--------------', error.message);
        return res.status(500).json({ message: error.message })
    }
});

// getproductcart
router.post('/getproductcart/', async (req, res, next) => {
    try {
        const { id_User } = req.query;
        console.log(id_User)
        const result = await CartController.getproductcart(id_User);

        if (!result) {
            return res.status(500).json({ status: false });
        }
        return res.status(200).json({ status: true, data: result });

    } catch (error) {
        console.log('Error getproductcart--------------', error.message);
        return res.status(500).json({ message: error.message })
    }
});

// delete cart
router.post('/deleteproductcart/', async (req, res, next) => {
    try {
        const { id_User } = req.query;
        const { product_id } = req.body;


        const result = await CartController.deleteproductcart(id_User, product_id);

        if (!result) {
            return res.status(500).json({ status: false });
        }
        return res.status(200).json({ status: true, data: result });

    } catch (error) {
        console.log('Error getproductcart--------------', error.message);
        return res.status(500).json({ message: error.message })
    }
});

// updatequantity
router.post('/updatequantity/', async (req, res, next) => {
    try {
        const { id_User, product_id,status } = req.body;
        const result = await CartController.updatequantity(id_User, product_id,status);

        if (!result) {
            return res.status(500).json({ status: false });
        }
        return res.status(200).json({ status: true});

    } catch (error) {
        console.log('Error addproduct--------------', error.message);
        return res.status(500).json({ message: error.message })
    }
});


module.exports = router;