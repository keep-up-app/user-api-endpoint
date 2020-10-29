/**
 * Include all dependencies
 */

const UserController = require('../controllers/UserController');
const express = require('express');
const router = express.Router();

module.exports = router;


/**
 * Creats new user with given params
 * 
 * URI: user/create
 */

router.post('/create', async(req, res) => {

    let params = req.body;

    const user = await UserController.create(params
        .catch(err => res.status(400).json({ error: err })));

    res.json(user);
});


/**
 * Gets user with given params
 * 
 * URI: user/find
 */

router.get('/find', async(req, res) => {
    
    let params = req.query;

    if (params.password) res.status(403).json({ error: "Cannot find User with password." });

    const user = await UserController.find(params)
        .catch(err => res.status(400).send({ error: err }));

    res.json(user);
});




