window.addEventListener('load', () => {
    'use strict';

    const navLinks = document.querySelectorAll(".navpop");
    const articles = document.querySelectorAll("#page article");
    const closelinks = document.querySelectorAll('.close');
    let doneResizing;

    // This runs the slider...
    const sliderContent = document.querySelector('.a');
    const sliderWidth = sliderContent.offsetWidth;
    const cloned = sliderContent.cloneNode(true);
    cloned.className = "b";
    document.querySelector('#slider').appendChild(cloned);
    let root = document.querySelector(':root');
    const endLeftPos = `-${sliderWidth}px`;    
    root.style.setProperty('--sliderwidth', endLeftPos);
    document.querySelector('#slider').classList.add("animate");


    window.addEventListener('resize', function () {
        clearTimeout(doneResizing);
        doneResizing = setTimeout(function () {
            location.reload();
        }, 500);
    });

    document.addEventListener('click', function(event){
        if( event.target.id == 'paws'){
            event.target.src = 'images/cat-running.svg';
            event.target.id = 'cat';
            document.querySelector('.animate').style.animationPlayState = 'paused';
        }
        else if( event.target.id == 'cat'){
            event.target.src = 'images/paws.svg';
            event.target.id = 'paws';
            document.querySelector('.animate').style.animationPlayState = 'running';
        }
    });

    //console.log(navLinks);

    navLinks.forEach(eachLink => {
        eachLink.addEventListener('click', event => {
            event.preventDefault();
            const thisLink = event.target.getAttribute('href');
            articles.forEach(article => {
                article.className = "hidden";
            });
            document.querySelector(thisLink).className = "showing";
        });
    });

    closelinks.forEach(eachLink => {
        eachLink.addEventListener('click', event => {
            event.preventDefault();
            articles.forEach(article => {
                article.className = "hidden";
            });
        });
    });

});

// old image slider script. also took out line 132 (transition: all 60s linear;) in css

/*  var sliderContent;
    var sliderWidth;
    var fullSlider = document.querySelector('#work');
    var clonedSlider = fullSlider.innerHTML;
    var doneResizing;

    function animateSlider() {
        sliderContent = document.querySelector('.a');
        sliderWidth = sliderContent.offsetWidth;
        var cloned = sliderContent.cloneNode(true);
        cloned.className = "b";
        document.querySelector('#slider').appendChild(cloned);
        document.querySelector('#slider').style.left = `-${sliderWidth}px`;
        repeatAnimation();
    }

    animateSlider();
    function repeatAnimation() {
        fullSlider.addEventListener("transitionend", function () {
            console.log('going around again!');
            document.getElementById('work').innerHTML = clonedSlider;
            fullSlider = document.querySelector('#slider');
            animateSlider();
        });
    }

    window.addEventListener('resize', function () {
        clearTimeout(doneResizing);
        doneResizing = setTimeout(function () {

            animateSlider();

        }, 500);
    }); */



