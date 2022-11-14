import express from 'express'
import gameController from '../tictactoeController/tictactoeController'
const router = express.Router()


router.route('/').get(gameController.showGame)
router.route('/startGame').post(gameController.gameOn)

module.exports = router