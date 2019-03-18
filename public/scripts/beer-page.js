(function(){
/* ... START OF SCOPE ... */

/* Beer Navigator: Secondary Nav
 * When a user clicks on a beer in the, scroll to that beer.
 * When a user scrolls a beer into view, highlight that beet in the nav.
 */

// First, let's grab a couple elements we need to work with
var navigation = document.querySelector('nav');
var disclaimer = document.querySelector('.beer-disclaimer');
var beerNavigator = document.querySelector('.beer-navigator');
var beerNavigatorPlaceholder = document.querySelector('.beer-navigator-placeholder');
var beerNavigationLinks = document.querySelectorAll('.beer-navigator ul li');
var beers = document.querySelectorAll('.beers-list__beer');

// This helper function helps return how many pixels of an element are in view
var pixelsInView = function(el){
  var elH = el.getBoundingClientRect().height,
            H = window.innerHeight,
            r = el.getBoundingClientRect(), t = r.top, b = r.bottom;
  return Math.max(0, t>0? Math.min(elH, H-t) : (b<H?b:H))
};

window.beerVisibility = {};

// Then, let's define a scroll function that handles all this fanciness
var scroll = function(){
  if(navigation && beerNavigator && disclaimer && beerNavigatorPlaceholder && beerNavigationLinks && beers){

    // We will define a point which recalculates on scroll for when to stick the nav
    var stickPoint = disclaimer.getBoundingClientRect().bottom +
      parseInt(window.getComputedStyle(disclaimer).getPropertyValue("margin-bottom"));

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
      // update the beerVisibility pixel amount for each beer
      var beer = beers[i].querySelector('.beer-details--name').innerHTML
      var inViewPxs = pixelsInView(beers[i]);
      beerVisibility[beer] = inViewPxs;
    }

    // determine the beer that is most in view
    var mostInViewBeer = false;
    var mostInViewAmt = 0;

    for(beer in beerVisibility) {
      if (beerVisibility[beer] > mostInViewAmt) {
        mostInViewAmt = beerVisibility[beer]
        mostInViewBeer = beer
      }
    }

    // hightlight accordingly
    for(var i = 0; i < beerNavigationLinks.length; i++) {
      if (beerNavigationLinks[i].innerHTML === mostInViewBeer) {
        beerNavigationLinks[i].classList.add('active')
      }else{
        beerNavigationLinks[i].classList.remove('active')
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
  beerLink.addEventListener('focus', function() {
    if (this.keydownEventSet) {
      return;
    }
    this.keydownEventSet = true;

    this.addEventListener('keydown', function(e) {
      if (e.keyCode == 13) {
        for(var i = 0; i < beers.length; i++){
          var beer = beers[i];
          var name = beer.querySelector('.beer-details--name');
          if(name.innerHTML == this.innerHTML) {
            name.focus();
          }
        }
      }
    });
  })
}

/* ... END OF SCOPE ... */
}())
