/**
 * Include all dependencies
 */

const UserController = require('../controllers/UserController');
const express = require('express');
const router = express.Router();

module.exports = router;



router.post('/', async(req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    const user = await UserController.create({
        email,
        password
    }).catch(err => res.status(400).json({ error: err }));

    res.json({ user: user });
});



// create user
router.post('/new', (req, res) => {

    const email = req.body.email;

    UserController.findAnyMatching({ email: email }).then((user) => {

        if (user == null) {

            var user = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone
            });

            user.save()
                .then(() => {
                    log("User " + req.body.username + " Saved")
                })
                .catch((err) => { throw err });

            res.send(user);

        } else {
            res.send({
                message: "Email already taken.",
            });
        }
    });
});


router.get("/find/:id", (req, res) => {

    const id = req.params.id;

    UserController.findById(id).then((user) => {
        if (user != null) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    });
});

router.get('/', async(req, res) => {

    const user = await User.find()
        .catch(err => res.status(400).json({ error: err }));

    res.json({ user: user });
});