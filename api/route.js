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
        .catch(err => { return res.status(400).send({ error: err }) });

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

    if (params.password) res.status(403).send({ error: "Operation not permitted." });

    let user = await UserController.find(params)
        .catch(err => { return res.status(400).send({ error: err }) });

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
    }).catch(err => { return res.status(400).send({ error: err }) });
    
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

    let params = req.query;

    let message = await UserController.destroy({params})
        .catch(err => { return res.send({ error: err }) });

    if (message) return res.status(400).send({ success: message });
});
