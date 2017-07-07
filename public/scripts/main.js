(function(){
/* ... START OF SCOPE ... */

/**
 * ORIENTATION CHANGE HANDLING: Solution!
 * Since a few sections have their height calculated by the height of the window,
 * on mobile, as window size changes on scroll(adress bar hides), the sections
 * heights will change. This conflicts with many animations, especially the nav
 * since the distance to the top of the page changes for child elements.
 */

// First, let's determine if the user is starting off in landscape of portrait
var onloadWindowDimenstions = {
  width: window.innerWidth,
  height: window.innerHeight,
  orientation: function(){
    return this.height > this.width ? 'portrait' : 'landscape';
  }
};

// As the orientation changes, let's keep track of the orientation and whether
// the change went from landscape to portrait or portrait to landscape (l-p, p-l)
var windowDimensionChangesTracked = {
  orientation : onloadWindowDimenstions.orientation(),
  changeType : false // no change on load
};

// This will set the height of a set of sections and add 47px to compensate for
// the height of the mobile adress bar plus a little cushion.
// @NOTE: Guarded to only work on mobile
var setSectionHeights = function(controlledSections, widthOrHeight){
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
    for(var i = 0; i < controlledSections.length; i++){
      controlledSections[i].style.height = onloadWindowDimenstions[widthOrHeight] + 70 + "px";
    }
  }
};

// These are the sections we want to programatically set the height for
var controlledSections = document.querySelectorAll('.hero, .welcome, .fullbleed-img');
setSectionHeights(controlledSections, 'height');

// Listent to changes in orientation, and run our code accordingly
window.addEventListener("orientationchange", function() {

  // Update the tracked orientation and the change type
  if(windowDimensionChangesTracked.orientation === 'portrait'){
    windowDimensionChangesTracked.orientation = 'landscape'
    if(!windowDimensionChangesTracked.changeType) {
      windowDimensionChangesTracked.changeType = 'p-l';
    }
  }else{
    windowDimensionChangesTracked.orientation = 'portrait';
    if(!windowDimensionChangesTracked.changeType) {
      windowDimensionChangesTracked.changeType = 'l-p';
    }
  }

  // Based on the change type, set the section heights
  var changeType = windowDimensionChangesTracked.changeType,
    oritentation = windowDimensionChangesTracked.orientation;

  if(changeType == 'l-p' && oritentation == 'portrait'){
    setSectionHeights(controlledSections, 'width');
  }else if(changeType == 'l-p' && oritentation == 'landscape'){
    setSectionHeights(controlledSections, 'height');
  }else if(changeType == 'p-l' && oritentation == 'portrait'){
    setSectionHeights(controlledSections, 'height');
  }else if(changeType == 'p-l' && oritentation == 'landscape'){
    setSectionHeights(controlledSections, 'width');
  }

}, false);

/**
 * Scroll To Button: Animation!
 * This toally unnecessary button will scroll for the lazy user
 */

// Scroll To Top Footer Thingy
var toTop = document.querySelector('.back-to-top');
toTop.addEventListener('click', function(){
  window.scroll({ top: 0, left: 0, behavior: 'smooth' });
});

// Elements involved
var downArrow = document.querySelector('.down-arrow');
var promoSection = document.querySelector('.promo');

if(downArrow && promoSection){
  // Potentially, offset the scroll of the homepage to fit in important text
  var homepage = document.body.classList.contains('homepage')
  var desktop = window.innerWidth >= 1240
  var offset = desktop && homepage ? 120 : 0
  // HACK: for story page
  if(desktop && !homepage) offset = 40

  downArrow.addEventListener('click', function(){
    window.scroll({
      top: promoSection.offsetTop + offset - 80,
      left: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Age Gate: Animation!
 * Better notes should go here, but let's scroll on age gate 'yes/no'
 */
var ageGate = document.querySelector('.age__gate'),
    ageGateYes = document.querySelector('.age__gate--choice.choice--yes'),
    ageGateNo = document.querySelector('.age__gate--choice.choice--no'),
    ageGateDisc = document.querySelector('.age__gate--disclaimer'),
    welcomeSection = document.querySelector('.welcome'),
    welcomeSectionInner = document.querySelector('.welcome .absolute-center'),
    heroSection = document.querySelector('.hero');

if(ageGate){
  // Prevent Scroling On IOS/Touch Devices
  document.ontouchmove = function(e){ e.preventDefault(); }
  // ON YES, let's scroll the user down and remove the adgate
  ageGateYes.addEventListener('click', function(){
    welcomeSectionInner.style.opacity = "0";
    welcomeSection.style.height = "0px";
    setTimeout(function(){
      document.body.classList.remove('locked');
      document.ontouchmove = function(e){ return true; }
    }, 700);
    // Set a cookie to be remembered for next time!
    setCookie("ageGateRemembered", "true", 365);
  });

  // ON NO, let's really make that kids thing stand out for a second
  ageGateNo.addEventListener('click', function(){
    ageGateDisc.style.color = '#fff';
  });

  // Finally, if the user refreshes, but already said yes, let's unlock the page
  // Let's also check if a cookie was set (user already did this) and unlock the page
  var unlockBody = function(){
    if(ageGate.getBoundingClientRect().top <= 0) {
      // We basically check the scroll position as an indicator... idk it works
      document.body.classList.remove('locked');
      document.ontouchmove = function(e){ return true; }
      // Let's hide the age gate too! duh...
      ageGate.style.display = "none";
    }
  };
  // we wait 250ms cuz of stupid bugs with refresh, and odd values
  setTimeout(function(){
    unlockBody();
  }, 250);
}

/* Homepage Animations */
var promos = document.querySelectorAll('.promo__main, .promo__secondary');
var fadeInPieces = function(){
  for(var i = 0; i < promos.length; i++){
    if(promos[i].offsetTop - window.innerHeight < window.pageYOffset){
      promos[i].classList.add('fade-in-up');
    }
  }
};

/**
 * NAVIGATION HANDLING: Animations!
 * The nav bar will stick once it reaches the top of the window.
 * Also, on mobile we will have a hamburger trigger icon which
 * will control a slide out navigation
 */

// First, let's grab a couple elements we need to work with
var navigation = document.querySelector('nav');
var hero =  document.querySelector('.hero');

// Second, let's define a scroll function that handles the sticky nav
// We will define a point which recalculates on scroll for when to stick
var scroll = function(){
  if(hero){
    var stickPoint = hero.getBoundingClientRect().top +
      parseInt(window.getComputedStyle(hero).getPropertyValue("padding-top"));

    if(stickPoint < 0){
      navigation.classList.add('sticky');
    }else{
       navigation.classList.remove('sticky');
    }
  }
  // call to fade in pieces
  fadeInPieces();
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

// MOBILE NAV HANDLING... simple sally
document.querySelector('.hamburger').addEventListener('click', function(){
  navigation.classList.add('active');
  document.body.classList.add('nav-active');
});
document.querySelector('.nav-close').addEventListener('click', function(){
  navigation.classList.remove('active');
  document.body.classList.remove('nav-active');
});

// On Click Of The Promo Image, Click The Promo Link (HACK!)
var promoLinks = document.querySelectorAll('.promo__text a');
for(var i = 0; i < promoLinks.length; i++){
  var promoImage = promoLinks[i].parentElement.parentElement.querySelector('.promo__image');
  promoImage.addEventListener('click', function(){
    this.parentElement.querySelector('.promo__text a').click();
  });
}

/* ... END OF SCOPE ... */
}());

(function(){
/* START GOOGLE ANALYTICS */
  (function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function() {
          (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
      a = s.createElement(o),
          m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  ga('create', 'UA-101760048-1', 'auto');
  ga('send', 'pageview');
/* END GOOGLE ANALYTICS */
}());
