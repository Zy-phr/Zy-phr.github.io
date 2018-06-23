/*
=======================================================
Game of Thrones Questions in blurb_display
=======================================================
*/

var gamePhrases = [
  {phrase: "Ned Stark", blurb: "Who Said...The man who passes the sentence should swing the sword."},
  {phrase: "Jaime Lannister", blurb: "Who Said...The things I do for love."},
  {phrase: "Joffrey", blurb: "Who Said...Everyone is mine to torment."},
  {phrase: "Melisandre", blurb: "Who Said...The night is dark and full of terrors."},
  {phrase: "Lannisters", blurb: "Who Said...A Lannister always pays his debts."},
  {phrase: "Syrio Forel", blurb: "Who Said...What do we say to the God of death?"},
  {phrase: "Tyrion Lannister", blurb: "Who Said...That's what I do: I drink and I know things"},
  {phrase: "Cersei Lannister", blurb: "Who Said...If you ever call me sister again, I'll have you strangled in your sleep."},
  {phrase: "Tywin Lannister", blurb: "Who Said...Any man who must say 'I am the King' is no true King."},
  {phrase: "Samwell Tarly", blurb: "Who Said...I read it in a book."},
  {phrase: "Jon Snow", blurb: "Who Said...If I fall, don't bring me back."},
  {phrase: "Lord Varys", blurb: "Who Said...The big fish eat the little fish and I keep on paddling."},
  {phrase: "Wylis", blurb: "Who Said...Hold the door!"},
  {phrase: "Arya Stark", blurb: "Who Said...Anyone can be killed."},
  {phrase: "Rodrik Cassel", blurb: "Who Said...Gods help you Theon Greyjoy, now you are truly lost."},
  {phrase: "Jorah Mormont", blurb: "Who Said...There's a beast in every man, and it stirs when you put a sword in his hand."},
  {phrase: "Daenerys Targaryen", blurb: "Who Said...Dracarys."},
  {phrase: "Ramsay Bolton", blurb: "Who Said...If you think this has a happy ending, you haven't been paying attention."},
  {phrase: "Bran Stark", blurb: "Who Said...Hush, Hodor. No more Hodor-ing!"},
  {phrase: "The Hound", blurb: "Who Said...If any more words come pouring out your c--t mouth"},
  {phrase: "Sansa Stark", blurb: "Who Said...You are going to die tomorrow, Lord Bolton. Sleep well"},
  {phrase: "Olenna Tyrell", blurb: "Who Said...Are you a sheep? No, you're a dragon...be a dragon"},
  {phrase: "Robert Barathron", blurb: "Who Said...I swear to you, sitting a throne is a thousand times harder than winning one"},
 ]; 
   
 var whiteWalkerMessages = [
  "6 GUESSES REMAINING...I WILL PLAY THE GAME!",
  "5 GUESSES REMAINING...WHEN YOU PLAY THE GAME OF THRONES, YOU WIN OR YOU DIE!",
  "4 GUESSES REMAINING...I WILL TAKE WHAT IS MINE!",
  "3 GUESSES REMAINING...DEMONS ARE MADE OF SNOW AND ICE AND COLD",
  "2 GUESSES REMAINING...I WILL DEFEND THE WALL!",
  "1 GUESS REMAINING...WINTER IS COMING!"
];

   function getNewPhrase() {

      var choice_idx = Math.floor(Math.random() * gamePhrases.length);

      var results = gamePhrases.splice(choice_idx, 1)[0];
      return results;

    }
   
   var lettersToWinGame = 0;
   var currentPhrase;
   var displayString = '';
   var whiteWalkerLevel = 0;
   var templateArray =[];
   var	remainingGuesses =6;
   var gamesWon =0;
   var gamesLost =0;
   var lettersGuessed =[];
   var gameOver = false;
   var userWon = false;
   var userLost = false;
    
    var audio = new Audio('assets/sounds/Game_Of_Thrones_Main_Title-576202.mp3');
    var audio_whiteWalker = new Audio('assets/sounds/breathy-monster-voice_zkKPeH4_.mp3');
    var audio_Nothing = new Audio('assets/sounds/you_know_nothing.mp3');

    //https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
   var display = document.getElementById('phrase_display');
   var blurb_display = document.getElementById('blurb_display');
   var main_image = document.getElementById('main_image');

   function restart() {
    audio.pause();
    audio_whiteWalker.pause();
    audio_whiteWalker = new Audio('assets/sounds/breathy-monster-voice_zkKPeH4_.mp3');
    
    lettersToWinGame = 0;
    lettersGuessed = [];
    currentPhrase = getNewPhrase();
    console.log(currentPhrase);
    displayString = '';
    whiteWalkerLevel = 0;
    main_image.src = "assets/images/download.png";
  
    for (i = 0; i < currentPhrase.phrase.length; i++) {
      if (currentPhrase.phrase.charAt(i) !== " ") {
        displayString += "_";
        lettersToWinGame += 1;
      }
      else {
        displayString += " ";
      }
    }
  
    // https://www.w3schools.com/jsref/prop_node_textcontent.asp
    display.textContent = displayString;
  
    // Set the blurb text up top, to be the "blurb" member of our currentPhrase object
    blurb_display.textContent = currentPhrase.blurb;
  
  }

  document.onkeyup = function(event) {

    /* listening and picking up user entry*/	
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    
    /* stops user from putting in the same letter twice*/
    var isAlreadyTyped = lettersGuessed.indexOf(userGuess);
    if(isAlreadyTyped >= 0){
      alert("You already typed that letter");
      return;
    
    } else {
    }
    /* builds letters already guessed array and pushes to HTML */ 
    lettersGuessed.push(userGuess);
    var newLetterDiv = document.getElementById("lettersGuessed");
    newLetterDiv.innerHTML = "<p>" + lettersGuessed + "</p>";

    // See if this letter, was any of the letters in our phrase
    var tempstr = '';
    var correct_guess = false;


 
   for (var i = 0; i < currentPhrase.phrase.length; i++) {
     console.log("currentPhrase.phrase = " + currentPhrase.phrase);
     console.log(currentPhrase.phrase.charAt(i).toUpperCase());
     if ((currentPhrase.phrase.charAt(i).toUpperCase() == event.key) || 
         (currentPhrase.phrase.charAt(i).toLowerCase() == event.key)) {
         tempstr += currentPhrase.phrase.charAt(i);
         lettersToWinGame--;
         correct_guess = true;
         main_image.src = "assets/images/download.png";
     }
     else {
      tempstr += displayString.charAt(i);
     }
    }

    if (correct_guess === false) {

      audio_Nothing.play();
       whiteWalkerLevel++;   
         main_image.src = "assets/images/download" + whiteWalkerLevel + ".png"
         if (whiteWalkerLevel === 7) {
            userWon = true;
            gameOver = true;
            gamesLost++;
            var newLoseDiv = document.getElementById("loseScore");
            newLoseDiv.innerHTML = "<p>" + gamesLost + "</p>";		
            audio_whiteWalker = new Audio('assets/sounds/breathy-monster-voice_zkKPeH4_.mp3')
            audio_whiteWalker.play();
            blurb_display.innerHTML = "<span class=\"lose-message\">YOU LOSE!  TRY AGAIN?</span><button class=\"msgbtn\" onclick=\"restart();\">YES</button>";  
          }
         else {
           blurb_display.innerHTML =  "<span class=\"whiteWlaker-message\">" + whiteWalkerMessages[whiteWalkerLevel - 1] + "</span>";
         }
     }
     else {
       var whiteWalkerScream = new Audio('assets/sounds/monster-demon-horses-scream_fy9DE2Eu.mp3');
       whiteWalkerScream.play();
      }
     
     displayString = tempstr;
     display.textContent = displayString;
   
     if (lettersToWinGame === 0) {
      userLost = true;
      gameOver = true;
      gamesWon++;
      var newWinDiv = document.getElementById("winScore");
      newWinDiv.innerHTML = "<p>" + gamesWon + "</p>";
      audio = new Audio('assets/sounds/Game_Of_Thrones_Main_Title-576202.mp3');
      audio.play();
      var message = "<span class=\"win-message\">NICE JOB!  YOU WIN!  START NEXT CHALLENGE?!</span><button class=\"msgbtn\" onclick=\"restart();\">YES</button>";
      blurb_display.innerHTML = message;
     }
     
    }
 
    restart();