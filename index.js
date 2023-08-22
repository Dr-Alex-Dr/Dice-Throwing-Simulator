const sizeCube = 50; // Размеры кубов px
const mobileSizeCube = 30; // Размер кубов на мобильных устройствах
const speedRotate = 2; // Скорость вращения
const countRotate = 32; // Количесво оборотов при перемешивании
const timeRotate = 3; // Время (секунды) вращения при перемешивании
const timeWaitMove = 2; // Время (секунды) ожидания перемещения после результата выпадения 

// [значения сторон кубиков, вероятность выпадения(чем больше, тем чаще), ссылка]
const variants = {
    1: ['1 1 1', 1, 'https://google.com'],
    2: ['2 1 2', 1, 'https://google.com'],
    3: ['1 1 3', 1, 'https://google.com'],
    4: ['1 5 4', 1, 'https://google.com'],
    5: ['1 1 5', 1, 'https://google.com'],
    6: ['1 1 6', 1, 'https://google.com'],
    7: ['2 1 1', 1, 'https://google.com'],
    8: ['1 3 1', 4, 'https://google.com']
}




let sides = document.querySelectorAll('.side');
let containers = document.querySelectorAll('.cube');

let backs = document.querySelectorAll('.back');
let fronts = document.querySelectorAll('.front');

let cubes = document.querySelectorAll('.cube');

let container = document.querySelector('.contaienr');

let cubeContainer = document.querySelectorAll('.cube-container')[2];
let text = document.querySelector('.cube-block__text');

let sideImgs = document.querySelectorAll('.side-img');

function changeSizeCube(sizeCube) {
    container.style.width = sizeCube * 4.2 + 'px';
    cubeContainer.style.marginTop = sizeCube - 8 + 'px';
    text.style.maxWidth = sizeCube * 4.2 + 'px';

    sides.forEach((side) => {
        side.style.width = sizeCube + 'px';
        side.style.height = sizeCube + 'px';
    })
    containers.forEach((container) => {
        container.style.width = sizeCube + 'px';
        container.style.height = sizeCube + 'px';
    })
    backs.forEach((back) => {
        back.style.transform = `translateZ(${-sizeCube / 2}px) scale(1, -1)`
    })
    fronts.forEach((front) => {
        front.style.transform = `translateZ(${sizeCube / 2}px)`
    })
    sideImgs.forEach((item) => {
        item.style.width = sizeCube + 'px';
        item.style.height = sizeCube + 'px';
    })
}
changeSizeCube(sizeCube)

let animationId;
let angle = 0;
const maxAngle = 360;

// бесконесное вращение элемента
function animateRotation() {
    cubes[0].style.transform = `rotatex(${angle}deg) rotateY(${angle}deg) rotateZ(${angle}deg)`;
    cubes[1].style.transform = `rotatex(${-angle}deg) rotateY(${-angle}deg) rotateZ(${-angle}deg)`;
    cubes[2].style.transform = `rotatex(${angle + 90}deg) rotateY(${angle + 90}deg) rotateZ(${angle + 90}deg)`;
    
    angle = (angle + speedRotate) % maxAngle;
    animationId = requestAnimationFrame(animateRotation);
  }
  
  function stopAnimation() {
    cancelAnimationFrame(animationId);
  }

function rotateCube(position, cube) {
    cube.style.transition = `all ${timeRotate}s ease-in-out`
    if (position == 1) {
        cube.style.transform = `rotateX(900deg) rotateY(-${countRotate * 90}deg) rotateZ(0deg)`;
        normalizeRotaion(180, 0, 0, cube);
    }
    if (position == 2) {
        cube.style.transform = `rotateX(720deg) rotateY(-${countRotate * 90 + 90}deg) rotateZ(180deg)`;

        normalizeRotaion(0, -90, 180, cube);
    }
    if (position == 3) {
        cube.style.transform = `rotateX(810deg) rotateY(-${countRotate * 90 - 270}deg) rotateZ(90deg)`;

        normalizeRotaion(90, 270, 90, cube);
    }
    if (position == 4) {
        cube.style.transform = `rotateX(990deg) rotateY(-${countRotate * 90}deg) rotateZ(0deg)`;

        normalizeRotaion(270, 0, 0, cube);
    }
    if (position == 5) {
        cube.style.transform = `rotateX(810deg) rotateY(-${countRotate * 90}deg) rotateZ(0deg)`;

        normalizeRotaion(90, 0, 0, cube);
    }
    if (position == 6) {
        cube.style.transform = `rotateX(720deg) rotateY(-${countRotate * 90}deg) rotateZ(0deg)`;

        normalizeRotaion(0, 0, 0, cube);
    }
}

function normalizeRotaion(x, y, z, cube) {
    setTimeout(() => {
        cube.style.transition = 'all 0s ease-in-out'
        cube.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
    }, timeRotate * 1000)
}

function waitMove(url) {
    setTimeout(() => {
        window.location.href = url;
    }, (timeWaitMove + timeRotate) * 1000)
}


// Функция для выбора случайного числа с учетом весов
function weightedRandomNumber() {
    const totalWeight = Object.values(variants).reduce((sum, weight) => sum + weight[1], 0);
    let randomWeight = Math.random() * totalWeight;
  
    for (const number in variants) {     
        randomWeight -= variants[number][1];  
        if (randomWeight <= 0) {
            return variants[number];
        }
    }
}

function handleRotate() {
 
    // Когда началось вращение убираем обработчик клика
    container.removeEventListener('click', handleRotate);

    setTimeout(() => {
        container.addEventListener('click', handleRotate);
    }, (timeWaitMove + timeRotate) * 1000)

    stopAnimation()
    let choiceArray = weightedRandomNumber();
    let numbers = choiceArray[0].split(' ');

    console.log(numbers[0], numbers[1], numbers[2]);

    rotateCube(numbers[0], cubes[0])
    rotateCube(numbers[1], cubes[1])
    rotateCube(numbers[2], cubes[2])
    waitMove(choiceArray[2])
}

container.addEventListener('click', handleRotate);

animateRotation()


function checkScreenSize() {
    if (window.innerWidth < 992) {
        changeSizeCube(mobileSizeCube)
    } else {
        changeSizeCube(sizeCube)
    }
}

// Вызываем функцию при загрузке страницы
checkScreenSize();

// Добавляем обработчик события resize
window.addEventListener("resize", checkScreenSize);
