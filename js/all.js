$(document).ready(function() {
  //Menu
  $('.Menu-toggle').on('click',  function(e){
    e.preventDefault();
    $('.topNav').toggleClass('openMenu');
  });
   //滾動
  $('.scrollSpy').on('click', function(e){
    e.preventDefault();
    let target = $(this).attr('href');
    //指定 id 距離最頂部多少
    let targetPos = $(target).offset().top;
    //為了支援瀏覽器所以要同時下 html,body
    $('html, body').animate({scrollTop: targetPos-80}, 500);
    $('.topNav').removeClass('openMenu');
  });
  $('.scrollTop').on('click', function(e){
    $('html, body').animate({scrollTop: 0}, 500);
  });
  //每次滾動的時候執行
  $(window).scroll(function(){
    //滾動軸的最頂點位置
    let scrollPos = $(window).scrollTop();
    //視窗高度
    let windowHeight = $(window).height();
    $('.scrollSpy').each(function(){
      let target = $(this).attr('href');
      let targetPos = $(target).offset().top;
      let targetHeight = $(target).outerHeight();
      if (targetPos-120 <= scrollPos && (targetPos + targetHeight) > scrollPos){
        $('.scrollSpy').removeClass('active')
        $(this).addClass('active');
      }else {
        $(this).removeClass('active');
      }
    });
  });
  //左欄篩選功能 - 立即執行函式
  //JQuery 的變數可以用 $ 區分
  (function(){
    let $cardContent = $('.card-content');
    let $filterBtn = $('.order-filter ul');
    let tagged = {};
    $cardContent.each(function(){
      let card = this;
      let tags = $(this).data('tags');
      if(tags){
        tags.split(',').forEach(function(tagName){
          if(tagged[tagName] == null){
            tagged[tagName] = [];
          }
          tagged[tagName].push(card);
        });
      }
    });
    // console.log(tagged);
    $('<li/>',{
      html: `<a href="#">全部 (${$cardContent.length})</a>`,
      class: 'active',
      click: function(e){
        e.preventDefault();
        $(this)
          .addClass('active')
          .siblings()
          .removeClass('active');
        $cardContent.show();
      }
    }).appendTo($filterBtn);
    //
    $.each(tagged, function(tagName){
      $('<li/>',{
        html: `<a href="#">${tagName} (${tagged[tagName].length})</a>`,
        click: function(e){
          e.preventDefault();
          $(this)
            .addClass('active')
            .siblings()
            .removeClass('active');
          $cardContent
            .hide()
            .filter(tagged[tagName])
            .show();
        }
      }).appendTo($filterBtn);
    });
  }());
  //
});

