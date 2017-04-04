// AUX METHODS

function addCardToTable(id, angle, suit, rank) {
    // inject card html to the page body
    document.body.innerHTML += 
        `<div class="path" style="transform: rotate(${angle}deg)">
            <div id="${id}" class="card ${suit} rank${rank}">
                <div class="face"/>
            </div>
        </div>`;
}

function qrCodeGenerator(value, elementid) {
    // generates a qrcode based on a value inside an html element
    var qr = qrcode(4, 'L');
    qr.addData(value);
    qr.make();
    document.getElementById(elementid).innerHTML = qr.createImgTag(4,16);
}

function generateID(){
    // generate random 5 character id for the session
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now();
    }
    var uuid = 'xxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function init(n) {
    for(var i = 0; i < n; i++) {
        addCard();
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getCompassDirection() {
    var val = ((compassDirection - compassDiff) + 360) % 360;
    var direction = 0;
    if(val >= 0 && val < 180) {
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