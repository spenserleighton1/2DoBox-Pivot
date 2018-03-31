var $titleInput = $('.idea-title');
var $bodyInput = $('.body');
var $saveButton = $('.save');

$saveButton.on('click', addItemToList);

function addItemToList(event) {
  var $deleteButton = $('.delete-button');
  var $title = $titleInput.val();
  var $body = $bodyInput.val();
	event.preventDefault();

// template literal

		$('section').prepend (
      `<article>
		  <button class = 'delete-button'></button>
      <h2>${$title}</h2>
 		   <p>${$body}</p>
 		   <button class = 'upvote-button'></button>
 		   <button class = 'downvote-button'></button>
 		   <h4>quality: </h4>
       </article>
		`)
    $('article').on('click', '.delete-button', deleteButtonClicked);
    clearInputs();
}

function deleteButtonClicked (event) {
	$(this).parent().remove();
}

function clearInputs() {
  event.preventDefault();
  $titleInput.val('');
  $bodyInput.val('');
}

