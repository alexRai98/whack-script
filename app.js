'use strict';
const log = console.log.bind(console);
const App = {};
let time = 21;

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
      mole.dataset.transitionTime = 0.6;
      break;
    case 'regular':
      mole.dataset.lives = 2;
      mole.dataset.transitionTime = 0.4;
      break;
    case 'monster':
      mole.dataset.lives = 3;
      mole.dataset.transitionTime = 0.2;
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

function initGame(){
  App.game = document.querySelector('.game');
  App.holes = [0, 0, 0].map(() => createHole());
  App.moles = ['monster', 'newbie'].map((type) => createMole(type));
  App.game.append(...App.holes);
}
function showMole(){
  App.activeMole.classList.add('up');
}
function hidedMole(){
  App.activeMole.classList.remove('up');
}
function linkMoleToHole(){  
  App.activeHole = App.holes[getRandom(0,App.holes.length)];
  App.activeMole = App.moles[0];
  App.activeHole.append(App.activeMole);
}
function startGame(){
  for(let i=0; i<5; i++){
    linkMoleToHole();
    showMole();
    setTimeout(hidedMole,500);
  }
}

/************** Start Time *******************/

function startTime(){
  const idInternal = setInterval(()=> {
    time --
    buton.textContent = time;
    if(time == 0) clearInterval(idInternal);
  },1000)
}

function run(){
  initGame();
  startTime();
  startGame();
}
const buton = document.querySelector(".timer");





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
