// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    var brick;
    var speedForward = 40;
    var speedBackward = -40;
    var timeToGo = 1000;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                brick = Lego.Ev3.Core.Brick(Lego.Ev3.WinRT.BluetoothCommunication());
                brick.connectAsync().done(function () {
                    brick.directCommand.playToneAsync(100, 1000, 500);

                    WinJS.UI.Pages.define("/default.html", {
                        ready: function (element, options) {
                            var els = element.querySelectorAll('#control_section button');
                            for (var i = 0; i < els.length; i++) {
                                els.item(i).removeAttribute('disabled');
                            }
                            
                            registerEvents(element);
                        }
                    });
                });
            } else {
                // TODO: This application was suspended and then terminated.
                // To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();

    function goForward() {
        brick.directCommand.turnMotorAtSpeedAsync(Lego.Ev3.Core.OutputPort.b | Lego.Ev3.Core.OutputPort.c, speedForward, false);
    }

    function goBackward() {
        brick.directCommand.turnMotorAtSpeedAsync(Lego.Ev3.Core.OutputPort.b | Lego.Ev3.Core.OutputPort.c, speedBackward, false);
    }

    function goLeft() {
        brick.directCommand.turnMotorAtSpeedAsync(Lego.Ev3.Core.OutputPort.c, speedForward, false);
        brick.directCommand.turnMotorAtSpeedAsync(Lego.Ev3.Core.OutputPort.b, speedBackward, false);
    }

    function goRight() {
        brick.directCommand.turnMotorAtSpeedAsync(Lego.Ev3.Core.OutputPort.b, speedForward, false);
        brick.directCommand.turnMotorAtSpeedAsync(Lego.Ev3.Core.OutputPort.c, speedBackward, false);
    }


    function stop()
    {
        brick.directCommand.stopMotorAsync(Lego.Ev3.Core.OutputPort.all, false);
    }

    function grab() {
        brick.directCommand.turnMotorAtSpeedForTimeAsync(Lego.Ev3.Core.OutputPort.a, speedForward, timeToGo, false);
    }

    function release() {
        brick.directCommand.turnMotorAtSpeedForTimeAsync(Lego.Ev3.Core.OutputPort.a, speedBackward, timeToGo, false);
    }

    function registerEvents(element) {
        element.querySelector('#forward').addEventListener('click', goForward);
        element.querySelector('#backward').addEventListener('click', goBackward);
        element.querySelector('#left').addEventListener('click', goLeft);
        element.querySelector('#right').addEventListener('click', goRight);
        element.querySelector('#stop').addEventListener('click', stop);
        element.querySelector('#grab').addEventListener('click', grab);
        element.querySelector('#release').addEventListener('click', release);
    }
})();


