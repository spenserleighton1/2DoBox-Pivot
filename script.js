var $titleInput = $('.idea-title');
var $bodyInput = $('.body');
var $saveButton = $('.save');

$saveButton.on('click', addItemToList);
$('section').on('click', '.delete-button', deleteButtonClicked);
$('section').on('click', '.upvote-button', upVoteClicked);
$('section').on('click', '.downvote-button', downVoteClicked);

//save editable fields.
//add aria label to inputs.
//Need to do DTR.
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
    // $currentArticle.on('click', '.delete-button', deleteButtonClicked);
		// $currentArticle.on('click', '.upvote-button', upVoteClicked);
		// $currentArticle.on('click', '.downvote-button', downVoteClicked);
    localStorage.setItem(idGen, markUp);
}

$( document ).ready(function(event) {
  for(var i =0; i < localStorage.length; i++){
  $('section').append(localStorage.getItem(localStorage.key(i)));
  }  
})

function saveUserEdits() {
  var getIdea = localStorage.getItem(JSON.parse(key(0)));
  return getIdea;

}


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

function deleteButtonClicked (event, idGen) {
	$(this).parent().remove();
  localStorage.removeItem(localStorage.key(idGen));
}

function clearInputs() {
  event.preventDefault();
  $titleInput.val('');
  $bodyInput.val('');
}



