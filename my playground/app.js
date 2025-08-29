function r (condition) {
    if(condition == true){
        document.querySelector('.custom-logo img').src='./img/logo_minimal_colored.png'
        document.querySelector('.custom-logo img').style.width='30px'
    }
    else{
        document.querySelector('.custom-logo img').src='./img/Logo - Full Horizontal Colored.png'
        document.querySelector('.custom-logo img').style.width='300px'
    }
}

r(window.matchMedia('(max-width: 600px)'))

window.addEventListener('resize',(e) => {
    r(window.innerWidth <= 600)
})