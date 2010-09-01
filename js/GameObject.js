var GameObject = new Class({
    Extends: LibCanvas.Interfaces.Drawable,
    
    initialize: function() {
        this.bind('libcanvasSet', function() {
            this.shape = new LibCanvas.Shapes.Circle({
                center: this.createPosition(), 
                radius: this.radius
            });
        });
    }, 
    
    getFull: function() {
        return (this.full = this.full || this.libcanvas.ctx.getFullRectangle());
    }, 
    
    createPosition: function() {        
        return this.getFull().getRandomPoint();
    },
    
    draw: function() {
        this.libcanvas.ctx.fill(this.shape, this.color);
    } 
});