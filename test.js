const fs = require('fs');

var saveHero = fs.readFileSync('./Data/saveData.json');

console.log(saveHero == '');