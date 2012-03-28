define( [ 'jquery', 'mods/ball' ], function( $, Ball ){
    var balls = [];

    var setup = function( cfg ){
        while ( balls.length < cfg.count ){
            balls.push( new Ball( cfg.speed, cfg.container ).move() );
        }
    };

    var stopGame = function(){
        eachBall(function( ball ){
            ball.stop();
        });
    };

    var startGame = function(){
        eachBall(function( ball ){
            ball.start();
        });
    };

    var setSpeed = function( spd ){
        eachBall(function( ball ){
            ball.speed = spd;
        });
    };

    var eachBall = function( callback, ctx ){
        for ( var i = 0, l = balls.length; i < l; i += 1 ){
            callback.call( ctx, balls[ i ], i );
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
