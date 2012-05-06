define( [ 'jquery', 'mods/ball' ], function( $, Ball ){
    'use strict';

    var balls = [];

    var setup = function( cfg ){
        var ballCount = window.location.search.replace( '?balls=', '' );

        cfg.count = ballCount > 0 ? ballCount : cfg.count;
        if ( cfg.count > 100 ){
            cfg.count = 100;
        }

        while ( balls.length < cfg.count ){
            balls.push( new Ball( cfg.speed, cfg.container ).move() );
        }

        this.cfg = cfg;

        return this;
    };

    var listen = function( cfg ){
        cfg = cfg || this.cfg;

        $( cfg.controls )
            .on( 'click' + cfg.eventNamespace, '.control', function( e ){
                e.preventDefault();
                e.stopPropagation();
                switch ( e.currentTarget.hash.replace( '#', '' ) ){
                    case 'stop':
                        stopGame();
                        break;
                    case 'start':
                        startGame();
                        break;
                    case 'halfspeed':
                        setSpeed( cfg.speed * 2 );
                        break;
                    case 'fullspeed':
                        setSpeed( cfg.speed );
                        break;
                    case 'dblspeed':
                        setSpeed( cfg.speed / 2 );
                        break;
                    case 'add':
                        $( cfg.controls + ' .dialog' ).addClass( 'is-open' );
                        $( cfg.controls + ' input[name=count]' ).focus();
                        break;
                }
            })
            .on( 'keydown' + cfg.eventNamespace, 'input', function( e ){
                if ( e.keyCode === 13 ){
                    window.location.search = 'balls=' + $( this ).val();
                }
            })
            .on( 'focusout' + cfg.eventNamespace, 'input', function( e ){
                $( 'div.dialog' ).removeClass( 'is-open' );
            });
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
        listen: listen,
        stopGame : stopGame,
        startGame : startGame,
        setSpeed : setSpeed
    };
});
