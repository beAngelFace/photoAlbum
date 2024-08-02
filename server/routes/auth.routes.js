const router = require('express').Router();

const {User} = require('../db/models');
const bcrypt = require('bcrypt');
const generateTokens = require('../utils/generateTokens');
const jwtConfig = require('../config/jwtConfig')

router.post('/registration', async (req, res) => {
    console.log(11111111111);
    
    try {
        const {name, email, password} = req.body;

        if(name.trim() === '' ||
        email.trim() === '' ||
        password.trim() === '') {
            return res.status(400).json({message: 'Заполните все поля'})
        }
        const userInDb = await User.findOne({where: {email}})
        console.log( userInDb);
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
        res.status(500).json({error: error.message})
    }
});


router.post('/authorization', async (req, res) => {
    try {
        const { email, password} = req.body;

        if (email.trim() === ''|| 
            password.trim() === '') {
            return res.status(400).json({message: 'Заполните все поля'})
        }

        const user = (await User.findOne({where: {email}})).get();
        const isMatch = await bcrypt.compare(password, user.password)

        if (user && isMatch) {
            const {accessToken, refreshToken} = generateTokens({user});

            res
                .status(200)
                .cookie(jwtConfig.refresh.type, refreshToken, {httpOnly: true, maxAge: jwtConfig.refresh.expiresIn})
                .json({accessToken, user})
        } else {
            return res.status(400).json({message: 'Неверные почта или пароль!'})
        }

    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

router.delete('/logout', (req, res) => {
    // HTTP заголовок Set-Cookie max-age=0
    res
        .clearCookie(jwtConfig.refresh.type)
        .json({accessToken: ''})

});

module.exports = router;