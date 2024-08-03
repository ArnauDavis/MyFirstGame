let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "Green Gremlin",
    level: 2,
    health: 15
  },
  {
    name: "Celestial Dragon",
    level: 8,
    health: 60
  },
  {
    name: "Shadow Emperor",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight Shadow Emperor"],
    "button functions": [goStore, goCave, fightShadowEmperor],
    text: "Welcome back to the town square. Where to next?",
    image: "rpg images/town sqaure.jpg",
    background: "linear-gradient(to bottom, #654321, #D2B48C)"
    
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Welcome to the Hero's Haven, \“Equip Yourself for Glory!\” ",
    image: "rpg images/tavern.jpg",
    background: "linear-gradient(135deg, #6d6e6f, #9a9b9d, #c5c6c7)"
  },
  {
    name: "cave",
    "button text": ["Fight Green Gremlin", "Fight Celestial Dragon", "Go to town square"],
    "button functions": [fightGreenGremlin, fightCelestialDragon, goTown],
    text: "You enter a shadowy cave, who will feel your wrath?",
    image: "rpg images/cave.jpg",
    background: "linear-gradient(to right, #8DB051, #1B4D3E)"
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are engaged in combat, emerge victorious hero!",
    image: "rpg images/fight.jpg"
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'Your enemy lays defeated before you. You gain experience points and find gold.',
    image: "rpg images/cave win.jpg",
    background: "linear-gradient(135deg, #FF6F61, #D4A5A5)"
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You have been defeated. Come back with a vengance. &#x2620;",
    image: "rpg images/defeat.jpg",
    background: "linear-gradient(90deg, #000000, #434343)"

  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeated the Shadow Emperor and set the town free! YOU WIN THE GAME! &#x1F389;",
    image: "rpg images/free town.jpg",
    background: "linear-gradient(135deg, #4b773f, #8c9c5b)"
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
    image: "rpg images/easter egg.jpg",
    background: "linear-gradient(135deg, #B0C5C1, #7F8C8D)"
  },
  {
    name: "fightGreenGremlin",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a goblin, enjoy the free xp",
    image: "rpg images/goblin.jpg",
    background: "linear-gradient(135deg, #3a3a3a, #7b7b7b)"
  },
  {
    name: "fightCelestialDragon",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "Defeat the Celestial Dragon, send it back to Mary Geoise!",
    image: "rpg images/fight.jpg",
    background: "linear-gradient(135deg, #ff4500, #ff6347, #ff9966)"
  },
  {
    name: "fightShadowEmperor",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You have engaged in combat with the Shadow Emperor, emerge victorious hero!",
    image: "rpg images/boss fight.jpg",
    background: "linear-gradient(135deg, #4b2e6d, #6a0d6b, #b94d8b)",
  }

];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightShadowEmperor;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  const locationImage = document.querySelector("#image");
  locationImage.src = location.image;
  locationImage.alt = location.name;
  document.body.style.background = location.background; 
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundAttachment = "fixed"
   
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightGreenGremlin() {
  fighting = 0;
  goFight();
}

function fightCelestialDragon() {
  fighting = 1;
  goFight();
}

function fightShadowEmperor() {
  fighting = 2;
  goFight();
}

function goFight() {
const fightLocationName = `fight${monsters[fighting].name.replace(/\s+/g, '')}`;
const locationObj = locations.find(loc => loc.name === fightLocationName);
update(locationObj);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  // Too difficult, don't want weapons breaking
  /*if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
    */
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "What a move, you dodged the attack from " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Correct! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Tough luck hero! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}