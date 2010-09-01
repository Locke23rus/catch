var Bait = new Class({
    Extends: GameObject,
    Implements: [LibCanvas.Interfaces.Moveable],

    radius: 15,
    color: '#f0f',
    invulnerable: false,
    
    isCatched: function(player) {
        if (!this.invulnerable && player.shape.intersect(this.shape)) {
            this.move();
            this.makeInvulnerable(500);
            return true;
        }
        return false;
    },
    
    makeInvulnerable: function(time) {
        this.invulnerable = true;
        (function() {
            this.invulnerable = false;
        }.bind(this).delay(time));
    },
    
    move: function() {
        return this.moveTo(this.createPosition(), 800);
    }
    
});
