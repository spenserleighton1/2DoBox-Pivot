var $titleInput = $('.idea-title');
var $bodyInput = $('.body');
var $saveButton = $('.save');


$saveButton.on('click', addItemToList);

function addItemToList(event) {
  var $deleteButton = $('.delete-button');
  var $title = $titleInput.val();
  var $body = $bodyInput.val();
	event.preventDefault();

		$('section').prepend (
      `<article>
		  <button class = 'delete-button'></button>
      <h2>${$title}</h2>
 		   <p>${$body}</p>
 		   <button class = 'upvote-button'></button>
 		   <button class = 'downvote-button'></button>
 		   <h4>quality:<span class='quality'>swill</span></h4>
       </article>
		`)
    $('article').on('click', '.delete-button', deleteButtonClicked);
    clearInputs();
		$('article').on('click', '.upvote-button', upVoteClicked);
		$('article').on('click', '.downvote-button', downVoteClicked);
}
function upVoteClicked() {
	var $upvoteButton = $('.upvote-button')
	var $quality = $('.quality');
 	if ($quality.text() ==='swill') {
 		$quality.text('plausible');
 	} else if ($quality.text() === 'plausible') {
 		$quality.text('genius');
 	} else {
 		return
 	} 
 }



 

function downVoteClicked(){
	var $downvoteButton = $('.downvote-button')
	var $quality = $('.quality')

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

