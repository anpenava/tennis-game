var pluralizeIfHasCount = require("./utils/pluralize-if-has-count");

const MSG_TEXT = "Game is finished!";

class Game {
  constructor(currentScore = [0, 0], gameOver = false) {
    this.currentScore = currentScore;
    this.gameOver = gameOver;
  }

  get playerAScore() {
    return this.currentScore[0];
  }

  get playerBScore() {
    return this.currentScore[1]; 
  }

  startMatch() {
    console.log('MATCH STARTED!');
  }
  
  playerAScores() {
    if (this.gameOver) {
      return;
    }

    this.currentScore[0]++;
    this.getResult();
  }
  
  playerBScores() {
    if (this.gameOver) {
      return;
    }

    this.currentScore[1]++;
    this.getResult();
  } 

  getGameOver(diff, isPlayerAWinning) {
    if (diff > 1) {
      this.gameOver = true;

      if (isPlayerAWinning) {
        return "Player A is the winner!";
      } else {
        return "Player B is the winner!";
      }      
    }  
  }

  getAdvantage(diff, isPlayerAWinning) {
    if (diff === 1) {
      if (isPlayerAWinning) {
        return ": Advantage Player A";
      } else {
        return ": Advantage Player B";
      }
    }
  }

  // TODO use for generating random number of games
  getRandomNumber(min, max) {
    let randomScore = Math.random() * (max - min) + min;
    return Math.round(randomScore);
  }

  getResult() {
    if (this.message) return this.message;
    
    const diff = Math.abs(this.playerAScore - this.playerBScore);

    let result;
    let scoreTextDescription;

    if (this.playerAScore > 3 || this.playerBScore > 3) {
      const isPlayerAWinning = this.playerAScore > this.playerBScore;
      result = this.getGameOver(diff, isPlayerAWinning);

      if (this.gameOver) {
        result = result;
      } else {
        scoreTextDescription += this.getAdvantage(diff, isPlayerAWinning);
      }
    }

    if (this.playerAScore >= 3 && this.playerBScore >= 3 && diff === 0) {
      scoreTextDescription += ": Deuce";
    }
    
    if (result) return result;

    result = `Player A ${pluralizeIfHasCount(this.playerAScore, "time")}, Player B ${pluralizeIfHasCount(this.playerBScore, "time")}`;

    if (scoreTextDescription) {
      result += scoreTextDescription;
    } else {
      result += `: ${this.scoreToText(this.playerAScore)} - ${this.scoreToText(this.playerBScore)}`;
    }

    return result;
  }

  scoreToText(score) {
    switch (score) {
      case 0:
        return "Love";
      case 1:
        return "Fifteen";
      case 2:
        return "Thirty";
      case 3:
        return "Forty";
    }
  }  
}

module.exports = new Game();