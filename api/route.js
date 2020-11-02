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

router.post('/create', (req, res) => {

    UserController.create(req.body)
        .then(user => res.send(user))
        .catch(err => { return res.status(err.code).send({ error: err.message, details: err.details }) });
});


/**
 * Gets user with given params
 * URI: user/find
 * 
 * @method {GET}
 */

router.get('/find', async(req, res) => {
    
    UserController.find(req.query)
        .then(user => res.send(user))
        .catch(err => { return res.status(err.code).send({ error: err.message, details: err.details }) });
});


/**
 * Updates user by ID with given body paramaters
 * URI: user/update
 * 
 * @method {PUT}
 */

router.put('/update', (req, res) => {
    
    UserController.update(req.body)
        .then(user => { console.log(user); res.send(user)})
        .catch(err => { return res.status(err.code).send({ error: err.message, details: err.details }) });
});


/**
 * Destroys USER record matching params and sends message response
 * URI: user/destroy
 *  
 * @method {DELETE}
 */

router.delete('/destroy', (req, res) => {

    UserController.destroy(req.body)
        .then(info => res.send({ message: info }))    
        .catch(err => { return res.status(err.code).send({ error: err.message, details: err.details }) });
});
