var $titleInput = $('.idea-title');
var $bodyInput = $('.body');
var $saveButton = $('.save');
var idKeys = [];


$saveButton.on('click', addItemToList);

//need to get all keys out of local storage.
//idea must be removed from local storage when deleted.
//deleted idea should not appear on next page load.
//Get all keys out of local storage.
function addItemToList(event) {
  var idGen = Date.now();
  // console.log(idGen);
  var $deleteButton = $('.delete-button');
  var $title = $titleInput.val();
  var $body = $bodyInput.val();
	event.preventDefault();

		var markUp =
      `<article id=${idGen}>
		  <button class = 'delete-button'></button>
      <h2 contenteditable="true">${$title}</h2>
 		   <p contenteditable="true">${$body}</p>
 		   <button class = 'upvote-button'></button>
 		   <button class = 'downvote-button'></button>
 		   <h4>quality:<span class='quality'>swill</span></h4>
       </article>
		`;
    var $currentArticle = $(markUp);
    $('section').prepend($currentArticle);
    clearInputs();
    $currentArticle.on('click', '.delete-button', deleteButtonClicked);
		$currentArticle.on('click', '.upvote-button', upVoteClicked);
		$currentArticle.on('click', '.downvote-button', downVoteClicked);
		idKeys.push(idGen);
    localStorage.setItem(idGen, markUp);
}


$( document ).ready(function() {
	idKeys.push(localStorage.getItem(All))
  //need to get all keys out of local storage.
  
  // idKeys.forEach(function(key) {
  	var idIndex = localStorage.getItem(idKeys[0]);
  	console.log(idIndex);
    
    
  })




function upVoteClicked(event) {
	var $upvoteButton = $(event.target);
  var $currentArticle = $upvoteButton.parent();
	var $quality = $currentArticle.children('h4').children('.quality');
 	if ($quality.text() ==='swill') {
 		$quality.text('plausible');
 	} else if ($quality.text() === 'plausible') {
 		$quality.text('genius');
 	} else {
 		return
 	} 
 }

function downVoteClicked(event){
	var $downvoteButton = $(event.target);
  var $currentArticle = $downvoteButton.parent();
  var $quality = $currentArticle.children('h4').children('.quality');
 	if ($quality.text() === 'genius') {
 		$quality.text('plausible');
 	} else if ($quality.text() === 'plausible') {
 		$quality.text('swill');
 	} else {
 		return
 	} 
}

function deleteButtonClicked (event) {
	$(this).parent().remove();
}

function clearInputs() {
  event.preventDefault();
  $titleInput.val('');
  $bodyInput.val('');
}


// function Generator() {};

// Generator.prototype.rand =  Math.floor(Math.random() * 26) + Date.now();

// Generator.prototype.getId = function() {
// return this.rand++;
// };
// var idGen = new Generator();


