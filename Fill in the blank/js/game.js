var correctAnswer;
var questionCounter = 0;
var mistakes = 0;

var wrongPictures = ["frustratedface.png","lolface.png","thumbsdown.jpg"];
var correctPictures = ["thumbsup.jpg","gentlemanface.png","happyface.png", "thuglife.png"];

var questions = [	
					['___ you hungry?', ['Are','Am','Is','Ooh'], 'veryhungry.jpg' ] ,
					//['He ___ very hungry.', ['is','are','am','be'], 'hungrypeople.jpg' ] ,		
					
					//['___ are going to the beach.', ['They','He','She','I'], 'goingbeach.jpg' ],
					['___ are going to the beach.', ['We','He','I','Goat'], 'goingbeach.jpg' ],
					
					['Is ___ eating a chair.', ['John','we','you','yes'], 'bitechair.jpg' ],
					//['___ are eating a chair.', ['We','He','I','She'], 'bitechair.jpg' ],
					
					['Batman ___ a building.', ['has','have','is','am'], 'climbbuilding.jpg' ],
					
					//['We are ___ around.', ['running','runs','run','will run'], 'runningaround.jpg' ],
					
					//['Andre ___ a dog.', ['has','have','am','baby'], 'girlanddog.jpg' ],
					['Did we ___ a dog?', ['have','has','am','sit'], 'familydog.jpg' ],
					
					['They ___ lots of pencils.', ['have','am','has','is'], 'pencils.jpg' ],
					
					['Do ___ have long hair?', ['They','He','She','Sally'], 'hippies.jpg' ],
					['___ I ugly?', ['Am','Are','Is','Very'], 'uglymonkey.jpg' ],
					['The English teachers ___ very scary.', ['are','is','be','am'], 'beautifulteacher.jpg' ],
					
					['Captain America ___ very strong.', ['is','are','am','be'], 'captainamerica.jpg' ],					
					['The Avengers ___ coming to help!', ['are','is','am','be'], 'hulk.jpg' ],
					['I ___ Ironman.', ['am','is','are','kicking'], 'ironman.jpg' ],
					['___ Moana very brave?', ['Is','Am','Are','Be'], 'moana.jpg' ],
					['Do you ___ a Pickachu?', ['have','has','am','punch'], 'pickachu.jpg' ],
					['Maui! Help me!', ['command','exclamation','Heihei','question'], 'maui.jpg' ],
					['Which pokemon ___ the best?', ['is','will','am','be'], 'pokemon.jpg' ],
				];

function initNextQuestion(question, answers, imgUrl) {
		
	correctAnswer = answers[0];
	
	/* initiate values */
	answers = shuffleArray(answers);	
	$('#question').html(question);
	if(imgUrl)
	$('#imgSpot').html('<br><img class="addImg" src="img/'+imgUrl+'">');
	
	$('#answerContainer').html('');
	
	answers.forEach(function(answer) {
		$('#answerContainer').append('<div class="answerButton" onclick="evaluateAnswer(this)">' +
										'<h2>' + answer + '</h2>'+
									 '</div>');
	});	
}

function evaluateAnswer(answerDiv) {
	
	var selectedAnswer = $(answerDiv).find('h2').html();
	
	if(selectedAnswer === correctAnswer){
		
		questionCounter++;
		if( questionCounter < questions.length ){
			if( questions[questionCounter][2]){
				showThumbsUpLightBox();
				initNextQuestion( questions[questionCounter][0], questions[questionCounter][1], questions[questionCounter][2] );
			}else{	
				showThumbsUpLightBox();			
				initNextQuestion( questions[questionCounter][0], questions[questionCounter][1] );
			}
		}else{
			alert(mistakes + ' mistake(s)'); 
		}
	}
	else{
		showThumbsDownLightBox();		
		mistakes++;
	}	
}

function shuffleArray(array) {
	
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
	
    return array;
}

function showThumbsUpLightBox(){
	$("#correctSound")[0].play();
	var selectedPicture = correctPictures[Math.floor(Math.random()*correctPictures.length)];
	$("#thumbsUpLightBox img").attr("src", "img/" + selectedPicture); 
	$("#thumbsUpLightBox").show();
}

function hideThumbsUpLightBox(){
	$("#thumbsUpLightBox").hide();
}

function showThumbsDownLightBox(){
	$("#incorrectSound")[0].play();
	var selectedPicture = wrongPictures[Math.floor(Math.random()*wrongPictures.length)];
	$("#thumbsDownLightBox img").attr("src", "img/" + selectedPicture); 
	$("#thumbsDownLightBox").show();
}

function hideThumbsDownLightBox(){
	$("#thumbsDownLightBox").hide();
}

$(document).ready(function() {	
	
	questions = shuffleArray(questions);	
	if( questions[questionCounter][2]){
		initNextQuestion( questions[questionCounter][0], questions[questionCounter][1], questions[questionCounter][2] );
	}else{		
		initNextQuestion( questions[questionCounter][0], questions[questionCounter][1] );
	}
	
})