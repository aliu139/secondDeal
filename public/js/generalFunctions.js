function picChange(evt) {
    var fileInput = evt.target.files;
    if (fileInput.length > 0) {
        var windowURL = window.URL || window.webkitURL;
        var picURL = windowURL.createObjectURL(fileInput[0]);
        drawCard(picURL)
    }
}

function toDataUrl(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    });
}

function drawCard(url) {
    var item = '<div class="item"><div id="cus1" class="card cardH custom"><div class="face" style="background-image: url(' + url + ');"></div></div></div>'
    $("#touchHandler").prepend(item);
    toDataUrl(url).then(function (res) {
        cards.unshift({
            "id": "cus1",
            "isCard": false,
            "custImg": res,
            "suit": "hearts",
            "rank": "2"
        });
    })
}

function init(n) {
    for (var i = 0; i < n; i++) {
        addCard();
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getCompassDirection() {
    var val = ((compassDirection - compassDiff) + 360) % 360;
    var direction = 0;
    if (val >= 0 && val < 180) {
        return Math.min(val, 90);
    } else {
        return Math.max(val, 270);
    }
}

function calibrate() {
    document.getElementById("touchHandler").className += " calibrated";
    document.getElementById("waiting-for-calibration").remove();
    compassDiff = compassDirection;
}