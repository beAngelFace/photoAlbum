require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyRefreshToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);


      //отличие от аксес токена в том, что рефреш мы забираем из заголовка

  
      res.locals.user = user;
  
      next();
    } catch (error) {
      console.log('Invalid refresh token');
      res
        .clearCookie('refreshToken')
        .sendStatus(401);
    }
}
  

module.exports = verifyRefreshToken