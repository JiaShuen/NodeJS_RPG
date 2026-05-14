const Hero = require("./Classes/hero");
const Demon = require("./Classes/demon");
const AtkItem = require("./Classes/atkItem");
const DefItem = require("./Classes/defItem");
const readline = require('readline-sync');
const fs = require('fs');

//initialize characters and game variables
var hero = new Hero("Hero", 3, 0);
var demonKing = new Demon("Demon King", 3, 0);
var continueGame = true;
var itemsArr = JSON.parse(fs.readFileSync('./Data/items.json')).items;

function getRandomInt(maxVal) {
  return Math.floor(Math.random() * maxVal);
}

function checkInput(input, posVal) {
    var pass = true;

    if (!Number.isInteger(parseInt(input))) {
        console.log("Invalid input! Please enter a valid option.");
        pass = false;
        return pass;
    } else {
        for(let i = 0; i < posVal.length; i++) {
            if (input == posVal[i]) {
                return pass;
            }
        }
        console.log("Invalid input! Please enter a valid option.");
        pass = false;
        return pass;
    }
}

function playgame() {
    var atkhero = getRandomInt(10);
    var atkdemon = getRandomInt(6);

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
        if (hero.getHp() == 0) {
            console.log("You have been defeated by the Demon King! Game Over.");
        } else {
            console.log("Congratulations! You have defeated the Demon King! You have earned an item!");
            if (hero.getItems().length < 5) {
                // Add an item to the hero's inventory
                var randomItem = itemsArr[Math.floor(Math.random() * (itemsArr.length - 1))];

                console.log(randomItem);

                if (randomItem.type == 'Atk') {
                    hero.items.push(new AtkItem(randomItem.id, randomItem.name, randomItem.description, randomItem.type, randomItem.attack));
                } else if (randomItem.type == 'Def') {
                    hero.items.push(new DefItem(randomItem.id, randomItem.name, randomItem.description, randomItem.type, randomItem.defense));
                }

                console.log(hero.getItems());
            }
        }
    }
}


// Main page
do {
    
    console.log("<<<Welcome to Fantasy RPG!>>>\n(1) to start the game.\n(2) to exit.");
    var userIn = readline.question(">>> ");
    var checkUserIn = checkInput(userIn, [1, 2]);

    if (checkUserIn) {
        if (userIn == '2') {
            console.log("Exiting the game...");
            process.exit(0);
        } else {
            // Options page
            do {
                console.log('What would you like to do?\n(1) View character stats\n(2) Start battle\n(3) Back to main menu');
                var userIn2 = readline.question(">>> ");
                var checkUserIn2 = checkInput(userIn2, [1, 2, 3]);

                if (checkUserIn2) {
                    if (userIn2 == '3') {
                        checkUserIn = false;
                        break;
                    }
                }
            } while(!checkUserIn2);
        }
    };

} while(!checkUserIn);


do {
    playgame();
} while (continueGame);