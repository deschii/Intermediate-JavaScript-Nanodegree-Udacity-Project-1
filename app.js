// Create Dino Constructor
function Dinosaur(species, weight, height, diet, where, when, fact, image) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.image = image;
}

const dinoData = [
    {
        'species': 'Triceratops',
        'weight': 13000,
        'height': 114,
        'diet': 'herbavor',
        'where': 'North America',
        'when': 'Late Cretaceous',
        'fact': 'First discovered in 1889 by Othniel Charles Marsh',
        'image': './images/triceratops.png'
    },
    {
        'species': 'Tyrannosaurus Rex',
        'weight': 11905,
        'height': 144,
        'diet': 'carnivor',
        'where': 'North America',
        'when': 'Late Cretaceous',
        'fact': 'The largest known skull measures in at 5 feet long.',
        'image': './images/tyrannosaurus rex.png'
    },
    {
        'species': 'Anklyosaurus',
        'weight': 10500,
        'height': 55,
        'diet': 'herbavor',
        'where': 'North America',
        'when': 'Late Cretaceous',
        'fact': 'Anklyosaurus survived for approximately 135 million years.',
        'image': './images/anklyosaurus.png'
    },
    {
        'species': 'Brachiosaurus',
        'weight': 70000,
        'height': 372,
        'diet': 'herbavor',
        'where': 'North America',
        'when': 'Late Jurasic',
        'fact': 'An asteroid was named 9954 Brachiosaurus in 1991.',
        'image': './images/brachiosaurus.png'
    },
    {
        'species': 'Stegosaurus',
        'weight': 11600,
        'height': 79,
        'diet': 'herbavor',
        'where': 'North America, Europe, Asia',
        'when': 'Late Jurasic to Early Cretaceous',
        'fact': 'The Stegosaurus had between 17 and 22 seperate places and flat spines.',
        'image': './images/stegosaurus.png'
    },
    {
        'species': 'Elasmosaurus',
        'weight': 16000,
        'height': 59,
        'diet': 'carnivor',
        'where': 'North America',
        'when': 'Late Cretaceous',
        'fact': 'Elasmosaurus was a marine reptile first discovered in Kansas.',
        'image': './images/elasmosaurus.png'
    },
    {
        'species': 'Pteranodon',
        'weight': 44,
        'height': 20,
        'diet': 'carnivor',
        'where': 'North America',
        'when': 'Late Cretaceous',
        'fact': 'Actually a flying reptile, the Pteranodon is not a dinosaur.',
        'image': './images/pteranodon.png'
    },
    {
        'species': 'Pigeon',
        'weight': 0.5,
        'height': 9,
        'diet': 'herbavor',
        'where': 'World Wide',
        'when': 'Holocene',
        'fact': 'All birds are living dinosaurs.',
        'image': './images/pigeon.png'
    }
];

// Create Human Object
// Use IIFE to get human data from form
function humanData() {
  const human = (function() {
    let name = document.getElementById('name').value;
    let feet = parseFloat(document.getElementById('feet').value);
    let inches = parseFloat(document.getElementById('inches').value);
    let height = feet * 12 + inches;
    let weight = parseFloat(document.getElementById('weight').value);
    let diet = document.getElementById('diet').value;
    let image = 'images/human.png';

    function getName() {
      return name;
    }

    function getHeight() {
      return height;
    }

    function getWeight() {
      return weight;
    }

    function getDiet() {
      return diet;
    }

    function getImage() {
      return image;
    }

    return {
      name: getName(),
      height: getHeight(),
      weight: getWeight(),
      diet: getDiet(),
      image: getImage(),
    }
  })();
  return human;
}

const human = humanData();



// Create Dino Objects
const dinos = [];
for(let i=0; i<dinoData.length; i++){
  dinos.push(new Dinosaur(dinoData[i].species, dinoData[i].weight, dinoData[i].height, dinoData[i].diet, dinoData[i].where, dinoData[i].when, [dinoData[i].fact, 'fact2', 'fact3', 'fact4'], dinoData[i].image));
}

dinos.splice(4, 0, human);

//Needed to compare diet
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dinosaur.prototype.compareHeight = function(humanHeight) {
  let heightDifference = Math.floor(this.height / humanHeight);
  if(this.height < humanHeight){
    this.fact[1] = 'You were taller than this dinosaur!';
  } else {
      this.fact[1] = `This dinosaur was ${heightDifference} times taller than you.`;
  }
};

Dinosaur.prototype.compareDiet = function(humanDiet) {
  if (capitalizeFirstLetter(this.diet) === humanDiet) {
    this.fact[2] = `Just like you this dinosaur was a ${this.diet}!`;
  } else {
    this.fact[2] = `This dinosaur was a ${this.diet}`;
  }
};

Dinosaur.prototype.compareWeight = function(humanWeight) {
  let weightDifference = Math.floor(this.weight / humanWeight);
  if(this.weight < humanWeight){
    this.fact[3] = 'You were heavier than this dinosaur!';
  } else {
      this.fact[3] = `This dinosaur was ${weightDifference} times heavier than you.`;
  }
};

//remove Formular
function removeForm() {
  const form = document.getElementById('dino-compare');
  form.innerHTML = '';
}

// Add tiles to DOM
function addTilesToDOM(humanName) {
    const grid = document.getElementById('grid');
    dinos.map(dino => {
        const tile = document.createElement('div');
        tile.className = 'grid-item';

        const title = document.createElement('h3');
        title.className = 'h3';
        if (dino.species) {
            title.innerHTML = dino.species;
        } else {
            title.innerHTML = humanName;
        }

        const fact = document.createElement('p');
        fact.className = 'p';
        const factsArray = dino.fact;
        let randomFact = '';

        if (factsArray) {
            randomFact = factsArray[Math.floor(Math.random() * factsArray.length)];
        }

        if (dino.species === 'Pigeon') {
            fact.innerHTML = dino.fact[0];
        } else {
            fact.innerHTML = randomFact;
        }

        const image = document.createElement('img');
        image.className = 'img';
        image.src = dino.image;

        tile.appendChild(image);
        tile.appendChild(fact);
        tile.appendChild(title);
        grid.appendChild(tile);
    });
}

// On button click, prepare and display infographic
const button = document.getElementById('btn');
button.addEventListener('click', function() {
    const human = humanData();
    dinos.map(dino => {
        if (dino.species) {
            dino.compareHeight(human.height);
            dino.compareWeight(human.weight);
            dino.compareDiet(human.diet);
        }
    });
    addTilesToDOM(human.name);
    removeForm();
});
