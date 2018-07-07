// Institute Variables

var time = 20;
var intervalId = "";
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var arrayFinder = 0;


var question01 = {
	question: "Who lives across the hall from Leonard and Sheldon?",
	answers: ["Amy Farrah Fowler", "Penny", "Leslie Winkle", "Mary Cooper"],
	values: ["incorrect", "correct", "incorrect", "incorrect"],
	correct: "Penny",
	image: "./assets/images/Q1.png"
};
var question02 = {
	question: "What happened to the elevator?",
	answers: ["Nothing, it works fine", "Leonard blew it up", "Howard tried to improve it but ending up breaking it", "The broken elevator is never explained"],
	values: ["incorrect", "correct", "incorrect", "incorrect"],
	correct: "Leonard blew it up",
	image: "./assets/images/Q2.png"
};
var question03 = {
	question: "Where does Penny work?",
	answers: ["Cracker Barrel", "Bob Evans", "Ponderosa Steakhouse", "The Cheesecake Factory"],
	values: ["incorrect", "incorrect", "incorrect", "correct"],
	correct: "The Cheesecake Factory",
	image: "./assets/images/Q3.png"
};
var question04 = {
	question: "Which two dating characters are played by actors who have played dating characters on another show?",
	answers: ["Sheldon and Amy", "Howard and Bernadette", "Leonard and Leslie", "Penny and Kurt"],
	values: ["incorrect", "incorrect", "correct", "incorrect"],
	correct: "Leonard and Leslie",
	image: "./assets/images/Q4.png"
};
var question05 = {
	question: "Which character lived with his/her mother",
	answers: ["Howard Wolowitz", "Leslie Winkle", "Amy Farrah Fowler", "Raj Koothrappali"],
	values: ["correct", "incorrect", "incorrect", "incorrect"],
	correct: "Howard Wolowitz",
	image: "./assets/images/Q5.png"
};
var question06 = {
	question: "Which character has a twin sister?",
	answers: ["Bernadette", "Penny", "Leonard", "Sheldon"],
	values: ["incorrect", "incorrect", "incorrect", "correct"],
	correct: "Sheldon",
	image: "./assets/images/Q6.png"
};
var question07 = {
	question: "Which former Star Trek actor did Sheldon have a long stand feud?",
	answers: ["LaVar Burton", "Will Wheaton", "Patrick Stewart", "Leonard Nimoy"],
	values: ["incorrect", "correct", "incorrect", "incorrect"],
	correct: "Will Wheaton",
	image: "./assets/images/Q7.png"
};
var question08 = {
	question: "Which character could not speak to Penny?",
	answers: ["Howard Wolowitz", "Leonard Hofstadter ", "Rajesh Koothrappali", "Sheldon Cooper"],
	values: ["incorrect", "incorrect", "correct", "incorrect"],
	correct: "Rejesh Koothrappalo",
	image: "./assets/images/Q8.png"
};
var question09 = {
	question: "Which of the four main male characters is the only one who does not hold a doctorate in his field?",
	answers: ["Sheldon Copper", "Leonard Hofstadter", "Howard Wolowitz", "Rajesh Koothrappali"],
	values: ["incorrect", "incorrect", "correct", "incorrect"],
	correct: "Howard Wolowitz",
	image: "./assets/images/Q9.png"
};
var question10 = {
	question: "Which season was it when Sheldon dreamt he was Smeagol from Lord of the Rings?",
	answers: ["Season 1", "Season 2", "Season 3", "Season 4"],
	values: ["incorrect", "incorrect", "correct", "incorrect"],
	correct: "Season 3",
	image: "./assets/images/Q10.png"
};


var questionsArray = [question01, question02, question03, question04, question05, question06, question07, question08, question09, question10];

// Functions

	function start () {
		$(".content-div").empty();
		var startButton = $("<button>");
		startButton.text("Start");
		startButton.addClass("start btn btn-default answerBtn");
		$(".content-div").append(startButton);
	};

	function run() {
      intervalId = setInterval(decrement, 1000);
    };

    function decrement() {
      time--;
      $(".timer-div").html("Time Remaining: " + time + " Seconds");
      if (time == 0) {
        if (arrayFinder < questionsArray.length-1) {
        	setTimeout(function () {questionWrite(questionsArray[arrayFinder])}, 2000);
        	solutionWrite(questionsArray[arrayFinder]);
	    	$(".question-div").html("Incorrect!");
        	stop();
        	unanswered++;
      	}
      	else if (arrayFinder < questionsArray.length) {
      		setTimeout(function () {endWrite(questionsArray[arrayFinder])}, 2000);
      		solutionWrite(questionsArray[arrayFinder]);
	    	$(".question-div").html("Incorrect!");
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
		$(".timer-div").html("Time Remaining: " + time + " Seconds");
		$(".question-div").empty();
		$(".content-div").empty();
		run ();
		$(".question-div").html(obj.question);
		for (var i = 0; i < obj.answers.length; i++) {
			var answerButton = $("<button>");
			answerButton.addClass("answer btn btn-default answerBtn");
			answerButton.text(obj.answers[i]);
			answerButton.attr("value", obj.values[i]);
			$(".content-div").append(answerButton);
			$(".content-div").append("<br>");
		};
	};

	function solutionWrite (obj) {
		$(".question-div").empty();
		$(".content-div").empty();
		$(".content-div").html("The correct answer was " + obj.correct + "<br>");
		var characterImage = $("<img>");
		characterImage.attr("height", "250");
		characterImage.attr("src", obj.image);
		characterImage.addClass("character")
		$(".content-div").append(characterImage);
		arrayFinder++;
	};

	function startWrite () {
		questionWrite(question01);
	};

	function answerSelect () {
		stop();
		if ($(this).attr("value") == "correct") {
			solutionWrite(questionsArray[arrayFinder]);
			$(".question-div").html("Correct!");
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
			$(".question-div").html("Incorrect!");
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
		$(".question-div").empty();
		$(".content-div").empty();
		$(".question-div").html("Here's how you did!");
		$(".content-div").html("<p> Correct: " + correct + "</p>" + "<p> Incorrect: " + incorrect + "</p>" + "<p> Unanswered: " + unanswered + "</p>");
		var resetButton = $("<button>");
		resetButton.addClass("reset btn btn-default answerBtn");
		resetButton.text("Start Over?");
		$(".content-div").append(resetButton);
	}

	function resetClick () {
		arrayFinder = 0;
		incorrect = 0;
		correct = 0;
		unanswered = 0;
		startWrite();
	}

	$(document).on("click", ".start", startWrite);

	$(document).on("click", ".answer", answerSelect);

	$(document).on("click", ".reset", resetClick);
// Running Code

start();