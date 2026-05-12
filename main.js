const character = require("./Classes/character");
const readline = require('readline-sync');

var hero = new character("Hero", 3, 0);
var demonKing = new character("Demon King", 3, 0);
var continueGame = true;

function getRandomInt() {
  return Math.floor(Math.random() * 10);
}

function checkInput(input, posVal) {
    var pass = true;
    if (!Number.isInteger(parseInt(input))) {
        pass = false;
        return pass;
    } else {
        for(let i = 0; i < posVal.length; i++) {
            if (input == posVal[i]) {
                return pass;
            }
        }
        pass = false;
        return pass;
    }
}


// Start of program
do {
    
    console.log("<<<Welcome to Fantasy RPG!>>>\nPress (1) to start the game.\nPress (2) to exit.");
    var userIn = readline.question(">>> ");

    var checkUserIn = checkInput(userIn, [1, 2]);

    if (checkUserIn && userIn == '2') {
        console.log("Exiting the game...");
        process.exit(0);
    };

} while(!checkUserIn);

var atkhero = getRandomInt();
var atkdemon = getRandomInt();

do {
    var atkhero = getRandomInt();
    var atkdemon = getRandomInt();

    console.log("Hero ATK: " + atkhero + " | Demon King ATK: " + atkdemon);

    if (atkhero > atkdemon) {
        demonKing.hp -= 1;
        console.log("You attacked the Demon King! The Demon King has " + demonKing.getHp() + " HP left.");
    } else if (atkhero < atkdemon) {
        hero.hp -= 1;
        console.log("The Demon King attacked you! You have " + hero.getHp() + " HP left.");
    } else {
        console.log("You and the Demon King attacked each other at the same time! No damage was dealt.");
    }

    if (hero.getHp() == 0 || demonKing.getHp() == 0) {
        continueGame = false;
    }

} while (continueGame);