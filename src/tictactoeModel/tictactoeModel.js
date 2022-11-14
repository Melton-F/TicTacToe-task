import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
    player : {
        type:String
    },
    XO : {
        type:mongoose.Schema.Types.Mixed
    }
},{versionKey:false})

const Game = mongoose.model('XOGame', gameSchema)
module.exports = Game