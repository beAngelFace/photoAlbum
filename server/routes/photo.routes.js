const router = require('express').Router();
// const { where } = require('sequelize'); для чего?
const {Photo} = require('../db/models');
const verifyAccessToken = require('../middleware/verifyAccessToken')

router.route('/')
    .get(verifyAccessToken, async (req, res) => {
        try {
            const allPhotos = await Photo.findAll()
            res.json(allPhotos);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    })
    .post(verifyAccessToken, async (req, res) => {
        try {
            const {photo, description} = req.body;

            // const {user} = res.locals;

            if (photo && description) {
                const newPhoto = (await Photo.create({photo, description})).get()

                res.status(201).json(newPhoto)
            } else {
                res.status(400).json({message: 'Заполните пустые поля'})
            }

            
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    })

router.route('/:id')
    
    .delete(verifyAccessToken, async (req, res) => {
        try {
            const {id} = req.params;

            const deleteStatus = await Photo.destroy({where: {id}})

            deleteStatus ? res.sendStatus(200) : res.sendStatus(404);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    })

module.exports = router;