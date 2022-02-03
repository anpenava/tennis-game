"use strict";

var game = require("./models/game");

describe("Tennis Game Scoring Tests", () => {
  test("Verify match starts with 0 on both sides", () => {
    game.startMatch();
    expect(game.currentScore[0]).toBe(0);
    expect(game.currentScore[1]).toBe(0);
  });

  test("Verify that scoreToText() to text returns correct string", () => {
    game.startMatch();
    expect(game.scoreToText(0)).toBe('Love');
    expect(game.scoreToText(2)).toBe('Thirty');
    expect(game.scoreToText(3)).toBe('Forty');
  });

  test("Simulate match", () => {
    game.startMatch();
    const numberOfPlays = game.getRandomNumber(10, 20);

    let increment = 0;

    while (increment < numberOfPlays) {
      if (game.getRandomNumber(0, 1) == 1) {
        game.playerAScores();
      } else {
        game.playerBScores();
      }

      increment ++;
    }
    
    console.log(game.getResult());
    
    expect(game.getResult()).toContain("winner");
  });
  
  test("Verify that getGameOver() sets gameOver to true if winner has at least two points more than the opponent", () => {
    game.startMatch();
    game.getGameOver(2, true);
    expect(game.gameOver).toBe(true);
  });  
});