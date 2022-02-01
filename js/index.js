const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.right_button');
const previousButton = document.querySelector('.left_button');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = function(slide, index) {
    slide.style.left = slideWidth * index + "px";
}
slides.forEach(setSlidePosition);

const moveToSlide = (currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    targetSlide.classList.add('current_slide');
    currentSlide.classList.remove('current_slide');
}

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current_slide');
    const nextSlide = (currentSlide.nextElementSibling);
    const currentDot = dotsNav.querySelector(".current_indicator");
    const nextDot = (currentDot.nextElementSibling);
    const nextIndex = slides.findIndex(slide => slide == nextSlide);

    moveToSlide(currentSlide, nextSlide);
    updateDot(currentDot, nextDot);
    hideShowArrows(nextIndex);
})
previousButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current_slide');
    const previousSlide = (currentSlide.previousElementSibling);
    const currentDot = dotsNav.querySelector(".current_indicator");
    const previousDot = (currentDot.previousElementSibling);
    const previousIndex = slides.findIndex(slide => slide == previousSlide);

    moveToSlide(currentSlide, previousSlide);
    updateDot(currentDot, previousDot);
    hideShowArrows(previousIndex);
})

const updateDot = function(currentDot, targetDot) {
    currentDot.classList.remove('current_indicator');
    targetDot.classList.add('current_indicator');
}

const hideShowArrows = function(targetIndex) {
    if (targetIndex == 0) {
        previousButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex == slides.length - 1) {
        nextButton.classList.add('is-hidden');
        previousButton.classList.remove('is-hidden');
    } else {
        previousButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}


dotsNav.addEventListener('click', e => {
    //if the target is not button, null is returned
    const targetDot = e.target.closest("button");

    if (!targetDot) {
        return;
    }

    const currentSlide = track.querySelector(".current_slide");
    const currentDot = dotsNav.querySelector(".current_indicator");

    //It finds the index in dots array for which dot is equal to the target dot clicked
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(currentSlide, targetSlide);
    updateDot(currentDot, targetDot);

    hideShowArrows(targetIndex);

})