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

    if(win_top >= (ht*3) + 600){
      $('.wedex2').css('top', 230);
      $('.wedex1').css('opacity', 0.2);
    }else{
      $('.wedex2').css('top', 0);
      $('.wedex1').css('opacity', 1);
    }

    if(win_top >= (ht*4) + 850){
      $('.wedex1, .wedex2, #part4top').css('position', 'relative');
    }else{
      $('.wedex1, .wedex2, #part4top').css('position', 'sticky');
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

    let $img = $(this);
    let $container = $img.closest('.p6scroll');
    let $track = $img.parent();

    if($img.hasClass('active')){
      $img.removeClass('active');
      $track.find('img').css('opacity', 1);
      return;
    }

    $track.find('img').removeClass('active').css('opacity', 0.5);
    $img.addClass('active').css('opacity', 1);

    let containerWidth = $container.innerWidth();
    let containerScrollWidth = $container[0].scrollWidth;

    let scrollLeft =
      ($img.index() <= 1)
        ? 0
        : $img.position().left + $img.outerWidth(true) - containerWidth;

    scrollLeft = Math.max(0, Math.min(scrollLeft, containerScrollWidth - containerWidth));
    $container.stop().animate({ scrollLeft }, 400);

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
