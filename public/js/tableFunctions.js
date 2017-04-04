var idCounter = 0;

function addCardToTable(id, angle, suit, rank) {
    // inject card html to the page body
    document.body.innerHTML +=
        `<div class="path" style="transform: rotate(${angle}deg)">
            <div id="${id}" class="card cardT ${suit} rank${rank}">
                <div class="face"/>
            </div>
        </div>`;
}

function addImageToTable(id, custImg, angle) {
    // var img = new Image();
    // img.src = custImg;
    
    document.body.innerHTML +=
        `<div class="path" style="transform: rotate(${angle}deg)">
            <div id="${id}" class="card cardT hearts rank2">
                <img width="50" height="50" src="` + custImg+`" >
            </div>
        </div>`;

}

function phoneMoved(angle) {
    // change angle of the phone direction indicator
    var path = document.querySelector("#phone-move.path");
    path.style = `transform: rotate(${angle}deg)`;
}

function throwCard(card) {
    // add card to table
    var cardid = "card" + idCounter++;
    if (card.isCard) {
        addCardToTable(cardid, card.angle, card.suit, card.rank);
    }
    else {
        addImageToTable(cardid, card.custImg, card.angle);
    }

    // little hack to trigger the animation
    setTimeout(function () {
        var cardElement = document.getElementById(cardid);
        // add 'thrown' class to start animation
        cardElement.className += " thrown";
        // set thrown strength
        cardElement.style = "transform: translateY(" + (100 - card.strength) + "vh) scale(1)";
    }, 100);
}

function phoneConnected() {
    // remove banner when a phone connects
    document.getElementById("waiting-for-device").remove();
}