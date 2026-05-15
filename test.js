
const AtkItem = require('./Classes/atkItem.js');
const DefItem = require('./Classes/defItem.js');

var test1 =  new AtkItem(1, "Sword", "A sharp blade that can be used to attack enemies.", "Atk", 2);
var test2 =  new DefItem(2, "Shield", "A sturdy barrier that can be used to defend against attacks.", "Def", 3);

var arrTest = [test1, test2];

for (let i = 0; i < arrTest.length; i++) {
    console.log("name: " + arrTest[i].getName());
}