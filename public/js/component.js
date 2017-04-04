var isCompassAttached = false;
var tableId = 0;
var compassDiff = 0;

window.main = new Vue({
    el: '#main',
    data: {
        client: null,
        requestedSID: getRandomNumber(0, 10000)
    },
    methods: {
        setUser: function (isClient) {
            this.client = isClient;

            document.getElementById("start").remove();
            document.getElementById(isClient ? "table" : "deck").remove();
            $(isClient ? "#deck" : "#table").show();

            let tableId = this.requestedSID;
            if (isClient) {
                // init a deck of 10 cards
                init(10);

                // register phone connection
                socket.emit('phone-connect', tableId);
                this.clientLoop();
            }
            else {
                socket.emit('table-connect', tableId);
                // and the URL
                document.getElementById("url").innerHTML = tableId;
                this.tableLoop();
            }
        },
        clientLoop: function () {
            // init touch events in phone
            var touchTrack = new TouchTrack();
            touchTrack.init(document.getElementById("touchHandler"), touchStart, touchMove, touchEnd);

            // init compass data
            if (!isCompassAttached) {
                // if device has the touch orientation plugin
                if (window.DeviceOrientationEvent) {
                    // Listen for the deviceorientation event and handle the raw data
                    window.addEventListener('deviceorientation', function (event) {
                        compassDirection = (event.webkitCompassHeading) ? event.webkitCompassHeading : -event.alpha;
                    });
                }
                isCompassAttached = true;
            }

            // ... and update phone direction each 500 ms
            setInterval(function () {
                socket.emit("phone-move", { tableId: tableId, angle: getCompassDirection() });
            }, 500);
        },
        tableLoop: function () {
            socket.on('phone-move', phoneMoved);
            socket.on('phone-connect', phoneConnected);
            socket.on('phone-throw-card', throwCard);
        }
    }
})