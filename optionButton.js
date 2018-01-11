var saveChange = document.getElementById("change");
var returnToMenu = document.getElementById("return");

saveChange.addEventListener("click", save);
returnToMenu.addEventListener("click", menu);

function save() {
	trueValue = value;
	console.log(trueValue);
	localStorage.setItem("numberOfQuestions", trueValue);
	location.href = "index.html";
}

function menu() {
	location.href = "index.html";
}
