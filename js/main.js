require.config({
    paths : {
        'jquery' : 'http://code.jquery.com/jquery-latest'
    }
});
require( [ 'jquery', 'mods/arena', 'mods/configs' ], function( $, arena, configs ){
    var ballCount = window.location.search.replace( '?balls=', '' );

    configs.count = ballCount ? ballCount : configs.count;

    if ( configs.count > 100 ){
        configs.count = 100;
    }

    $( document ).ready(function(){
        arena.setup( configs );

        $('#js-controls').on( 'click', '.control', function( e ){
            e.preventDefault();
            switch ( e.currentTarget.hash.replace( '#', '' ) ){
                case 'stop':
                    arena.stopGame();
                    break;
                case 'start':
                    arena.startGame();
                    break;
                case 'halfspeed':
                    arena.setSpeed( configs.speed * 2 );
                    break;
                case 'fullspeed':
                    arena.setSpeed( configs.speed );
                    break;
                case 'dblspeed':
                    arena.setSpeed( configs.speed / 2 );
                    break;
                case 'add':
                    $( 'div.dialog' ).addClass( 'is-open' );
                    $('#js-ballcount').focus();
                    break;
            }
        });

        $( '#js-ballcount' ).on( 'keydown', function( e ){
            if ( e.keyCode === 13 ){
                window.location.search = 'balls=' + $( this ).val();
            }
        });
    });
});
