const log = console.log.bind(console);

function createHole() {
  const hole = document.createElement('DIV');
  hole.classList.add('hole');
  // hole.style.overflow = 'initial';

  const mole = document.createElement('DIV');
  mole.classList.add('mole');
  hole.append(mole);
  hole.moleDiv = mole;

  return hole;
}

function up() {
  const mole = this;
  mole.div.classList.add('up');
  setTimeout(() => {
    mole.div.classList.remove('up');
  }, mole.transitionTime * 2000);
}


function linkTo(moleDiv) {
  moleDiv.style.transition = `transition all ${this.transitionTime}s`;
  this.div = moleDiv;
  this.linked = true;
  this.up();
}


function unlink() {
  this.div = null;
  this.linked = false;
}


function createMole({ type }) {
  let lives;
  let transitionTime;
  switch (type) {
    case 'newbie':
      lives = 1;
      transitionTime = 0.5;
      break;
    case 'regular':
      lives = 2;
      transitionTime = 0.4;
      break;
    case 'monster':
      lives = 3;
      transitionTime = 0.3;
      break;
    default:
      lives = null;
  }

  return {
    type,
    lives,
    transitionTime,
    linked: false,
    div: null,
    linkTo,
    unlink,
    up,
  };
}


const App = {};

App.game = document.querySelector('.game');
App.holes = [0, 0, 0].map(() => createHole());
App.moles = ['monster', 'newbie'].map((type) => createMole({ type }));

let timerButton = document.querySelector('.timer');
timerButton.addEventListener('click', () => {
  App.moles[0].linkTo(App.holes[1].moleDiv);
});

App.game.append(...App.holes);
log(App);
