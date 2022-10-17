(function () {

  let FPS = 50;
  const TAMX = 300;
  const TAMY = 400;
  const PROB_ARVORE = 2;
  const PROB_ARVORE_FOGO = 0.01;
  const PROB_ROCHA = 0.5;
  const PROB_TOCO = 0.1;
  const PROB_ARVORE_GRANDE = 0.3;
  const PROB_CACHORRO = 0.05;
  const PROB_COGUMELO = 0.08;

  
  let vidas = 3;
  let montanha;
  let skier;
  let painel;

  const obstaculos = [];
  
  function init() {
    if(vidas >= 0){
      montanha = new Montanha();
      skier = new Skier();
      painel = new Painel();
      painel.numDeVidas(vidas);
      setInterval(run, 1000/FPS);
    }
    else {
      return
    }
  }

  function gameOver() {
    skier.gameOver();
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') skier.mudarDirecao(-1)
    else if (e.key === 'ArrowRight') skier.mudarDirecao(+1);
    else if(e.key === 'f') skier.acelerar();
  })

  class Montanha {
    constructor() {
      this.element = document.getElementById('montanha');
      this.element.style.width = `${TAMX}px`;
      this.element.style.height = `${TAMY}px`;
    }
  }

  class Painel {
    constructor(){
      this.element = document.getElementById('painel');
      this.element.style.width = `${TAMX/2}px`;
      this.element.style.height = `${TAMY/4}px`;
      this.element.style.backgroundColor = "lightgreen";
      this.contVel = document.createElement('input');
      this.contVel.disabled = 'true';
      this.contVel.style.width = '100px';
      this.contVel.style.backgroundColor = 'white';
      this.contVel.style.color = 'red';
      this.contVel.style.fontWeight = 'bold';
      this.contVel.style.textAlign = 'center';
      this.contVida = document.createElement('input');
      this.contVida.style.width = '100px';
      this.contVida.style.backgroundColor = 'white';
      this.contVida.style.color = 'red';
      this.contVida.style.fontWeight = 'bold';
      this.contVida.style.textAlign = 'center';
      this.contVida.disabled = 'true';
      let label1 = document.createElement('label');
      label1.style.marginTop = '50px';
      label1.style.backgroundColor = 'lightgreen';
      label1.style.color = 'blue';
      label1.textContent = 'Metros Percorridos';
      let label2 = document.createElement('label');
      label2.style.marginTop = '50px';
      label2.style.backgroundColor = 'lightgreen';
      label2.style.color = 'blue';
      label2.innerHTML = '<br>Vidas Restantes';
      this.element.appendChild(label1);
      this.element.appendChild(this.contVel);
      this.element.appendChild(label2);
      this.element.appendChild(this.contVida);
    }

    metrosPercorridos(metrosPercorridos){
      this.contVel.value = metrosPercorridos; 
    }

    numDeVidas(numVidas){
      if(numVidas >= 0){
        this.contVida.value = numVidas; 
      }
      else {
        this.contVida.value = 'GAME OVER!'
      }
    }
  }

  class Skier {
    constructor() {
      this.element = document.getElementById('skier');
      this.direcoes = ['para-esquerda', 'para-frente', 'para-direita'];
      this.direcao = 1;
      this.element.className = this.direcoes[this.direcao];
      this.element.style.top = this.posTop = '20px';
      this.element.style.left = this.posLeft = parseInt(TAMX/2)-8 + 'px';
      this.metrosPercorridos = 0;
    }
    mudarDirecao(giro) {
      if (this.direcao + giro >= 0 && this.direcao + giro <= 2) {
        this.direcao += giro;
        this.element.className = this.direcoes[this.direcao];
      }
    }
    andar() {
      if (this.direcao === 0 && parseInt(this.element.style.left) > 0){
       this.element.style.left = this.posLeft = parseInt(this.element.style.left)-1 + 'px';
      }  
      else if (this.direcao === 2 && parseInt(this.element.style.left) < 285){
        this.element.style.left = this.posLeft = parseInt(this.element.style.left)+1 + 'px';
      } 
      this.metrosPercorridos += 1;
      painel.metrosPercorridos(this.metrosPercorridos);
    }
    acelerar() {
      if(FPS === 50) FPS = 33.3333;
      else FPS = 50;
    }
    cair(){
      this.element.className = 'caiu';
      vidas = vidas - 1;
      painel.numDeVidas(vidas);
    }
    gameOver(){
      this.element.className = 'gameOver';
    }
  }

  class Arvore {
    constructor() {
      this.element = document.createElement('div');
      this.element.className = 'arvore';
      montanha.element.appendChild(this.element);
      this.element.style.top = `${TAMY}px`;
      this.element.style.left = Math.floor(Math.random() * TAMX) + 'px';
    }
  }

  class ArvoreFogo {
    constructor() {
      this.element = document.createElement('div');
      this.element.className = 'arvoreFogo';
      montanha.element.appendChild(this.element);
      this.element.style.top = `${TAMY}px`;
      this.element.style.left = Math.floor(Math.random() * TAMX) + 'px';
    }
  }

  class ArvoreGrande {
    constructor() {
      this.element = document.createElement('div');
      this.element.className = 'arvoreGrande';
      montanha.element.appendChild(this.element);
      this.element.style.top = `${TAMY}px`;
      this.element.style.left = Math.floor(Math.random() * TAMX) + 'px';
    }
  }

  class Rocha {
    constructor() {
      this.element = document.createElement('div');
      this.element.className = 'rocha';
      montanha.element.appendChild(this.element);
      this.element.style.top = `${TAMY}px`;
      this.element.style.left = Math.floor(Math.random() * TAMX) + 'px';
    }
  }

  class Toco {
    constructor() {
      this.element = document.createElement('div');
      this.element.className = 'toco';
      montanha.element.appendChild(this.element);
      this.element.style.top = `${TAMY}px`;
      this.element.style.left = Math.floor(Math.random() * TAMX) + 'px';
    }
  }

  class Cachorro {
    constructor() {
      this.element = document.createElement('div');
      this.element.className = 'cachorro';
      montanha.element.appendChild(this.element);
      this.element.style.top = `${TAMY}px`;
      this.element.style.left = Math.floor(Math.random() * TAMX) + 'px';
    }
  }

  class Cogumelo {
    constructor() {
      this.element = document.createElement('div');
      this.element.className = 'cogumelo';
      montanha.element.appendChild(this.element);
      this.element.style.top = `${TAMY}px`;
      this.element.style.left = Math.floor(Math.random() * TAMX) + 'px';
    }
  }

  function run() {
    if(vidas >= 0){    
      const random = Math.random() * 100;
      if (random <= PROB_ARVORE) {
        const arvore = new Arvore();
        obstaculos.push(arvore);
      }
      if (random <= PROB_ARVORE_FOGO){
        const arvoreFogo = new ArvoreFogo();
        obstaculos.push(arvoreFogo);
      }
      if (random <= PROB_ROCHA){
        const rocha = new Rocha();
        obstaculos.push(rocha);
      }
      if(random <= PROB_TOCO){
        const toco = new Toco();
        obstaculos.push(toco);
      }
      if(random <= PROB_ARVORE_GRANDE){
        const arvoreGrande = new ArvoreGrande();
        obstaculos.push(arvoreGrande);
      }
      if(random <= PROB_CACHORRO){
        const cachorro = new Cachorro();
        obstaculos.push(cachorro);
      }
      if(random <= PROB_COGUMELO){
        const cogumelo = new Cogumelo();
        obstaculos.push(cogumelo);
      }
      obstaculos.forEach(a => {
        a.element.style.top = parseInt(a.element.style.top)-1 + 'px';
        if(vidas >= 0){
          let positionTop = parseInt(skier.posTop) - parseInt(a.element.style.top);
          let positionLeft = parseInt(skier.posLeft) - parseInt(a.element.style.left);
          if(positionTop === 0 && positionLeft <= 13 && positionLeft >= -10){
            if(a.element.className === 'cogumelo'){
              vidas = vidas + 1;
              painel.numDeVidas(vidas);
            }
            else {
              skier.cair();
            }
          }        
        }
        else if(vidas < 0) {
          painel.numDeVidas(-1);
          gameOver();
        }
      })
      skier.andar();
    }
    else {
      gameOver();
      return
    }

  }

  if(vidas >= 0){
    init();
  }
  else {
    gameOver();
  }

})()