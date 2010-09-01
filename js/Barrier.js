var Barrier = new Class({
    Extends: GameObject,
    
    full: null,
    speed: null,
    radius: 8,
    color: '#0ff',
    
    initialize: function() {
        this.parent();
        this.speed = new LibCanvas.Point(
            $random(2, 5), $random(2, 5)
        );
        $random(0, 1) && (this.speed.x *= -1);
        $random(0, 1) && (this.speed.y *= -1);
    },
    
    move: function() {
        var center = this.shape.center.move(this.speed);
        if (!center.x.between(0, this.full.width)) {
            (this.speed.x *= -1);
        }
        if (!center.y.between(0, this.full.height)) {
            (this.speed.y *= -1);
        }
        return this;
    },
    
    intersect: function(player) {
        return (player.shape.intersect(this.shape));
    }
});
