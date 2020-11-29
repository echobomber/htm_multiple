$(document).ready(function() {
  //Menu
  $('.menu-toggle').on('click',  function(e){
    e.preventDefault();
    $('.topNav ul').toggleClass('openMenu');
  });
});

