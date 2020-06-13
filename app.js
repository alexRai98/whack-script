'use strict';
const lg = console.log.bind(console);
const buton = document.querySelector(".timer");
const App = {};
let time = 10;

function createHole() {
  const hole = document.createElement('DIV');
  hole.classList.add('hole');
  return hole;
}

function up() {
  this.classList.add('up');
}

function down() {
  this.classList.remove('up');
}

function createMole(type) {
  const mole = document.createElement('DIV');
  mole.classList.add('mole');
  mole.dataset.type = type;
  switch (type) {
    case 'newbie':
      mole.dataset.lives = 1;
      mole.dataset.transitionTime = 3;
      mole.style.transition = 'all ' + mole.dataset.transitionTime + 's';
      break;
    case 'regular':
      mole.dataset.lives = 2;
      mole.dataset.transitionTime = 2;
      mole.style.transition = 'all ' + mole.dataset.transitionTime + 's';
      break;
    case 'monster':
      mole.dataset.lives = 3;
      mole.dataset.transitionTime = 1;
      mole.style.transition = 'all ' + mole.dataset.transitionTime + 's';
      break;
    default:
      lives = null;
  }
  mole.up = up.bind(mole);
  mole.down = down.bind(mole);
  return mole;
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function excludeAndGetRandom(array, excludedItem) {
  const filteredArray = array.filter((item) => item !== excludedItem);
  const randomIndex = Math.floor(Math.random() * filteredArray.length);
  return filteredArray[randomIndex];
}

function getRandom(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function initGame() {
  App.game = document.querySelector('.game');
  App.holes = [0, 0, 0].map(() => createHole());
  App.moles = ['regular', 'monster'].map((type) => createMole(type));
  App.game.append(...App.holes);
}

function startTime() {
  const idInterval = setInterval(() => {
    time--;
    buton.textContent = time;
    if (time == 0) clearInterval(idInterval);
  }, 1000);
}

function playMole() {
  App.activeHole = excludeAndGetRandom(App.holes, App.activeHole);
  App.activeMole = getRandom(App.moles.filter((mole) => mole.dataset.lives > 0));
  if (App.activeMole === undefined) return;
  App.activeHole.append(App.activeMole);

  setTimeout(() => App.activeMole.up(), 0);

  App.activeMole.addEventListener('click', function clickEvent() {
    App.activeMole.dataset.lives -= 1;
    lg(App.activeMole.dataset.lives);
    App.activeMole.down();
    App.activeMole.removeEventListener('click', clickEvent);
    if (time > 0) playMole();
  });

  // App.activeMole.addEventListener('transitionend', function transitionEvent() {
  //   lg(App.activeMole);
  //   App.activeMole.down();
  //   App.activeMole.removeEventListener('transitionend', transitionEvent);
  //   if (time > 0) playMole();
  // });
}


/*
function linkMoleToHole() {
  App.activeHole = App.holes[getRandom(0, App.holes.length)];
  App.activeMole = App.moles[getRandom(0, App.moles.length)];

  App.activeHole.append(App.activeMole);
  setTimeout(() => App.activeMole.up(), 0);

  App.activeMole.addEventListener('click', function clickEvent() {
    App.activeMole.removeEventListener('click', clickEvent);
    App.activeMole.down();

    setTimeout(() => {
      App.activeHole.removeChild(App.activeMole);
      linkMoleToHole();
    }, App.activeMole.dataset.transitionTime * 1000);
  });

  // setTimeout(() => {
  //   App.activeMole.down();
  // }, App.activeMole.dataset.transitionTime * 1000);
}
*/

// function startGame(){
//   for(let i=0; i<5; i++){
//     linkMoleToHole();
//     showMole();
//     setTimeout(hidedMole,500);
//   }
// }

function run(){
  initGame(); // render the holes y create the moles
  startTime(); // inicializamos contador
  playMole();
  // startGame();
}

// En la console mostrar el topo activo
//App.activeMole
// Subimos al topo
//App.activeMole.up()
// Bajamos al topo
//App.activeMole.down()

// Ciclo Topo
// selectMole();
// insertInHole();
// mole.up();
// mole.down();
// selectMole();
