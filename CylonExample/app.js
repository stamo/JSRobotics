var Cylon = require("cylon");

Cylon.api('http');

// Initialize the robot
Cylon.robot({
	connections: {
		arduino: { adaptor: 'firmata', port: 'com9' }
	},
	
	devices: {
        led: { driver: 'led', pin: 11 },
        button: { driver: 'button', pin: 2 }
	},
	
	work: function (my) {
        my.button.on('push', function () {
			my.led.toggle();
		});
	}
}).start();