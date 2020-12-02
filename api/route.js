/**
 * Include all dependencies
 */

const UserController = require('../controllers/UserController');
const express = require('express');
const router = express.Router();

module.exports = router;


/**
 * Creats new user with given paramaters
 * URI: user/create
 * 
 * @method {POST}
 */

router.post('/create', (req, res) => {

    UserController.create(req.body)
        .then(user => res.status(201).send(user))
        .catch(err => { return res.status(err.code).send({ error: err.message, details: err.details }) });
});


/**
 * Gets user with given params
 * URI: user/find
 * 
 * @method {POST}
 */

router.post('/find', async(req, res) => {
    
    if (Object.keys(req.body).length == 0) return res.sendStatus(403);

    UserController.find(req.body)
        .then(user => res.send(user))
        .catch(err => { return res.status(err.code).send({ error: err.message, details: err.details }) });
});


/**
 * Updates user by ID with given body paramaters
 * URI: user/update
 * 
 * @method {PUT}
 */

router.put('/update', async(req, res) => {

    if (await checkTokenAuth(req) == 204) {
        UserController.update(req.body)
            .then(user => res.send(user))
            .catch(err => { return res.status(err.code).send({ error: err.message, details: err.details }) });
    } else {
        return res.sendStatus(403);
    }
});


/**
 * Destroys USER record matching params and sends message response
 * URI: user/destroy
 *  
 * @method {DELETE}
 */

router.delete('/destroy', async(req, res) => {

    if (await checkTokenAuth(req) == 204) {
        UserController.destroy(req.body)
            .then(info => res.send({ success: info }))
            .catch(err => { return res.status(err.code).send({ error: err.message, details: err.details }) });
    } else {
        return res.sendStatus(403);
    }
});


/**
 * Global endpoint for checking user token.
 * Sends empty response if valide, sends 403 if invalid.
 * URI: user/checkToken
 * 
 * @method {GET}
 */

router.get('/checkToken', async(req, res) => {
    return res.sendStatus(await checkTokenAuth(req));
});


/**
 * Helper function for checking token auth
 * 
 * @param {Request} req 
 */

const checkTokenAuth = async (req) => {
    console.log(req);
    let token = req.get('Authorization');
    let user = await UserController.find({ token: token })
        .catch(err => { return console.log(err) });
    return user ? 204 : 403; 
}