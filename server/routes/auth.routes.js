const router = require('express').Router();
const {User} = require('../db/models');
const bcrypt = require('bcrypt');
const generateTokens = require('../utils/generateTokens');
const jwtConfig = require('../config/jwtConfig')

router.post('/registration', async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if(name.trim() === '' ||
        email.trim() === '' ||
        password.trim() === '') {
            return res.status(400).json({message: 'Заполните все поля'})
        }
        const userInDb = await User.findOne({where: {email}})
        if (userInDb) {
            return res.status(400).json({message: 'Такой пользователь уже существует'})
        } else {
            const user = (await User.create({name, email, password: await bcrypt.hash(password, 10)})).get();

            const {accessToken, refreshToken} = generateTokens({user});
            console.log(user);


            res
            .status(201)
            .cookie(jwtConfig.refresh.type, refreshToken, {httpOnly: true, maxAge: jwtConfig.refresh.expiresIn})
            .json({accessToken, user})
        }
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }


});


router.post('./authorization', (req, res) => {

});

router.delete('/logout', (req, res) => {

});

module.exports = router;