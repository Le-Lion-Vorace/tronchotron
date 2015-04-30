/*
 * Fonction rendant les éléments 'draggables'
 * exécutée sur l'evenement
 * onmouseleave de la barre des vignettes.
 */

var enable = function() {
    
    $('.element').click(function() {
        $('.element').removeClass('selected');
        $(this).addClass('selected');
        var zindex = $(this).zIndex();
        var rotation = $(this).find('span.h_rotation').html();
        var name = $(this).find('.h_name').html();
        var posX = $(this).find('.h_posX').html();
        var posY = $(this).find('.h_posY').html();
        var width = $(this).width();
        var height = $(this).height();
        $('#zindex').html(zindex);
        $('#rotate').html(rotation);
        $('#name').html(name);
        $('#posx').html(posX);
        $('#posy').html(posY);
        $('#width').html(width);
        $('#height').html(height);
    });

    $('.draggable').mouseenter(function() {
        $(this).find('.close').show();
    });

    $('.draggable').mouseleave(function() {
        $(this).find('.close').hide();
    });

    $('.close').click(function() {
        $(this).parent().hide();
    });
    
    $('.draggable')
        .draggable({
            start : function(event, ui) {
                var startPos = $(this).position();
                $('.selected .h_posX')
                    .html(parseInt(startPos.left));
                $('.selected .h_posY')
                    .html(parseInt(startPos.top));
            },
            stop : function(event, ui) {
                var stopPos = $(this).position();
                $('.selected .h_posX')
                    .html(parseInt(stopPos.left));
                $('.selected .h_posY')
                    .html(parseInt(stopPos.top));
            }
        })
        .resizable({
            start : function(event, ui) {
                var startWidth = $(this).width();
                $('.selected .h_width').html(startWidth);
                $('.selected .h_width').html(startWidth);
                $('#width').html(startWidth);           
                var startHeight = $(this).height();
                $('.selected .h_height').html(startHeight);
                $('.selected .h_height').html(startHeight);
                $('#heiht').html(startHeight);      
            },
            stop : function(event, ui) {
                var stopWidth = $(this).width();
                $('.selected .h_height').html(stopWidth);
                $('.selected .h_height').html(stopWidth);                      
                $('#width').html(stopWidth);         
                var stopHeight = $(this).height();
                $('.selected .h_height').html(stopHeight);
                $('.selected .h_height').html(stopHeight);                      
                $('#height').html(stopHeight);        
        }
    });
    
};

/* 
 * fonction non utilisée: les boutons de déplacements
 * sont désavtivés. Pour un portage futur en web-abb
 * tablette, peut-être...
 * not in use... to use with draggale angular directive 
 */
/*
 
  var elementMove = function(sens) {
    
    var y = $('.selected span.h_posY').html();
    y = parseInt(y);
    var x = $('.selected span.h_posX').html();
    x = parseInt(x);
    
    if (sens=='up'){
        y--;
        $('.selected').css('top',y);
        $('.selected span.h_posY').html(y);
        $('#posy').html(y);
    };
    if (sens=='down') {
        y++;
        $('.selected').css('top',y);
        $('.selected span.h_posY').html(y);
        $('#posy').html(y);
    }
    if (sens=='left') {
        x--;
        $('.selected').css('left',x);
        $('.selected span.h_posX').html(x);
        $('#posx').html(x);
    };
    if (sens=='right') {
        x++;
        $('.selected').css('left',x);
        $('.selected span.h_posX').html(x);
        $('#posx').html(x);
    }
   
};
*/
 
