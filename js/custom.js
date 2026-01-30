$(function(){

  /* ================= 기본 변수 ================= */

  let $win  = $(window);
  let winH  = $win.height();

  let $part1 = $('#part1');
  let $imgs  = $('.movimg .img');
  let $texts = $('.opentext .txt');

  let autoMoving = false;
  let ht;

  /* ================= 섹션 높이 고정 ================= */

  function setSectionHeight(){
     ht = $(window).height();
    $('section').height(ht);
  }

  setSectionHeight();
  $win.on('resize', setSectionHeight);

  /* ================= 스크롤 위치 변수 ================= */

  let win_top;
  let st_end;
  let st6_top;

  /* ================= 스크롤 이벤트 ================= */

  $win.on('scroll', function(){

     win_top = $win.scrollTop();
    ht = $win.height();
    if (
      !$('.wedex1').length ||
      !$('.wedex2').length ||
      !$('#part5').length
    ) return;

    let st_end  = $('#part5').offset().top;
    let st6_top = $('#part6').offset().top;
    let st7_top = $('#part7').offset().top;
    
    let part2Top = $('#part2').offset().top;
    let part3Top = $('#part3').offset().top;
    let part3Bottom = part3Top + $('#part3').outerHeight();




    /* ---------- 섹션별 on ---------- */

    
    if(win_top >= part2Top && win_top < part3Top){
    $('.title, .ab1, .ab2').addClass('on');
    }

    if(win_top >= part3Top && win_top < part3Bottom){
    $('.p3-1, #p3-2').addClass('on');
    }
    
    if(win_top >= st_end - (ht / 2)){
      $('.p5-1, .p5-2').addClass('on');
    }
    
    /* ---------- 웹 위치 제어 ---------- */
     
    
    

    if(win_top >= (ht*3) + 100){
      $('.wedex1').css('top', 250);
    }else{
      $('.wedex1').css('top', 0);
    }

    if(win_top >= (ht*3) + 750){
      $('.wedex2').css('top', 250);
      $('.wedex1').css('opacity', 0.2);
    }else{
      $('.wedex2').css('top', 0);
      $('.wedex1').css('opacity', 1);
    }
    if(win_top >= (ht*3) + 900){
      $('.wedex3').css('top', 250);
      
    }else{
      $('.wedex3').css('top', 0);
    }
    if(win_top >= (ht*3) + 1400){
    $('.wedex2').css('opacity', 0.2);
    $('.wedex3').css('opacity', 1);
    
    }else{
    $('.wedex2').css('opacity', 1);
    
    }
    
    if(win_top >= (ht*3) + 1100){
      $('.wedex4').css('top', 250);
      $('.wedex3').css('opacity', 1);
      $('.wedex1').css('opacity', 0);
    }else{
      $('.wedex4').css('top', 0);
    }
    if(win_top >= (ht*3) + 2100){
      $('.wedex4').css('top', 250);
      $('.wedex3').css('opacity', 0.5);
      $('.wedex2').css('opacity', 0);
      $('.wedex1').css('opacity', 0);
    }else{
      $('.wedex4').css('top', 0);
    }
    if(win_top >= st_end){
      
      $('#part4top').addClass('end');
    }else{
      $('#part4top') .removeClass('end');
    }

    /* ---------- part6 ---------- */

    if(win_top >= st6_top - (ht * 0.6)){
      $('#part6').addClass('on');
    }
    
    if(win_top >= st7_top){
      $('#bye').addClass('on');
    }
    
    

  });

  /* ================= 마우스 휠 섹션 이동 ================= */

  let check = false;
  let isMoving = false;
  let part7Done = false;

  $('section').mousewheel(function(event, delta){

    win_top = $win.scrollTop();
    
   

    if ($(this).is('#part5') || $(this).is('#part7')) check = true;
    if ($(this).is('#part5')) return;

    if(win_top < st6_top && $(this).is('#part6')){
      if(check){
        $('html, body').stop().animate(
          { scrollTop: $('#part6').offset().top },
          600,
          'linear'
        );
        check = false;
        return;
      }
    }else{
      if(delta > 0){
        if($(this).is('#part1')){
          return;
        }
        $('html, body').stop().animate(
          { scrollTop: $(this).prev().offset().top },
          600,
          'linear'
        );
      }else if(delta < 0){
        if($(this).is('#part7')){
          return;
        }
        $('html, body').stop().animate(
          { scrollTop: $(this).next().offset().top },
          600,
          'linear'
        );
      }
    }

  });

  /* ================= part6 가로 스크롤 ================= */

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  $('.p6scroll')
    .on('wheel', function(e){
      e.preventDefault();
      e.stopPropagation();
      this.scrollLeft += e.originalEvent.deltaY;
    })
    .on('mousedown', function(e){
      isDown = true;
      startX = e.pageX - this.offsetLeft;
      scrollLeft = this.scrollLeft;
    })
    .on('mouseleave mouseup', () => isDown = false)
    .on('mousemove', function(e){
      if(!isDown) return;
      let x = e.pageX - this.offsetLeft;
      let walk = (x - startX) * 1.2;
      this.scrollLeft = scrollLeft - walk;
      $('.p6scroll').animate({screenLeft:(scrollLeft - walk)},1000);
    });

  /* ================= part6 → part7 ================= */

  (function(){

    let $scroll = $('.p6scroll');
    let $target = $('#part7');

    let atEnd = false;
    let readyToMove = false;
    let isMoving = false;

    if(!$scroll.length || !$target.length) return;

    $scroll.on('scroll', function(){
      let maxScroll = this.scrollWidth - this.clientWidth;
      atEnd = this.scrollLeft >= maxScroll - 10;
      if(!atEnd) readyToMove = false;
    });

    $scroll.on('wheel', function(e){
      if(!atEnd || isMoving) return;
      if(e.originalEvent.deltaY > 0){
        e.preventDefault();
        e.stopPropagation();

        readyToMove = true;

        if(readyToMove){
          isMoving = true;
          $('html, body').stop().animate(
            { scrollTop: $target.offset().top },
            1400,
            'swing',
            () => isMoving = false
          );
        }
      }
    });

  })();

  /* ================= part6 이미지 클릭 ================= */

  $('.p6-2 img').on('click', function(){

    const img = $(this);
    const box = img.closest('.p6scroll');
    const imgs = img.parent().find('img');

    if (img.hasClass('active')) {
      img.removeClass('active');
      imgs.css('opacity', 1);
      return;
    }

    imgs.removeClass('active').css('opacity', 0.5);
    img.addClass('active').css('opacity', 1);

    let move = img.position().left;
    let max = box[0].scrollWidth - box.innerWidth();

    box.stop().animate({
      scrollLeft: Math.max(0, Math.min(move, max))
    }, 400);

  });

  /* 모든 #id 링크 */
  $('a[href^="#"]').on('click', function(e){
    let href = $(this).attr('href');
    if(href === '#' || !href) return;

    let $target = $(href);
    if(!$target.length) return;

    e.preventDefault();
    moveScroll($target.offset().top);
  });

  /* ================= part7 on ================= */
  document.addEventListener('scroll', function(){
    let part7 = document.querySelector('#part7');
    if(!part7) return;

    let part7Top = part7.getBoundingClientRect().top;
    let winH = window.innerHeight;

    if(part7Top < winH * 0.8){
      part7.classList.add('on');
    }
  });

  /* ================= auto scroll engine ================= */
  let isAutoScrolling = false;

  function moveScroll(targetTop){
    if(isAutoScrolling) return;

    isAutoScrolling = true;

    $('html, body').stop(true).animate(
      { scrollTop: targetTop },
      800,
      'swing',
      () => isAutoScrolling = false
    );
  }
});
