const { Game } = require('../models');

async function create(req, res){
  try {
    req.body.owner = req.user.profile.id;
    console.log('req body', req.body);
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err });
  }
}




module.exports = {
  create,
}