const Hero = require("./Classes/hero");
const Demon = require("./Classes/demon");
const AtkItem = require("./Classes/atkItem");
const DefItem = require("./Classes/defItem");
const readline = require('readline-sync');
const fs = require('fs');

//initialize characters and game variables
var hero;
var demonKing = new Demon("Demon King", 3, 0);
var itemsArr = JSON.parse(fs.readFileSync('./Data/items.json')).items;
var continueGame = true;
var saveHero = fs.readFileSync('./Data/saveData.json');
if (saveHero == '') {
    hero = new Hero("Hero", 3, 0);
} else {
    var saveData = JSON.parse(saveHero);
    console.log(saveData);
    hero = new Hero(saveData.name, saveData.hp, saveData.atk, saveData.items);
}

function getRandomInt(minVal, maxVal) {
  return Math.floor(Math.random() * (Math.floor(maxVal) - Math.ceil(minVal) + 1)) + Math.ceil(minVal);
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

    var atkhero = getRandomInt(1, 10);
    var atkdemon = getRandomInt(1, 6);

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
                var randomItem = itemsArr[Math.floor(Math.random() * (itemsArr.length))];

                if (randomItem.type == 'Atk') {
                    hero.items.push(new AtkItem(randomItem.id, randomItem.name, randomItem.description, randomItem.type, randomItem.attack));
                } else if (randomItem.type == 'Def') {
                    hero.items.push(new DefItem(randomItem.id, randomItem.name, randomItem.description, randomItem.type, randomItem.defense));
                }

                var jsonData = JSON.stringify(hero, null, 2);
                fs.writeFileSync('./Data/saveData.json', jsonData);
            }
        }
    }
}


// Main page
do {
    console.log("<<<Welcome to Fantasy RPG!>>>\n(1) to start the game.\n(2) to exit.");
    var userIn = readline.question(">>> ");
    var checkUserIn = checkInput(userIn, [1, 2]); // Validate user input. returns true/false.

    if (checkUserIn) {
        if (userIn == '2') {
            console.log("Exiting the game...");
            process.exit(0);
        } else {
            // Options page
            do {
                console.log('What would you like to do?\n(1) View character stats\n(2) Start battle\n(3) Back to main menu');
                var userIn2 = readline.question(">>> ");
                var checkUserIn2 = checkInput(userIn2, [1, 2, 3]); // Validate user input. returns true/false.

                if (checkUserIn2) {
                    switch(userIn2) {
                        case '1':
                            let tempItemsDisplay= '';
                            // Cannot use methods like getName() as array objects were not instantiated when loaded from JSON file. They are plain objects.
                            for (let i = 0; i < hero.getItems().length; i++) {
                                tempItemsDisplay += '\n(' + (i + 1) + ')\nName: ' + hero.getItems()[i].name + '\nType: ' + hero.getItems()[i].type + '\nDescription: ' + hero.getItems()[i].desc + '\n';

                                if (hero.getItems()[i].type == 'Atk') {
                                    tempItemsDisplay += 'Attack: ' + hero.getItems()[i].damage + '\n';
                                } else {
                                    tempItemsDisplay += 'Defense: ' + hero.getItems()[i].defense + '\n';
                                }
                            }

                            
                                console.log('Hero:\nName: ' + hero.name + '\nHP: ' + hero.getHp() + '\nAttack: ' + hero.getAttack() + '\nItems: ' + tempItemsDisplay + '\nPress (1) Back to options');
                            do {   
                                var userIn3 = readline.question(">>> ");
                                var checkUserIn3 = checkInput(userIn3, [1]); // Validate user input. returns true/false.
                                if (checkUserIn3) {
                                    checkUserIn2 = false;
                                }
                            } while(!checkUserIn3);
                            break;
                        case '2':
                            do {
                                playgame();
                            } while (continueGame);
                            break;
                        default: // handling case '3'
                            checkUserIn = false;
                    }
                }
            } while(!checkUserIn2);
        }
    };
} while(!checkUserIn);


