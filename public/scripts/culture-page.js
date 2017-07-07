(function(){
/* ... START OF SCOPE ... */

// STICKY NAV STUFF!

// First, let's grab a couple elements we need to work with
var navigation = document.querySelector('nav');
var navPlaceholder = document.querySelector('.culture-navigation-placeholder');
var navPlaceholderHeight = navigation.offsetHeight +
    parseInt(window.getComputedStyle(navigation).getPropertyValue('margin-top')) +
    parseInt(window.getComputedStyle(navigation).getPropertyValue('margin-bottom'));
var stickpoint = parseInt(window.getComputedStyle(navigation).getPropertyValue('margin-top'));

// Second, let's define a scroll function that handles the sticky nav
// We will define a point which recalculates on scroll for when to stick
var scroll = function(){
  if(window.scrollY >= stickpoint){
    navigation.classList.add('sticky');
    navPlaceholder.style.height = navPlaceholderHeight+'px';
  }else{
    navigation.classList.remove('sticky');
    navPlaceholder.style.height = '0px';
  }
};

// Lastly, we will use a highly optimized RAM method to run our scroll function
var raf = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame;

var lastScrollY = window.pageYOffset;

if (raf) loop();

function loop() {
  var scrollY = window.pageYOffset;
  if (lastScrollY === scrollY) {
    raf(loop);
    return;
  } else {
    lastScrollY = scrollY;
    scroll(); //call the scroll function on scroll
    raf(loop);
  }
}
scroll(); //call the scroll function on load (assists page refresh after scroll)

/* ... END OF SCOPE ... */
}())
