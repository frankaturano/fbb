(function(){
/* ... START OF SCOPE ... */

// STICKY NAV STUFF!

// First, let's grab a couple elements we need to work with
var navigation = document.querySelector('nav');
var navPlaceholder = document.querySelector('.visit-navigation-placeholder');
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


// FORM STUFFS!

try{
  var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
  var dtlInput = document.querySelector('input[type="datetime-local"]');
  dtlInput.value = localISOTime.slice(0,16);
}catch(e){
  console.log(e)
}

document.getElementById('media-form').addEventListener('submit', function(e){
  e.preventDefault();

  var formDone = document.getElementById('form-done');
  formDone.classList.add('form-done-submitted');
  document.querySelector('.back-to-top').click();

  var data = {};
  var fields = document.getElementById('media-form').querySelectorAll('input, textarea');
  for(var i = 0; i < fields.length; i++){
    var fieldName = fields[i].name;
    var fieldType = fields[i].type;
    var fieldVal = fieldType == "datetime-local" ? new Date(fields[i].value).toLocaleString() : fields[i].value;
    if(fieldVal === 'Invalid Date') fieldVal = fields[i].value
    if(fieldName) data[fieldName] = fieldVal;
  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://c5noovpxy8.execute-api.us-east-1.amazonaws.com/staging/submit');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      formDone.innerHTML = '<h1>Five Boroughs Brewing Co. Media Inquiries</h1>' +
      '<p class="dek">Thanks! This is headed straight to the Five Boroughs media team, who will be in touch as soon as possible.</p>'
    formDone.classList.add('form-done-complete');
    } else{
      formDone.innerHTML = '<h1>Five Boroughs Brewing Co. Media Inquiries</h1>' +
      '<p class="dek">Sorry! There was an issue processing your submission. Please email media@fiveboroughs.com directly. We apologize for the inconvenience.</p>'
    }
  };
  xhr.send(JSON.stringify(data));
});

/* ... END OF SCOPE ... */
}())
