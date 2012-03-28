define( [ 'jquery' ], function( $ ){
    var dotCount = 0;

    var CrazyDot = function ( speed, target ){
            var self = this;

            dotCount += 1;

            this.speed = speed;
            this.$dot = $('<div class="dot">' + dotCount + '</div>').appendTo( target );
            this.width = this.$dot.outerWidth(true);
            this.height = this.$dot.outerHeight(true);

            //click handler
            this.$dot.click(function() {
                if (!self.isPaused){
                    self.stop();
                } else {
                    self.start();
                }
            });
        };

    CrazyDot.prototype = {
        isPaused : false,
        start : function start(){
            this.isPaused = false;
            this.$dot.removeClass('is-paused');
            this.move();
            return this;
        },
        stop : function(){
            this.isPaused = true;
            this.$dot.addClass('is-paused');
            return this;
        },
        move : function move(){
            var maxX = $(document).width(),
                maxY = $(document).height(),
                self = this;

            this.$dot.animate({
                    top: Math.floor(Math.random() * ( (maxY - this.height) - 0 + 1)) + 0,
                    left: Math.floor(Math.random() * ( (maxX - this.width) - 0 + 1)) + 0
                },
                this.speed * (Math.random() + .25),
                function(){
                    if (!self.isPaused) {
                        self.move();
                    }
                });
            return this;
        }
    };

    // public api /////////////////////////////////////////////////////////////
    return CrazyDot;
});
