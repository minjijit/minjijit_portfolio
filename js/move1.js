$(function () {

          const $arm    = $('#arm');
          const $rightF = $('#right-f');
          const $hair   = $('#hair');
          
          const $leaf = $('#leaf');

          const $clouds = $('.cloud');

          const $ht = $('.ht');
          const $cs = $('.cs');
          const $jq = $('.jq');

          let t = 0;

          setInterval(function () {
            t += 0.05;

            /* ---- arm ---- */
            $arm.attr(
              'transform',
              `rotate(${-Math.sin(t) *1})`
            );

            /* ---- leg ---- */
            $rightF.attr(
              'transform',
              `rotate(${-Math.sin(t + 1) * 3})`
            );

            /* ---- hair ---- */
            $hair.attr(
              'transform',
              `rotate(${Math.sin(t + 0.5) * 2})`
            );

            /* ---- leaf ---- */
            $leaf.css(
              'transform',
              `rotate(${Math.sin(t * 2) * 2}deg)`
            );

            /* ---- cloud ---- */
            $clouds.each(function (i) {
              $(this).css(
                'transform',
                `translateY(${Math.sin(t + i) * 5}px)`
              );
            });

            /* ---- ht ---- */
            $ht.css(
              'transform',
              `translateY(${Math.sin(t) * 5}px)
              rotate(${Math.sin(t) * 2}deg)`
              
            );

            /* ---- cs ---- */
            $cs.css(
              'transform',
              `translateY(${Math.sin(t + 1) * 1}px)
                rotate(${Math.sin(t + 1) * 1}deg)`
              );

            /* ---- jq ---- */
            $jq.css(
              'transform',
              `translateY(${Math.sin(t + 2) * 1}px)
                rotate(${Math.sin(t + 2) * 1}deg)`
            );

          }, 20); // 약 60fps

        });