const User = require('../models/User')

const Register = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    await User.findOne({ $or: [{ username: username }, { email: email }] }).then((response) => {
        if (response) {
            return res.status(409).json();
        } else {
            const newUser = User.create({ username: username, password: password, email: email });
                res.status(201).json();
        }
    }).catch((err) => {
        res.status(500).json();
    })
}

const Login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await User.findOne({ username: username, password: password }).then((response) => {
        if (response) {
            res.json(response)
        } else {
            return res.status(404).json();
        }
    }).catch((err) => {
        res.status(500).json();
    })

}

module.exports = { Register, Login }