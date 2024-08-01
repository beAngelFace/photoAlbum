const router = require('express').Router();
// const { where } = require('sequelize'); для чего?
const {Album} = require('../db/models');
const verifyAccessToken = require('../middleware/verifyAccessToken')

router.route('/')
    .get( verifyAccessToken, async (req, res) => {
        try {
            const allAlbums = await Album.findAll()
            res.json(allAlbums);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    })
    .post(verifyAccessToken, async (req, res) => {
        try {
            const {title, cover, userId} = req.body;

            // const {user} = res.locals;

            if (title && cover) {
                const newAlbum = (await Album.create({title, cover, userId})).get()

                res.status(201).json(newAlbum)
            } else {
                res.status(400).json({message: 'Заполните пустые поля'})
            }

            
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    })

router.route('/:id')
    .put(verifyAccessToken, async (req, res) => {
        try {
            const {title, cover} = req.body;
            const {id} = req.params;

            const [updateStatus] = await Album.update({title, cover}, {where: {id}})

            updateStatus ? res.sendStatus(200) : res.sendStatus(404);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    })
    .delete(verifyAccessToken, async (req, res) => {
        try {
            const {id} = req.params;

            const deleteStatus = await Album.destroy({where: {id}})

            deleteStatus ? res.sendStatus(200) : res.sendStatus(404);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    })

module.exports = router;