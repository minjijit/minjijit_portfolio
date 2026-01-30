$(function(){
            
          let t = 0;
          
          setInterval(function(){
              t += 0.05;
              
              $('#armm').attr('transform',`rotate(${-Math.sin(t)*5})`);
              
              $('#hair2').attr('transform',`rotate(${-Math.sin(t)*2.5})`);
              $('#leg1m').attr('transform',`rotate(${Math.cos(t)*2})`);

              $('#bfw path').eq(0)
              .attr('transform', `translate(${Math.sin(t)*8},0)`);

              $('#bfw path').eq(1)
              .attr('transform', `translate(${Math.cos(t)*12},0)`);

              $('#clu path').eq(0)
              .attr('transform', `translate(0,${-Math.sin(t)*5})`);

              $('#clu path').eq(1)
              .attr('transform', `translate(0,${-Math.cos(t)*5})`);

              $('#flower .fw1').each(function(i){
                  $(this).attr('transform',`rotate(${Math.cos(t + i)*5})`);
              });

              $('#flower .fw2').each(function(i){
                  $(this).attr(
                      'transform',
                      `rotate(${Math.sin(t + i)*5})`
                  );
                });

          } , 30);

        });