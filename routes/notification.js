var express = require('express');
var router = express.Router();
const notificationController = require('../controllers/NotifiController')


router.post('/addnotification/', async (req, res, next) => {
    try {
        const { id_User, id, date, day, month, year, profilename, profileemail, profileaddress, profilephone, expressname, expresstime, namepay, pricepaysum, pricepayExpress, products } = req.body;
        console.log(products)
        const result = await notificationController.addnotification(id_User, id, date, day, month, year, profilename, profileemail, profileaddress, profilephone, expressname, expresstime, namepay, pricepaysum, pricepayExpress, products);
        if (!result) {
            return res.status(500).json({ status: false });
        }
        return res.status(200).json({ status: true, data: result });

    } catch (error) {
        console.log('Error addnotification--------------', error.message);
        return res.status(500).json({ message: error.message })
    }
});

router.post('/getnotification/', async (req, res, next) => {
    try {
        const { id_User } = req.query;
        console.log(id_User)
        const result = await notificationController.getnotification(id_User);
        if (!result) {
            return res.status(500).json({ status: false });
        }
        return res.status(200).json({ status: true, data: result });

    } catch (error) {
        console.log('Error addnotification--------------', error.message);
        return res.status(500).json({ message: error.message })
    }
});

router.post('/update_status/', async (req, res, next) => {
    try {
        const { id_User, id, status } = req.body;
        console.log(id_User, id, status)
        const result = await notificationController.updatestatus(id_User, id, status);
        if (!result) {
            return res.status(500).json({ status: false });
        }
        return res.status(200).json({ status: true, data: result });

    } catch (error) {
        console.log('Error update_status--------------', error.message);
        return res.status(500).json({ message: error.message })
    }
});


module.exports = router;