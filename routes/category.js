var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/CategoryController');
const { findCategory } = require('../controllers/ProductController');

// getcategory
router.get('/', async (req, res, next) => {
    try {
        const result = await categoryController.getcategory();
        if (!result) {
            return res.status(500).json({ status: false,data:'Error get category' });
        }
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('------------------error getcategory: ', error.message);
        return res.status(500).json({ status: 'Error get category' });
    }
});

// findCategory
router.get('/findcategory', async (req, res, next) => {
    try {
        const {_id} = req.query;
        const result = await categoryController.findCategory(_id);
        if (!result) {
            return res.status(500).json({ status: false,data:'Error get category' });
        }
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        console.log('------------------error getcategory: ', error.message);
        return res.status(500).json({ status: 'Error get category' });
    }
});

module.exports = router;