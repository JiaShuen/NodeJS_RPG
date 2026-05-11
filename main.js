const character = require("./Classes/character");
const readline = require('readline-sync');

var hero = new character("Hero", 3, 0);
var demonKing = new character("Demon King", 3, 0);

function getRandomInt() {
  return Math.floor(Math.random() * 10);
}


// Start of program
console.log("<<<Welcome to Fantasy RPG!>>>\nPress (1) to start the game.\nPress (2) to exit.");
var userIn = readline.question(">>> ");

if (userIn == '2') {
    console.log("Exiting the game...");
    setTimeout(() => {
        process.exit(0);
    }, 1000);
};

var atkhero = getRandomInt();
var atkdemon = getRandomInt();

if (atkhero > atkdemon) {
    demonKing.hp -= 1;
    console.log("You attacked the Demon King! The Demon King has " + demonKing.getHp() + " HP left.");
} else if (atkhero < atkdemon) {
    hero.hp -= 1;
    console.log("The Demon King attacked you! You have " + hero.getHp() + " HP left.");
} else {
    console.log("You and the Demon King attacked each other at the same time! No damage was dealt.");
}
