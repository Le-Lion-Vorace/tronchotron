/*
 * Fonction rendant les éléments draggable:
 * étants absents du dom au chargement, 
 * un document ready ne les touchait pas.
 * cette fonction est exécutée onmouseleave
 * de la barre des vignettes
 */
var enable = function() {
    
    $('.draggable').click(function() {
        $('.draggable').removeClass('selected');
        $(this).addClass('selected');
        var zindex = $(this).zIndex();
        var rotation = $(this).find('span.h_rotation').html();
        var name = $(this).find('.h_name').html();
        var posX = $(this).find('.h_posX').html();
        var posY = $(this).find('.h_posY').html();
        $('#zindex').html(zindex);
        $('#rotate').html(rotation);
        $('#name').html(name);
        $('#posx').html(posX);
        $('#posy').html(posY);
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
    
    $('.draggable').draggable({
        start : function(event, ui) {
            var startPos = $(this).position();
            $('.selected .h_posX').html(parseInt(startPos.left));
            $('.selected .h_posY').html(parseInt(startPos.top));
        },
        stop : function(event, ui) {
            var stopPos = $(this).position();
            $('.selected .h_posX').html(parseInt(stopPos.left));
            $('.selected .h_posY').html(parseInt(stopPos.top));
        }
    }).resizable();
    
};

/* 
 * fonction non utilisée: les boutons de déplacements
 * sont désavtivés. Pour un portage futur en web-abb
 * tablette, peut-être...
 * not in use... to use with draggale angular directive
 * 
 */
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
