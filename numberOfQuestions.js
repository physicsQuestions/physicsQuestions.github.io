var trueValue = 3;
var value = 3;
var oldValue = 3;
if(localStorage.getItem("numberOfQuestions")) {
	trueValue = parseInt(localStorage.getItem("numberOfQuestions"));
	value = parseInt(localStorage.getItem("numberOfQuestions"));
	oldValue = parseInt(localStorage.getItem("numberOfQuestions"));
}