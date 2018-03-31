var $titleInput = $('');
var $bodyInput = $('');
var $saveButton = $('');




$saveButton.on('click', addItemToList);

function addItemToList () {
	// event.preventdefault();
	console.log($titleInput.val(), $bodyInput.val());
	
	var title = $bodyInput.val();
	var body = $titleInput.val();

// template literal

		$ideaList.prepend (
		`${title}
 		<button class = 'delete-button'> <img src = 'images.delete.svg'></button>
 		 ${body}
 		 <button class = 'upvote-button'><img src = 'images.upvote.svg'></button>
 		 <button class = 'downvote-button'><img src = 'images.downvote.svg'></button>
 		 <h4>quality: </h4>
		`)

}




function deleteButtonClicked () {
	$(this).parent().remove();
}