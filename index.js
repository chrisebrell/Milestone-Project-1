function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex= 0;
}

Quiz.prototype.guess = function(answer) {
    if(this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
};

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};

var QuizUI = {
    displayNext: function () {
        if (quiz.hasEnded()) {
            this.displayScore();
        } else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion: function() {
        this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;

        for(var i = 0; i < choices.length; i++) {
            this.populateIdWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess" + i, choices[i]);
        }
    },
    displayScore: function() {
        var gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2> Your score is: " + quiz.score + " / 5 </h2>";
        gameOverHTML += '<button type = "button" class = "restart" onclick = "window.location.reload()">Restart</button>';
        this.populateIdWithHTML("quiz", gameOverHTML);
    },

    populateIdWithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function () {
            quiz.guess(guess);
            QuizUI.displayNext();
        }
    },

    displayProgress: function() {
        var currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateIdWithHTML("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
    }
};

var questions = [
    new Question("Who did the Carolina Panthers select with the first overall pick in the 2023 NFL Draft?", [ "Anthony Richardson", "Bryce Young", "Bijan Robinson", "C.J. Stroud" ],
    "Bryce Young"),
    new Question("Who is the current head coach for the Carolina Hurricanes?", [ "Jon Cooper", "Paul Maurice", "Rod Brind'Amour", "Peter Laviolette" ],
    "Rod Brind'Amour"),
    new Question("What year did Michael Jordan become a majority owner of the Charlotte Hornets?", [ "2008", "2009", "2010", "2013" ],
    "2010"),
    new Question("Which of the following NBA stars attended Duke University?", [ "Kyrie Irving", "Kevin Durant", "Jimmy Butler", "Stephen Curry" ], 
    "Kyrie Irving"),
    new Question("Which Carolina Hurricane recently signed an eight-year contract worth $78M in July?", [ "Andrei Svechnikov", "Martin Necas", "Jacob Slavin", "Sebastian Aho" ], 
    "Sebastian Aho")
];

var quiz = new Quiz(questions);

QuizUI.displayNext();

