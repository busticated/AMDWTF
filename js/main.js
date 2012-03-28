require.config({
    paths : {
        'jquery' : 'http://code.jquery.com/jquery-latest'
    }
});
require( [ 'jquery', 'mods/arena', 'mods/configs' ], function( $, arena, configs ){
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
            }
        });
    });
});
