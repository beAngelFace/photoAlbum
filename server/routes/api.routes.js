const router = require ('express').Router()
const tokensRouter = require('./tokens.routes')
const authRouter = require('./auth.routes')
const albumsRouter = require('./albums.routes')
const photosRouter = require('./photo.routes')

router.use('/photo', photosRouter);
router.use('/auth', authRouter);
router.use('/tokens', tokensRouter);
router.use('/albums', albumsRouter)

module.exports = router;