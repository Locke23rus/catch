window.addEvent('domready', function() {
    var elem = $$('canvas')[0];
    var libcanvas = new LibCanvas.Canvas2D(elem);
    libcanvas.autoUpdate = true;
    libcanvas.fps = 60;
    libcanvas.listenKeyboard();

    libcanvas.addProcessor('pre',
        new LibCanvas.Processors.Clearer('#000')
    );    
        
    var players = [];
    (2).times(function(i) {
        var player = new Player().setZIndex(30 + i);
        player.index = i;
        libcanvas.addElement(player);
        players.push(player);
    });
    
    players[0].barrierColor = '#069';
    players[0].color = '#09f';
    
    players[1].barrierColor = '#960';
    players[1].color = '#ff0';
    players[1].control = {
        up: 'w',
        down: 's',
        left: 'a',
        right: 'd'
    };
    
    
    var bait = new Bait().setZIndex(20);
    libcanvas.addElement(bait);
    
    libcanvas.start();
    
	(function(){
        players.each(function(player) {
            if (bait.isCatched(player)) {
    			player.createBarrier();
            }
            player.checkBarriers();
            player.checkMovement();
        });        
    }.periodical(30));    
});
