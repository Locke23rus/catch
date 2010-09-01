var Player = new Class({
    Extends: GameObject,

    barriers: [],
    color: '#080',
    control: {
        up: 'up',
        down: 'down',
        left: 'left', 
        right: 'right'
    },
    index: 0,
    maxScore: 0,
    radius: 15,
    speed: 8,
    
    checkBarriers: function() {
        for (var i= this.barriers.length; i--;) {
            if (this.barriers[i].move().intersect(this)) {
                this.die();
                return true;
            }
        }
        return false;
    },
    
    checkMovement: function() {
        var pos = this.shape.center;
        var full = this.getFull();
        
        if (this.isMoveTo('left') && pos.x > 0) pos.x -= this.speed;
        if (this.isMoveTo('right') && pos.x < full.width) pos.x += this.speed;
        if (this.isMoveTo('up') && pos.y > 0) pos.y -= this.speed;
        if (this.isMoveTo('down') && pos.y < full.height) pos.y += this.speed;
    },
    
    createBarrier: function() {
        var barrier = new Barrier().setZIndex(10);
        this.barriers.push(barrier);
        barrier.color = this.barrierColor || this.color;
        this.libcanvas.addElement(barrier);
        return barrier;
    },    
    
    die: function() {
        this.maxScore = Math.max(this.maxScore, this.barriers.length);
        for (var i = this.barriers.length; i--;) {
            this.libcanvas.rmElement(this.barriers[i]);
        };
        this.barriers = [];
    },

    draw: function() {
        this.parent();
        this.libcanvas.ctx.text({
            text: 'Score: ' + this.barriers.length + ' (' + this.maxScore + ')',
            to: [20, 10 + 20 * this.index, 200, 40],
            color: this.color
        });
    },
    
    isMoveTo: function(dir) {
        return this.libcanvas.getKey(this.control[dir]);
    }
});
