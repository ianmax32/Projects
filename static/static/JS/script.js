//age in days
function ageInDays(){
    var birthYear = prompt("Enter your birth year: ");
    var  ageDays = (2020 - birthYear) * 365;
    //create an element to write the answer called DOM (Document Object Model)
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('Your are '+ ageDays + ' days old');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex_box_result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}

function generateCat(){
    var image  = document.createElement('img');
    var div = document.getElementById('flex_box_gen');
    image.src = "C:/Users/Nai/Documents/javaScript/static/images/giphy.webp";
    div.appendChild(image);
}

function rpsGame(choiceByUser){
    console.log(choiceByUser);
    var humanChoice, botChoice;
    humanChoice = choiceByUser.id;
    botChoice = numberToChoice(randToRPSInt());
    results = decideWinner(humanChoice, botChoice);
    console.log(results);
    message = finalMessage(results); 
    console.log(message);
    rpsFrontEnd(choiceByUser.id, botChoice,message)
}

function decideWinner(humanChoice,botChoice){
    var dataBase = {//object
        'rock' :{'scissors':1, 'rock':0.5,'paper': 0},
        'paper' :{'scissors':0, 'paper':0.5,'rock': 1},
        'scissors' :{'scissors':0.5, 'rock':0,'paper': 1},
    };

    var humanChoiceFinal = dataBase[humanChoice][botChoice];
    var compterChoice = dataBase[botChoice][humanChoice];

    return [humanChoiceFinal,compterChoice]
}

function randToRPSInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock','paper','scisors'][number]
}

function finalMessage([humanChoiceFinal,compterChoice]){
    if(humanChoiceFinal === 0){
        return {'message':'You Lost!', 'color': 'red'};
    }else if(humanChoiceFinal ===0.5){
        return {'message':'You Tied!', 'color': 'yellow'};
    }else{
        return {'message':'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice,compImageChoice,message){
    var imagedataBase = {
        'rock': document.getElementById("rock").src,
        'paper': document.getElementById("paper").src,
        'scissors': document.getElementById("scissors").src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='"+ imagedataBase[humanImageChoice] +"' height = 150 width = 150>";
    messageDiv.innerHTML = "<h1 style='color: "+finalMessage['color'] + "'; font-size:60px;padding:30px;'>"+ finalMessage['message']+"</h1>";
    botDiv.innerHTML = "<img src='"+ imagedataBase[compImageChoice] +"' height = 150 width = 150 box-shadow:0px 10px 50px red>";


    document.getElementById('flex_box_RPS').appendChild(humanDiv);
    document.getElementById('flex_box_RPS').appendChild(messageDiv);
    document.getElementById('flex_box_RPS').appendChild(botDiv);
}

//challenge for changing the color of buttons
var allButtons = document.getElementsByTagName("button");
//console.log(allButtons);
var copyAllBtns = [];
for(let a =0; a<allButtons.length;a++){
    copyAllBtns.push(allButtons[a]);
}

function buttonColorChange(buttonThing){
    if(buttonThing.value === 'red'){
        buttonsRed();
    }else if(buttonThing === 'green'){
        buttonGreen();
    }else if(buttonThing.value === 'reset'){
        reset();
    }else if (buttonThing.value === 'random'){
        random();
    }
}

function buttonsRed(){
    for(let a = 0; a < allButtons.length; a++){
        //allButtons[a].;
    }
}

function buttonsGreen(){
    for(let a = 0; a < allButtons.length; a++){
        //allButtons[a].;
    }
}

function random(){
    for(let a = 0; a < allButtons.length; a++){
        //allButtons[a].;
    }
}

function reset(){
    for(let a = 0; a < allButtons.length; a++){
        //allButtons[a].;
    }
}

//challenge 5: blackjack
let blackjackGame = {
    'you':{'scoreSpan': '#your_result', 'div':'#your_box','score':0},
    'dealer':{'scoreSpan': '#dealer_result', 'div':'#dealer_box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'draws':0,
    'losses':0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const sound= new Audio('C:/Users/Nai/Documents/javaScript/static/sounds/swish.m4a');
const winSound = new Audio('C:/Users/Nai/Documents/javaScript/static/sounds/cash.mp3');
const lostSound =new Audio('static/sounds/aww.mp3');
document.querySelector('#btn_hit').addEventListener('click', blackjackHit);
document.querySelector('#btn_stand').addEventListener('click', dealerLogic);
document.querySelector('#btn_deal').addEventListener('click', blackjackDeal);

function blackjackHit(){
    if(blackjackGame['isStand'] === false){
        let card  = randomCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
    }else{

    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer){
    if(activePlayer['score'] <=21){
        let cardImage = document.createElement('img');
        cardImage.src = `C:/Users/Nai/Documents/javaScript/static/images/${card}.png`;    
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        sound.play();
    }
}

function blackjackDeal(){
    if(blackjackGame['turnsOver'] == true){
        blackjackGame['isStand'] = false;
        let your_images = document.querySelector('#your_box').querySelectorAll('img');
        let dealer_images = document.querySelector('#dealer_box').querySelectorAll('img');
        for(let a = 0; a < your_images.length; a++){
            your_images[a].remove();
        }

        for(let a = 0; a < dealer_images.length; a++){
            dealer_images[a].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your_result').textContent = 0;
        document.querySelector('#dealer_result').textContent = 0;
        document.querySelector('#your_result').style.color = 'white';
        document.querySelector('#dealer_result').style.color = 'white';
        document.querySelector('#blackjack_result').textContent = 'Lets Play!';
        document.querySelector('#blackjack_result').style.color = 'black';
        blackjackGame['turnsOver'] = true;
    }
}

function updateScore(card, activePlayer){
    if(card === 'A'){
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <=21){
            activePlayer['score']+=blackjackGame['cardsMap'][card][1];
        }else{
            activePlayer['score']+=blackjackGame['cardsMap'][card][0];
        }
    }else{
        activePlayer['score']+=blackjackGame['cardsMap'][card];    
    }
}

function showScore(activePlayer){
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    if(activePlayer['score'] >= 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'Burst';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];        
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

 async function dealerLogic(){
    blackjackGame['isStand'] = true;
    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){
        let card = randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    
    blackjackGame['turnsOver'] = true;
    showResult(computeWinner());
    
}

function computeWinner(){
    let winner;

    if(YOU['score'] < 21){
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            winner = YOU;
            blackjackGame['wins']++;
        }else if(YOU['score'] < DEALER['score']){
            winner = DEALER;
            blackjackGame['losses']++;
        }else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }
    }else if(YOU['score'] > 21 && DEALER['score'] <=21){
        winner = DEALER;
        blackjackGame['losses']++;
    }else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;        
    }
    return winner;
}

function showResult(winner){
    if(blackjackGame['turnsOver'] === true){
        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'Won';
            messageColor = 'green';
            winSound.play();
        }else if(winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost';
            messageColor = 'red';
            lostSound.play();
        }else{
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You Drew!';
            messageColor = 'black'
        }
    }

    document.querySelector('#blackjack_result').textContent = message;
    document.querySelector('#blackjack_result').style.color = messageColor;
}