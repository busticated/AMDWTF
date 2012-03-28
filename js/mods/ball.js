define( [ 'jquery' ], function( $ ){
    var ballCount = 0;

    var Ball = function ( speed, target ){
            var self = this;

            ballCount += 1;

            this.speed = speed;
            this.$ball = $('<div class="ball">' + ballCount + '</div>').appendTo( target );
            this.width = this.$ball.outerWidth(true);
            this.height = this.$ball.outerHeight(true);

            //click handler
            this.$ball.click(function() {
                if (!self.isPaused){
                    self.stop();
                } else {
                    self.start();
                }
            });
        };

    Ball.prototype = {
        isPaused : false,
        start : function start(){
            this.isPaused = false;
            this.$ball.removeClass('is-paused');
            this.move();
            return this;
        },
        stop : function(){
            this.isPaused = true;
            this.$ball.addClass('is-paused');
            return this;
        },
        move : function move(){
            var maxX = $(document).width(),
                maxY = $(document).height(),
                self = this;

            this.$ball.animate({
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
    return Ball;
});
