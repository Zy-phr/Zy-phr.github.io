// Institute Variables

var time = 20;
var intervalId = "";
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var arrayFinder = 0;


var question01 = {
	question: "WHO LIVES ACROSS THE HALL FROM LEONARD AND SHELDON?",
	answers: ["AMY FARRAH FOWLER", "PENNY", "LESLIE WINKLE", "MARY COOPER"],
	values: ["incorrect", "correct", "incorrect", "incorrect"],
	correct: "PENNY",
	image: "./assets/images/Q1.png"
};
var question02 = {
	question: "WHO BROKE THE ELEVATOR IN LEONARD AND SHELDON'S BUILDING?",
	answers: ["HOWARD WOLOWITZ", "LEONARD HOFSTADTER", "RAJESH KOOTHRAPPALI", "SHELDON COOPER"],
	values: ["incorrect", "correct", "incorrect", "incorrect"],
	correct: "LEONARD BLEW IT UP",
	image: "./assets/images/Q2.png"
};
var question03 = {
	question: "WHERE DOES PENNY WORK WHEN SHE'S NOT ACTING?",
	answers: ["CRACKER BARREL", "BOB EVANS", "PONDEROSA STEAKHOUSE", "THE CHEESECAKE FACTORY"],
	values: ["incorrect", "incorrect", "incorrect", "correct"],
	correct: "THE CHEESECAKE FACTORY",
	image: "./assets/images/Q3.png"
};
var question04 = {
	question: "WHICH TWO CHARACTERS PLAYED DATING CHARACTERS ON ANOTHER SHOW?",
	answers: ["SHELDON AND AMY", "HOWARD AND BERNADETTE", "LEONARD AND LESLIE", "PENNY AND KURT"],
	values: ["incorrect", "incorrect", "correct", "incorrect"],
	correct: "LEONARD AND LESLIE",
	image: "./assets/images/Q4.png"
};
var question05 = {
	question: "WHICH OF THE CHARACTERS LIVED WITH HIS/HER MOTHER?",
	answers: ["HOWARD WOLOWITZ", "LESLIE WINKLE", "AMY FARRAH FOWLER", "RAJESH KOOTHRAPPALI"],
	values: ["correct", "incorrect", "incorrect", "incorrect"],
	correct: "HOWARD WOLOWITZ",
	image: "./assets/images/Q5.png"
};
var question06 = {
	question: "WHICH OF THE CHARACTERS HAS AN EXCPECTED TWIN SISTER?",
	answers: ["BERNADETTE ROSTENKOWSKI", "PENNY", "LEONARD HOFSTADTER", "SHELDON COOPER"],
	values: ["incorrect", "incorrect", "incorrect", "correct"],
	correct: "SHELDON COOPER",
	image: "./assets/images/Q6.png"
};
var question07 = {
	question: "WHICH FORMER STAR TREK ACTOR DID SHELDON HAVE A LONG TIME FEUD WITH?",
	answers: ["LAVAR BURTON", "WILL WHEATON", "PATRICK STEWART", "LEONARD NIMOY"],
	values: ["incorrect", "correct", "incorrect", "incorrect"],
	correct: "WILL WHEATON",
	image: "./assets/images/Q7.png"
};
var question08 = {
	question: "WHICH OF THE CHARACTERS COULD NOT SPEAK TO PENNY?",
	answers: ["HOWARD WOLOWITZ", "LEONARD HOFSTADTER", "RAJESH KOOTHRAPPALI", "SHELDON COOPER"],
	values: ["incorrect", "incorrect", "correct", "incorrect"],
	correct: "REJESH KOOTHRAPPALI",
	image: "./assets/images/Q8.png"
};
var question09 = {
	question: "WHICH CHARACTER DOES NOT HOLD A DOCTORATE IN HIS FIELD?",
	answers: ["SHELDON COPPER", "LEONARD HOFSTADTER", "HOWARD WOLOWITZ", "RAJESH KOOTHRAPPALI"],
	values: ["incorrect", "incorrect", "correct", "incorrect"],
	correct: "HOWARD WOLOWITZ",
	image: "./assets/images/Q9.png"
};
var question10 = {
	question: "WHICH SEASON WAS IT WHEN SHELDON DREAMT HE WAS SMEAGOL FROM LORD OF THE RINGS?",
	answers: ["SEASON 1", "SEASON 2", "SEASON 3", "SEASON 4"],
	values: ["incorrect", "incorrect", "correct", "incorrect"],
	correct: "SEASON 3",
	image: "./assets/images/Q10.png"
};


var questionsArray = [question01, question02, question03, question04, question05, question06, question07, question08, question09, question10];

var mainImage = ["./assets/images/BBT.png"]
var titleImage = new Image();
titleImage.src = mainImage;

var images = ["./assets/images/BBT1.jpg", "./assets/images/BBT2.jpg", "./assets/images/BBT3.jpg", "./assets/images/BBT4.jpg", "./assets/images/BBT5.jpg", "./assets/images/BBT6.jpg", "./assets/images/BBT7.jpg", "./assets/images/BBT8.jpg", "./assets/images/BBT9.jpg", "./assets/images/BBT10.jpg", "./assets/images/BBT11.jpg"];
var index = 0;
var myImage = new Image();
myImage.src = images[index];

// document.body.appendChild(myImage);


// Functions

	function start () {
		$(".content-div").html("HOW WELL DO YOU KNOW THE BIG BANG THEORY...<br> THINK YOU'RE THE ULTIMATE SUPERFAN...<br> THEN TEST YOUR KNOWLEDGE...<br>  PLAY THIS TRIVIA GAME...<br> LETS SEE HOW YOU STACK UP");
		$(".question-div").html("DO WE SHARE A COMMON INTEREST?");
		$(".start-div").show();
		$(".timer-div").hide();
		var startButton = $("<button>");
		startButton.text("START");
		startButton.css({'font-weight':'bold'})
		startButton.addClass("start btn btn-default answerBtn");
		$(".start-div").append(startButton);
		$(".picture-div").append(titleImage);

	};

	function run() {
		$(".content-div").show();
		$(".question-div").show();
		$(".timer-div").show();
		$(".start-div").empty();
		$(".start-div").hide();
		intervalId = setInterval(decrement, 1000);
	};
	
    function decrement() {
      time--;
	  $(".timer-div").html("TIME REMAINING: " + time + " SECONDS");
	 
      if (time == 0) {
        if (arrayFinder < questionsArray.length-1) {
        	setTimeout(function () {questionWrite(questionsArray[arrayFinder])}, 2000);
        	solutionWrite(questionsArray[arrayFinder]);
	    	$(".question-div").html("INCORRECT!");
        	stop();
        	unanswered++;
      	}
      	else if (arrayFinder < questionsArray.length) {
      		setTimeout(function () {endWrite(questionsArray[arrayFinder])}, 2000);
      		solutionWrite(questionsArray[arrayFinder]);
	    	$(".question-div").html("INCORRECT!");
        	stop();
        	unanswered++;
      	}
      };
	};
	


    function stop() {
	  clearInterval(intervalId);
    };

	function questionWrite (obj) {
		time = 20;
		$(".timer-div").empty();
		$(".timer-div").html("TIME REMAINING: " + time + " SECONDS");
		$(".question-div").empty();
		$(".content-div").empty();
		$(".picture-div").empty();
		// $(".picture-div").append(myImage);
		run ();
		index += 1;
		if (index === 11) {
			index = 0;
		}
		var myImage = new Image();
		myImage.src = images[index];
		$(".picture-div").append(myImage);
		$(".picture-div").empty(myImage);
		$(".picture-div").append(myImage);
		$(".question-div").html(obj.question);
		
		for (var i = 0; i < obj.answers.length; i++) {
			var answerButton = $("<button>");
			answerButton.addClass("answer btn btn-default answerBtn");
			answerButton.text(obj.answers[i]);
			answerButton.attr("value", obj.values[i]);
			answerButton.css({'font-weight':'bold'});
			$(".content-div").append(answerButton);
			$(".content-div").append("<br>");
		};
	};

	// setInterval(function(picslide) {
	// 	index += 1;
	// 	if (index === 6) {
	// 		index = 0;
	// 	}
	// 	var myImage = new Image();
	// 	myImage.src = images[index];
	// 	$(".picture-div").append(myImage);
	// 	$(".picture-div").empty(myImage);
	// 	$(".picture-div").append(myImage);

	// }, 4000);

	function solutionWrite (obj) {
		$(".question-div").empty();
		$(".content-div").empty();
		$(".start-div").show();
		$(".start-div").html("THE CORRECT ANSWER WAS " + obj.correct + "<br>");
		$(".picture-div").empty();
		$(".content-div").hide();
		var characterImage = $("<img>");
		characterImage.attr("width", "50");
		characterImage.attr("src", obj.image);
		characterImage.addClass("character");
			setTimeout(function(picslide) {2000});
		$(".picture-div").append(characterImage);
		arrayFinder++;
	};

	function startWrite () {
		questionWrite(question01);
	};

	function answerSelect () {
		stop();
		if ($(this).attr("value") == "correct") {
			solutionWrite(questionsArray[arrayFinder]);
			$(".question-div").html("CORRECT!");
			correct++;
			if (arrayFinder < questionsArray.length) {
				setTimeout(function () {questionWrite(questionsArray[arrayFinder])}, 2000);
			}
			else if (arrayFinder < questionsArray.length+1) {
		        setTimeout(function () {endWrite(questionsArray[arrayFinder])}, 2000);
      		}
		}
		else if ($(this).attr("value") == "incorrect") {
			solutionWrite(questionsArray[arrayFinder]);
			$(".question-div").html("INCORRECT!");
			incorrect++;
			if (arrayFinder < questionsArray.length) {
				setTimeout(function () {questionWrite(questionsArray[arrayFinder])}, 2000);
			}
			else if (arrayFinder < questionsArray.length+1) {
		        setTimeout(function () {endWrite(questionsArray[arrayFinder])}, 2000);
      		}
		}
	};

	function endWrite () {
		$(".picture-div").empty();
		$(".question-div").empty();
		$(".content-div").empty();
		$(".start-div").empty();
		$(".content-div").show();
		$(".picture-div").append(myImage);
		$(".question-div").html("FINISHED! <BR> NOW LETS SEE HOW YOU DID!");
		$(".content-div").html("<br>" + "<p> CORRECT: " + correct + "</p>" + "<p> INCORRECT: " + incorrect + "</p>" + "<p> UNANSWERED: " + unanswered + "</p>" + "<br>");
		var resetButton = $("<button>");
		resetButton.addClass("reset btn btn-default answerBtn");
		resetButton.text("START OVER?");
		resetButton.css({'font-weight':'bold'});
		$(".start-div").show();
		$(".start-div").append(resetButton);
		$(".timer-div").hide();
	}

	function resetClick () {
		arrayFinder = 0;
		incorrect = 0;
		correct = 0;
		unanswered = 0;
		startWrite();
		$(".start-div").empty();
	}

	$(document).on("click", ".start", startWrite);

	$(document).on("click", ".answer", answerSelect);

	$(document).on("click", ".reset", resetClick);
// Running Code

start();