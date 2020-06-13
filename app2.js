

/******************** Counter lives *******************/ 

const stat = document.querySelector('.stats');

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
const molesLives = {
  easy:[],
  mediun:[],
  hard:[],
};
function counterLives(){
  App.moles.forEach((mole)=>{
    if(mole.dataset.type == "newbie") molesLives.easy.push(mole.dataset.lives);
    if(mole.dataset.type == "regular") molesLives.mediun.push(mole.dataset.lives);
    if(mole.dataset.type == "monster") molesLives.hard.push(mole.dataset.lives);
  });
}

function renderStats(){
  for (let level in molesLives) {
    if(molesLives[level].length>0){
      const newStat = createStats();
      const newStatName = createTypeName(level);
      const molesWeapper = [];
      molesLives[level].forEach((live)=>{
        const newWeapper = createMoleWrapper();
        const newMoleStat = createMoleStat();
        let lives =[];
        for(let i=0;i<Number(live);i++){
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

function run(){
  initGame();
  startTime();
  startGame();
  counterLives();
  renderStats();
}


