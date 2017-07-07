(function(){
/* ... START OF SCOPE ... */

/* Beer Navigator: Secondary Nav
 * When a user clicks on a beer in the, scroll to that beer.
 * When a user scrolls a beer into view, highlight that beet in the nav.
 */

// First, let's grab a couple elements we need to work with
var navigation = document.querySelector('nav');
var beerNavigator = document.querySelector('.beer-navigator');
var beerNavigatorPlaceholder = document.querySelector('.beer-navigator-placeholder');
var beerNavigationLinks = document.querySelectorAll('.beer-navigator ul li');
var beers = document.querySelectorAll('.beers-list__beer');

// Second, let's create a helper function for handling things that might be visible
var isInViewport = function(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
};

// We gotta keep track of visible beers outside of this scroll function
window.visibleBeers = [];
// Then, let's define a scroll function that handles all this fanciness
var scroll = function(){
  if(navigation && beerNavigator && beerNavigatorPlaceholder && beerNavigationLinks && beers){

    // We will define a point which recalculates on scroll for when to stick the nav
    var stickPoint = navigation.getBoundingClientRect().bottom +
      parseInt(window.getComputedStyle(navigation).getPropertyValue("margin-bottom"));

    // This placeholder keeps the page from jumping around
    var placeholderSize = beerNavigator.offsetHeight +
      parseInt(window.getComputedStyle(beerNavigator).getPropertyValue("margin-bottom")) + 'px';

    if(stickPoint < 0){
      beerNavigator.classList.add('sticky');
      beerNavigatorPlaceholder.style.height = placeholderSize;
    }else{
      beerNavigator.classList.remove('sticky');
      beerNavigatorPlaceholder.style.height = '0px';
    }
    // END OF STICKY NAV STUFF

    // START OF GLOW WHEN IN VIEW STUFF
    for(var i = 0; i < beers.length; i++){
      var beer = beers[i];
      var name = beer.querySelector('.beer-details--name').innerHTML;

      if(isInViewport(beer)){
        if(visibleBeers.indexOf(name) == -1) visibleBeers.push(name);
      }else{
        if(visibleBeers.indexOf(name) != -1) visibleBeers.splice(visibleBeers.indexOf(name), 1);
      }

      var beerInView = visibleBeers[visibleBeers.length - 1];

      for(var j = 0; j < beerNavigationLinks.length; j++){
        var link = beerNavigationLinks[j];
        var linkName = beerNavigationLinks[j].innerHTML;
        if(beerInView == linkName) {
          link.classList.add('active');
        }else{
          link.classList.remove('active');
        }
      }

    }

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

// Scroll To Selected Beer
for(var i = 0; i < beerNavigationLinks.length; i++){
  var beerLink = beerNavigationLinks[i];
  beerLink.addEventListener('click', function(){
    for(var i = 0; i < beers.length; i++){
      var beer = beers[i];
      var name = beer.querySelector('.beer-details--name');
      if(name.innerHTML == this.innerHTML) {
        window.scroll({
          top: beer.offsetTop - beerNavigator.offsetHeight - 60,
          left: 0,
          behavior: 'smooth'
        });
      }
    }
  })
}

/* ... END OF SCOPE ... */
}())
