'use strict';
const log = console.log.bind(console);
const App = {};

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


App.game = document.querySelector('.game');
App.holes = [0, 0, 0].map(() => createHole());
App.moles = ['monster', 'newbie'].map((type) => createMole(type));

App.game.append(...App.holes);
App.activeHole = App.holes[1];
App.activeMole = App.moles[0];
App.activeHole.append(App.activeMole);

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
