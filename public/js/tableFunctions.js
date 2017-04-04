var idCounter = 0;

function phoneMoved(angle) {
    // change angle of the phone direction indicator
    var path = document.querySelector("#phone-move.path");
    path.style = `transform: rotate(${angle}deg)`;
}

function throwCard(card) {
    // add card to table
    var cardid = "card" + idCounter++;
    addCardToTable(cardid, card.angle, card.suit, card.rank);    

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