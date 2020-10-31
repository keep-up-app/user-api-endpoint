/**
 * Include all dependencies
 */

const UserController = require('../controllers/UserController');
const express = require('express');
const router = express.Router();

module.exports = router;


/**
 * Creats new user with given params
 * URI: user/create
 * 
 * @method {POST}
 */

router.post('/create', async(req, res) => {

    let params = req.body;

    const user = await UserController.create(params)
        .catch(err => { return res.status(err.code).send({ error: err.message, details: err.details }) });

    if (user) return res.json(user);
    else return res.sendStatus(500);
});


/**
 * Gets user with given params
 * URI: user/find
 * 
 * @method {GET}
 */

router.get('/find', async(req, res) => {
    
    let params = req.query;

    let user = await UserController.find(params)
        .catch(err => { return res.status(err.code).send({ error: err.message, details: err.details }) });

    if (user) return res.send(user);
    else return res.sendStatus(500);
});


/**
 * Updates user by ID with given body paramaters
 * URI: user/update
 * 
 * @method {PUT}
 */

router.put('/update', async(req, res) => {
    
    let retrieve = req.query;
    let params = req.body;

    let user = await UserController.update({
        find: retrieve,
        with: params 
    }).catch(err => { return res.status(err.code).send({ error: err.message, details: err.details }) });
    
    if (user) return res.json(user);
    else return res.sendStatus(500);
});


/**
 * Destroys USER record matching params and sends message response
 * URI: user/destroy
 *  
 * @method {DELETE}
 */

router.delete('/destroy', async(req, res) => {

    let message = await UserController.destroy(req.query)
    .catch(err => { return res.status(err.code).send({ error: err.message, details: err.details }) });

    if (message) return res.send({ success: message });
});
