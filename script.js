// Requirements:
// 1) There are 2 players and players take turns
// 2) when a player clicks submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// 3) the player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first
// 4) after both players have rolled and chosen dice order, the player with the higher combined number wins.

// Problem breakdown and planning:
// ver 1. Rolls 2 dice and returns the output for 1 player. That player chooses the dice order and get the correct return output
// ver 2. Refactored code to include player 2
// ver 3. iplement comparing dice scores and declare winner
// ver 4. reset the game so that the players can play continually without refreshing the browser

//global variables
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
var gameState = GAME_STATE_DICE_ROLL;

var playerRolls = [];
var currentPlayer = 1;
var allPlayerScores = [];

var rollDice = function () {
  console.log("Start of rollDice");
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log("rollDice output, random integer:", randomInteger);
  return randomInteger;
};

var rollDiceForPlayer = function () {
  console.log("Roll dice for player");
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }
  return `Welcome player ${currentPlayer}. You rolled ${playerRolls[0]} for dice one and ${playerRolls[1]} for dice two. <br> 
  Please choose the order of the dice by entering "1" or "2".`;
};

var playerScoreOutput = function (playerInput) {
  var playerScore;
  var playerMessage = "";
  // check for validation
  if (!playerInput) {
    return `Welcome player ${currentPlayer}. You rolled ${playerRolls[0]} for dice one and ${playerRolls[1]} for dice two. <br> 
  Please choose the order of the dice by entering "1" or "2".`;
  }

  if (playerInput != 1 && playerInput != 2) {
    return `Welcome player ${currentPlayer}. You rolled ${playerRolls[0]} for dice one and ${playerRolls[1]} for dice two. <br> 
  Please choose the order of the dice by entering "1" or "2".`;
  }

  if (playerInput == 1) {
    var playerScore = String(playerRolls[0]) + String(playerRolls[1]);
    playerMessage = `You chose Dice 1 first. Your number is ${playerScore}`;
  }

  if (playerInput == 2) {
    var playerScore = String(playerRolls[1]) + String(playerRolls[0]);
    playerMessage = `You chose Dice 2 first. Your number is ${playerScore}`;
  }
  allPlayerScores.push(playerScore);
  playerRolls = [];
  return playerMessage;
};

var resetGame = function () {
  console.log("RESET GAME", resetGame);
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayerScores = [];
};

var main = function (input) {
  console.log("Checking game state on submit click:", gameState);
  console.log("Checking currentPlayer on submit click:", currentPlayer);
  var outputMessage = "";

  if (gameState == GAME_STATE_DICE_ROLL) {
    outputMessage = rollDiceForPlayer();
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    outputMessage = playerScoreOutput(input);
    console.log("PLAYERROLLS", playerRolls);

    if (currentPlayer == 1 && (input == 1 || input == 2)) {
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return outputMessage + "<br><br> It is now player 2's turn!";
    }
    if (currentPlayer == 2 && (input == 1 || input == 2)) {
      gameState = GAME_STATE_COMPARE_SCORES;
      return outputMessage + "<br><br> Submit to calculate scores!";
    }
  }

  if (gameState == GAME_STATE_COMPARE_SCORES) {
    outputMessage =
      "Player 1 scores: " +
      allPlayerScores[0] +
      "<br>Player 2 scores: " +
      allPlayerScores[1];
    // player 1 wins
    if (allPlayerScores[0] > allPlayerScores[1]) {
      outputMessage = outputMessage + "<br><br>Player 1 wins!";
    }

    // player 2 wins
    if (allPlayerScores[1] > allPlayerScores[0]) {
      outputMessage = outputMessage + "<br><br>Player 2 wins!";
    }
    // tie
    if (allPlayerScores[0] == allPlayerScores[1]) {
      outputMessage = outputMessage + "<br><br>It's a tie!";
    }
  }

  resetGame();
  return outputMessage;
};
