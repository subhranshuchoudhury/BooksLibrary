var apiResponse;
var finalData;
var buttons = document.querySelectorAll("button");
var subjectButton = document.querySelectorAll(".subjectButton");
var excerciseButton = document.querySelectorAll(".excerciseButton");
const excerciseList = document.querySelector("#excerciseList");
const pdfViewer = document.querySelector(".pdfViewer");
const buttonClassContainer = document.querySelector(".classListContainer");
const subjectList = document.querySelector(".subjectList");
const classListContainer = document.querySelector(".classListContainer");
const subjectListContainer = document.querySelector(".subjectListContainer");
const excerciseListContainer = document.querySelector(".excerciseListContainer");
//******************************************

subjectListContainer.style.display = "none";
excerciseListContainer.style.display = "none";
pdfViewer.style.display = "none";

fetch("https://raw.githubusercontent.com/subhranshuchoudhury/BooksLibrary/main/data.json")
	.then(response=>{
		apiResponse = response;
		document.querySelector("#statusNet").innerHTML = `Status: ${response.statusText}<br> Code: ${response.status}<br>Loading...`
		return response.json();
	})
	.then(data=>{
		if (apiResponse.statusText == "OK") {
		document.querySelector("#statusNet").innerHTML = "RELOAD";

	}else {
		document.querySelector("#statusNet").innerHTML = "api key error!";
		
	}
		finalData = data;
		dataReady(data)
	})


function dataReady(data) {
	for(let i=0;i<data[0].class.length;i++){
		createClass(i);
	}

	classReady()
}

function classReady() {
	buttons = document.querySelectorAll("button");
	for(let i=0;i<finalData[0].class.length;i++){
		buttons[i].addEventListener("click",function(event){
			console.log("Class button: "+event.target.className+" clicked!");
			subjectReady(event.target.className)

		})

	}

}

function subjectReady(ClassIndex) {

	for(let i=0;i<finalData[0].class[ClassIndex].subjects.length;i++){
		subjectListContainer.style.display = "";
		classListContainer.style.display = "none";
		createSubject(ClassIndex,i);
	}
		activeSubjectButton(ClassIndex);

	
}

function activeSubjectButton(ClassIndex) {
	subjectButton = document.querySelectorAll(".subjectButton");
	for(let i=0;i<finalData[0].class[ClassIndex].subjects.length;i++){
		subjectButton[i].addEventListener("click",function(event){
			console.log("Subject clicked: "+i)
			excerciseReady(ClassIndex,i);
		})
	}

	
}

function excerciseReady(ClassIndex,subjectIndex) {
	for(let i=0;i<finalData[0].class[ClassIndex].subjects[subjectIndex].excercise.length;i++){
		classListContainer.style.display = "none";
		subjectListContainer.style.display = "none";
		excerciseListContainer.style.display = "";
		createExcercise(ClassIndex,subjectIndex,i)
	}
	activeExcerciseButton(ClassIndex,subjectIndex);
	
}



function activeExcerciseButton(ClassIndex,subjectIndex) {
	excerciseButton = document.querySelectorAll(".excerciseButton")
	for(let i=0;i<finalData[0].class[ClassIndex].subjects[subjectIndex].excercise.length;i++){
		excerciseButton[i].addEventListener("click",function(event) {
			console.log("Excercise Clicked: "+i)
			pdfShow(event.target.id);
		})
	}
}

function pdfShow(source) {
	pdfViewer.style.display = "";
	document.querySelector(".logo-container").style.display = "none";
	excerciseListContainer.style.display = 'none';
	const node = document.createElement("iframe");
	node.setAttribute("src",`${source}`);
	node.setAttribute("width","640");
	node.setAttribute("height","480");
	pdfViewer.appendChild(node);
}


/***** GOD AREA **********/

function createExcercise(ClassIndex,subjectIndex,excerciseIndex) {
	const node = document.createElement("li");
	node.setAttribute("class","excerciseButton");
	node.setAttribute("id",`${finalData[0].class[ClassIndex].subjects[subjectIndex].excercise[excerciseIndex].pdf}`)
	node.innerHTML = `Excercise: ${finalData[0].class[ClassIndex].subjects[subjectIndex].excercise[excerciseIndex].exName} [${finalData[0].class[ClassIndex].subjects[subjectIndex].subName}]`
	excerciseList.appendChild(node);
}

function createClass(ClassIndex) {
	const node = document.createElement("button");
	node.innerHTML = `Class: ${finalData[0].class[ClassIndex].className}`;
	node.setAttribute("class",`${ClassIndex}`);
	buttonClassContainer.appendChild(node);

}

function createSubject(ClassIndex,subjectIndex) {
	const node = document.createElement("li");
	node.innerHTML = `${finalData[0].class[ClassIndex].subjects[subjectIndex].subName} [CLASS ${finalData[0].class[ClassIndex].className}]`;
	node.setAttribute("class",`subjectButton`);
	subjectList.appendChild(node);

}

function reload() {
	console.log("RELOAD!!")
	location.reload();	
}

function books() {
	alert("Sorry!\nCurrently no books available.\nContact: +918249587552");
}

// Link
/*
<iframe src="https://drive.google.com/file/d/1SkF5hFoYY0Chpq-zXNOvkDbxoBh6hOug/preview" width="640" height="480" allow="autoplay"></iframe>

*/
