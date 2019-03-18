/*Cookie Setting Helpers!*/
window.setCookie = function(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

window.getCookie = function(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

// if(getCookie('ageGateRemembered') == "true"){
//   var welcome = document.querySelector('.welcome');
//   // We basically check the scroll position as an indicator... idk it works
//   document.body.classList.remove('locked');
//   document.ontouchmove = function(e){ return true; }
//   // Let's hide the age gate too! duh...
//   welcome.style.display = "none";
// }
