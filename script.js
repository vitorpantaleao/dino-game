document.addEventListener('keyup', handlekeyUp)

const personagem = document.querySelector('.personagem')
const background = document.querySelector('.background')
let isJumping = false
let position = 0


function handlekeyUp(event) {
    if (event.keyCode === 32 || event.keyCode === 38) {
        if(!isJumping) {
            jump()
        }
    }
}

function jump() {
    isJumping = true
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval)

            // descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval)
                    isJumping = false
                } else {
                    position = position - 20
                    personagem.style.bottom = position + 'px'
                }
            })
        } else {
            // subindo
            position = position + 20
            personagem.style.bottom = position + 'px'
        }
    }, 20)
}

function createObstaculo() {
    const obstaculo = document.createElement('div')
    let obstaculoPosition = 2000
    let randomTime = Math.random() * 4000

    obstaculo.classList.add('obstaculo')
    background.appendChild(obstaculo)
    obstaculo.style.left = 2000 + 'px'

    let leftInterval = setInterval(() => {
        if(obstaculoPosition < -60) {
            clearInterval(leftInterval)
            background.removeChild(obstaculo)
        } else if (obstaculoPosition > 0 && obstaculoPosition < 60 && position < 60){
            // game over

            clearInterval(leftInterval)
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>'
        } else {
            obstaculoPosition -= 10 
            obstaculo.style.left = obstaculoPosition + 'px'
        }
    }, 20)

    setTimeout(createObstaculo, randomTime)
}

createObstaculo()