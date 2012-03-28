define( [ 'jquery', 'mods/crazydot' ], function( $, CrazyDot ){
    var dots = [];

    var setup = function( cfg ){
        while ( dots.length < cfg.count ){
            dots.push( new CrazyDot( cfg.speed, 'body' ).move() );
        }
    };

    var stopGame = function(){
        eachDot(function( dot ){
            dot.stop();
        });
    };

    var startGame = function(){
        eachDot(function( dot ){
            dot.start();
        });
    };

    var setSpeed = function( spd ){
        eachDot(function( dot ){
            dot.speed = spd;
        });
    };

    var eachDot = function( callback, ctx ){
        for ( var i = 0, l = dots.length; i < l; i += 1 ){
            callback.call( ctx, dots[ i ], i );
        }
    };

    // public api /////////////////////////////////////////////////////////////
    return {
        setup : setup,
        stopGame : stopGame,
        startGame : startGame,
        setSpeed : setSpeed
    };
});
