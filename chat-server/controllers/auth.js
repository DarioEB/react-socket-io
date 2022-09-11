const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const createUser = async(req, res) => {
    const { email, password } = req.body;
    try {

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al crear el usuario, el correo ya está registrado'
            });
        }

        const user = new User(req.body);

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync(11);
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        // Generar el JSON WEB TOKEN
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Error al crear el usuario'
        });
    }
}

const login = async(req, res) => {

    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El email y/o la contraseña no son correctos'
            });
        }

        // Validar el password
        const validPass = bcryptjs.compareSync(password, userDB.password);
        if (!validPass) {
            return res.status(404).json({
                ok: false,
                msg: 'El email y/o la contraseña no son correctos'
            });
        }

        // Generar el TOKEN
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            user: userDB,
            token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Error la iniciar sesión'
        })
    }
}

const reNewToken = async(req, res) => {
    const uid = req.uid;

    // Generar nuevo JWT
    const token = await generateJWT(uid);

    // Usuario por UID
    const user = await User.findById(uid);

    res.json({
        ok: true,
        token,
        user
    })
}

module.exports = {
    createUser,
    login,
    reNewToken
}