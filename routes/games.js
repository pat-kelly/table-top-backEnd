const router = require('express').Router();
const gamesCtrl = require('../controllers/games.js');
const middleware = require('../middleware/auth.js');

const { decodeUserFromToken, checkAuth } = middleware;

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
router.post('/', checkAuth, gamesCtrl.create);


module.exports = router;