import Game from "../tictactoeModel/tictactoeModel";

exports.showGame = async (req, res) => {
  try {
    const gameStatus = await Game.find();
    res.status(200).json({
      gameStatus: gameStatus,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      error: {
        err,
      },
    });
  }
};

exports.gameOn = async (req, res) => {
  try {
    const Position1 = req.body.Position1;
    const Position2 = req.body.Position2;

    const doc = await Game.find();

    if (doc < 1) {
      let nullArray = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];
      nullArray[Position1][Position2] = req.body.xORo;

      const game = await Game.create({
        player: req.body.player,
        XO: nullArray,
      });
      return res.status(201).json({
        game: game,
      });
    } else {
      const result = doc[0];
      let existArr = result.XO;
      existArr[Position1][Position2] = await req.body.xORo;

      const updation = await Game.updateMany({
        player: req.body.player,
        XO: existArr,
      });

      console.log(updation);
      if (updation) {
        let win = false;
        if (
          result.XO[0][0] === result.XO[0][1] &&
          result.XO[0][0] === result.XO[0][2] && result.XO[0][0]!= null
        ) {
          win = true;
          return res.status(200).json({
            status: "Success in 1st row",
            congratulationMessage: `Hurrayy...!!! ${result.player} WON the Match`,
            gameStatus: result.XO,
          });
        }
        if (
          result.XO[1][0] === result.XO[1][1] &&
          result.XO[1][0] === result.XO[1][2] && result.XO[1][0]!= null
        ) {
          win = true;
          return res.status(200).json({
            status: "Success in 2nd row",
            congratulationMessage: `Hurrayy...!!! ${result.player} WON the Match`,
          });
        }
        if (
          result.XO[2][0] === result.XO[2][1] &&
          result.XO[2][0] === result.XO[2][2] && result.XO[2][0]!= null
        ) {
          win = true;
          return res.status(200).json({
            status: "Success in 3rd row",
            congratulationMessage: `Hurrayy...!!! ${result.player} WON the Match`,
          });
        }
        if (
          result.XO[0][0] === result.XO[1][0] &&
          result.XO[0][0] === result.XO[2][0] && result.XO[0][0]!= null
        ) {
          win = true;
          return res.status(200).json({
            status: "Success in 1st column",
            congratulationMessage: `Hurrayy...!!! ${result.player} WON the Match`,
          });
        }
        if (
          result.XO[0][1] === result.XO[1][1] &&
          result.XO[0][1] === result.XO[2][1] && result.XO[0][1]!= null
        ) {
          win = true;
          return res.status(200).json({
            status: "Success in 2nd column",
            congratulationMessage: `Hurrayy...!!! ${result.player} WON the Match`,
          });
        }
        if (
          result.XO[0][2] === result.XO[1][2] &&
          result.XO[0][2] === result.XO[2][2] && result.XO[0][2]!= null
        ) {
          win = true;
          return res.status(200).json({
            status: "Success in 3rd column",
            congratulationMessage: `Hurrayy...!!! ${result.player} WON the Match`,
          });
        }
        if (
          result.XO[0][0] === result.XO[1][1] &&
          result.XO[0][0] === result.XO[2][2] && result.XO[0][0]!= null
        ) {
          win = true;
          return res.status(200).json({
            status: "Success left cross",
            congratulationMessage: `Hurrayy...!!! ${result.player} WON the Match`,
          });
        }
        if (
          result.XO[0][2] === result.XO[1][1] &&
          result.XO[0][2] === result.XO[2][0] && result.XO[0][2]!= null
        ) {
          win = true;
          return res.status(200).json({
            status: "Success in right cross",
            congratulationMessage: `Hurrayy...!!! ${result.player} WON the Match`,
          });
        }

        // const resultArrValues = (result.XO[0].length + result.XO[1].length + result.XO[2].length)
        // if((win === false) && (resultArrValues === 9)){
        //     const deleteCol = await Game.deleteMany()
        //     return res.status(200).json({
        //         gameMessage:"No more moves, Match DRAW!",
        //         gameResult:result.XO
        //     })
        // }
        if (win === false) {
        //   let arr = result.XO
        //   var newArr = [];

        //   for (var i = 0; i < arr.length; i++) {   
        //     newArr = newArr.concat(arr[i]);
        //   }
        //   console.log(newArr);   //[ 'x', 'o', 'x', 'x', 'o', 'x', 'x', 'o', 'x' ]

        //   let count = 0
        //   for(let i = 0;i<newArr.length;i++){
            
        //   }
          

          return res.status(200).json({
            gameMessage: "Proceed your next move bro",
            gameStatus: result.XO,
          });
        }
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "Failed to go over the game",
      error: err.message,
    });
  }
};
