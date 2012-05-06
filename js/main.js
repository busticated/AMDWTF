require.config({
    paths : {
        'jquery' : 'http://code.jquery.com/jquery-latest'
    }
});
require( [ 'jquery', 'mods/arena', 'mods/configs' ], function( $, arena, configs ){
    'use strict';

    $( document ).ready(function(){
        if ( $('body').data('page') === 'demo' ){
            arena.setup( configs ).listen();
        }
    });
});
