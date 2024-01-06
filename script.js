window.addEventListener('load', () => {
    'use strict';

    const navLinks = document.querySelectorAll(".navpop");
    const articles = document.querySelectorAll("#page article");
    const closelinks = document.querySelectorAll('.close');
    const slider = document.querySelector('#slider');
    let doneResizing;
    let currentLeft = 0;

    // This runs the slider...
    const sliderContent = document.querySelector('.a');
    const sliderWidth = sliderContent.offsetWidth;
    const cloned = sliderContent.cloneNode(true);
    cloned.className = "b";
    slider.appendChild(cloned);
    let root = document.querySelector(':root');
    const endLeftPos = `-${sliderWidth}px`;    
    root.style.setProperty('--sliderwidth', endLeftPos);
    slider.className = "animate";


    window.addEventListener('resize', function () {
        clearTimeout(doneResizing);
        doneResizing = setTimeout(function () {
            location.reload();
        }, 500);
    });

    /* The event listener below handles pausing and restarting the slider.
    Originally, I used the animationPlayState property to pause the animation.
    This is a very simple solution, but it feels very abrupt. Instead, I swap
    classes, which include pause, resume and continue.
    
    Resuming the animation is tricky, because I want to start up with one animation
    and when that finishes, continue the normal slider function. This is what the
    animationend event listener is doing.*/

    document.addEventListener('click', function(event){
        // pauses the slider
        if( event.target.id == 'paws'){
            event.target.src = 'images/cat-running.svg';
            event.target.id = 'cat';
            //document.querySelector('.animate').style.animationPlayState = 'paused';
            currentLeft = slider.getBoundingClientRect().left;
            root.style.setProperty('--currentleft', currentLeft+'px');
            root.style.setProperty('--newleft', currentLeft-50+'px');
            slider.className = 'pause';
        }
        // resumes and continues the slider from where it's current position
        else if( event.target.id == 'cat'){
            event.target.src = 'images/paws.svg';
            event.target.id = 'paws';
            //document.querySelector('.animate').style.animationPlayState = 'running';
            currentLeft = slider.getBoundingClientRect().left;
            root.style.setProperty('--currentleft', currentLeft+'px');
            root.style.setProperty('--newleft', currentLeft-50+'px');
            slider.className = 'resume';
            
            slider.addEventListener('animationend', function(){
                currentLeft = slider.getBoundingClientRect().left;
                if((currentLeft*-1) > sliderWidth){
                    currentLeft = currentLeft+sliderWidth;
                }
                root.style.setProperty('--currentleft', currentLeft+'px');
                root.style.setProperty('--newend', currentLeft-sliderWidth+'px');
                slider.className = 'continue';
                // once : true is used to remove the event listener after it has run one time
            }, {once : true});
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



