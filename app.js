'use strict';
const lg = console.log.bind(console);
const buton = document.querySelector(".timer");
const stat = document.querySelector('.stats');
const molesLives = {};
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
      mole.dataset.transitionTime = 1;
      mole.style.transition = 'all ' + mole.dataset.transitionTime + 's';
      break;
    case 'regular':
      mole.dataset.lives = 2;
      mole.dataset.transitionTime = 0.75;
      mole.style.transition = 'all ' + mole.dataset.transitionTime + 's';
      break;
    case 'monster':
      mole.dataset.lives = 3;
      mole.dataset.transitionTime = 0.5;
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
  if (filteredArray[randomIndex] === undefined) {
    return excludedItem;
  } else {
    return filteredArray[randomIndex];
  }
}

function getRandom(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function initGame() {
  App.game = document.querySelector('.game');
  App.holes = [0, 0, 0, 0, 0, 0].map(() => createHole());
  App.moles = [
    'regular', 'regular','regular',
    'newbie', 'newbie','newbie','newbie',
    'monster', 'monster',
  ].map((type) => createMole(type));
  App.game.innerHTML = '';
  App.game.append(...App.holes);
}

function playMole() {
  App.activeHole = excludeAndGetRandom(App.holes, App.activeHole);
  App.activeMole = excludeAndGetRandom(
    App.moles.filter((mole) => mole.dataset.lives > 0),
    App.activeMole,
  );

  if (App.activeMole.dataset.lives === 0) {
    App.finished = true;
    return;
  }

  App.activeHole.append(App.activeMole);
  setTimeout(() => App.activeMole.up(), 0);

  App.activeMole.addEventListener('click', function clickEvent() {
    App.activeMole.dataset.lives -= 1;
    App.activeMole.removeEventListener('click', clickEvent);
  });

  App.activeMole.addEventListener('transitionend', function transitionEvent() {
    App.activeMole.down();
    App.activeMole.removeEventListener('transitionend', transitionEvent);
    if (
      App.time > 0 &&
      App.moles.filter((m) => m.dataset.lives > 0).length > 0
    ) {
      playMole();
    } else {
      App.finished = true;
    }
  });
}

/******************** Counter lives *******************/
function createStats(){
  const stats = document.createElement('DIV');
  stats.classList.add('type-stat');
  return stats;
}

function createTypeName(name){
  const statName = document.createElement('P');
  statName.classList.add('type-name');
  statName.textContent = name+ " Moles:";
  return statName;
}

function createMoleWrapper(){
  const moleWrapper = document.createElement('DIV');
  moleWrapper.classList.add('mole-stat-wrapper');
  return moleWrapper;
}

function createMoleStat(){
  const moleStat = document.createElement('DIV');
  moleStat.classList.add('mole-stat');
  return moleStat;
}

function createLives(){
  const moleLive = document.createElement('DIV');
  moleLive.classList.add('lives');
  return moleLive;
}

function counterLives() {
  molesLives.easy = App.moles.filter((mole) => (
    mole.dataset.type === 'newbie'
  )).map((mole) => mole.dataset.lives);

  molesLives.mediun = App.moles.filter((mole) => (
    mole.dataset.type === 'regular'
  )).map((mole) => mole.dataset.lives);

  molesLives.hard = App.moles.filter((mole) => (
    mole.dataset.type === 'monster'
  )).map((mole) => mole.dataset.lives);
}

function renderStats() {
  stat.innerHTML = '';
  for (let level in molesLives) {
    if (molesLives[level].length > 0) {
      const newStat = createStats();
      const newStatName = createTypeName(level);
      const molesWeapper = [];
      molesLives[level].forEach((live)=>{
        const newWeapper = createMoleWrapper();
        const newMoleStat = createMoleStat();
        let lives = [];
        for(let i=0; i<Number(live); i++){
          lives.push(createLives());
        }
        newWeapper.append(newMoleStat,...lives);
        molesWeapper.push(newWeapper);
      })
      newStat.append(newStatName,...molesWeapper);
      stat.append(newStat);
    }
  }
}

function showResult() {
  const p = document.createElement('P');
  p.classList.add('endMessage');
  if (App.moles.filter((m) => m.dataset.lives > 0).length > 0) {
    p.textContent = 'You lost';
  } else {
    p.textContent = 'You won';
  }
  App.game.innerHTML = '';
  App.game.append(p);
}

function callRender() {
  const intervalId = setInterval(() => {
    App.time -= 0.25;
    buton.textContent = Math.floor(App.time);
    counterLives();
    renderStats();
    if (App.time === 0 || App.finished) {
      clearInterval(intervalId);
      reset();
      buton.textContent = 'Start again!';
      showResult();
    }
  }, 250);
}

function run() {
  initGame();
  playMole();
  callRender();
}

function reset() {
  App.time = 25;
  App.finished = false;
  buton.addEventListener('click', function buttonClick() {
    run();
    buton.removeEventListener('click', buttonClick);
  });
}

reset();
