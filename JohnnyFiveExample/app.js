var five = require("johnny-five");
var songs = require('j5-songs');
var song = require('./song.js');

var board = new five.Board({
    port: "com9"
});

board.on("ready", function () {
    var led = new five.Led(11);
    led.blink(500);

    var piezo = new five.Piezo(3);
    
    // Injects the piezo into the repl
    board.repl.inject({
        piezo: piezo, 
        songs: songs
    });
    
    // Plays a song
    piezo.play(song);
});