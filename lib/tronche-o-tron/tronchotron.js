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

var zUp = function() {
    var zindex = $('.selected').parent().zIndex();
    $('.selected').parent().zIndex(zindex + 1);
    $('#zindex').html(zindex + 1);
};

var zDown = function() {
    var zindex = $('.selected').parent().zIndex();
    if (zindex >= 1) {
        $('.selected').parent().zIndex(zindex - 1);
        $('#zindex').html(zindex - 1);
    };
};

var rotateRt = function() {
    var rotation = $('.selected span.h_rotation').html();
    rotation = parseInt(rotation);
    rotation++;
    var rotate = 'rotate(' + rotation + 'deg)';
    $('.selected span.h_rotation').parent().css('transform', rotate);
    $('.selected span.h_rotation').parent().find('span.h_rotation').html(rotation);
    $('#rotate').html(rotation);
};

var rotateLt = function() {
    var rotation = $('.selected span.h_rotation').html();
    rotation = parseInt(rotation);
    rotation--;
    var rotate = 'rotate(' + rotation + 'deg)';

    $('.selected span.h_rotation').parent().css('transform', rotate);
    $('.selected span.h_rotation').parent().find('span.h_rotation').html(rotation);
    $('#rotate').html(rotation);
};
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

var flipX = function() {
    if ($('.selected img').hasClass('flipx')) {
        $('.selected img').removeClass('flipx');
        $('#flipx').html('false');
    } else {
        $('.selected img').addClass('flipx');
        $('#flipx').html('true');
    }
};

var flipY = function() {
    if ($('.selected img').hasClass('flipy')) {
        $('.selected img').removeClass('flipy');
        $('#flipy').html('false');
    } else {
        $('.selected img').addClass('flipy');
        $('#flipy').html('true');
    }
};
