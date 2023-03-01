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

async function index(req, res){
  try {
    const games = await Game.findAll({
      where: { owner: req.user.profile.id }
    })
    // console.log(games);
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({err: err});
  }
}

async function delGame(req, res){
  try {
    const removed = await Game.destroy(
      { where: {
        GA_id: req.body.GA_id,
        owner: req.user.profile.id
      }}
    )
    res.status(200).json(removed);
  } catch (err) {
    res.status(500).json({err: err});
  }
}

async function updateGame(req, res){
  try {
    // console.log('req body',req.body);
    const gameToUpdate = await Game.findOne({
      where: {
        GA_id: req.body.GA_id,
        owner: req.user.profile.id
      }
    })
    // console.log('backend',gameToUpdate);
    gameToUpdate.name = req.body.name;
    gameToUpdate.GA_id = req.body.GA_id;
    gameToUpdate.photo = req.body.photo;
    gameToUpdate.rating = req.body.rating;
    await gameToUpdate.save();
    res.status(201)
  } catch (err) {
    console.error(err);
    res.status(500).json({err: err})
  }
}


module.exports = {
  create,
  index,
  delGame,
  updateGame,
}