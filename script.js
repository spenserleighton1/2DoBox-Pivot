var $titleInput = $('.idea-title');
var $bodyInput = $('.body');
var $saveButton = $('.save');

$saveButton.on('click', addItemToList);
$('section').on('click', '.delete-button', deleteButtonClicked);
$('section').on('click', '.upvote-button', upVoteClicked);
$('section').on('click', '.downvote-button', downVoteClicked);

function buildMarkup(idGen, title, body) {
     return `<article id=${idGen}>
      <button class = 'delete-button'></button>
      <h2>${title}</h2>
       <p>${body}</p>
       <button class = 'upvote-button' aria-label='upvote'></button>
       <button class = 'downvote-button' aria-label = 'downvote' ></button>
       <h4>quality:<span class='quality' role='quality'>swill</span></h4>
       <hr>
       </article>`
};

function addItemToList(event) {
  var idGen = Date.now();
  var $deleteButton = $('.delete-button');
  var $title = $titleInput.val();
  var $body = $bodyInput.val();
	event.preventDefault();
	var markUp = buildMarkup(idGen, $title, $body)
  var $currentArticle = $(markUp);
  $('section').prepend($currentArticle);
  clearInputs();
  localStorage.setItem(idGen, markUp);
};

$( document ).ready(function(event) {
  for(var i = 0; i < localStorage.length; i++){
  $('section').append(localStorage.getItem(localStorage.key(i)));
  }  

$('h2').on('click',function(event) {
  var key1 = localStorage.getItem(localStorage.key($(this).parent().attr('id')));
  console.log(key1);
  var newText = $(this).text();
  var addInput = `<input type="text" value=${newText} class="changeTitle">`;
  if ($(this).children().length === 0) {
    $(this).text('');
    $(this).append(addInput);
    $(this).children().focus();
    var key = $(this).parent().attr('id');
    updateTitle(key);
  } else {
    return
  }

});

function updateTitle(key) {
  $('.changeTitle').on('blur',function(event) {
  var title = $(this).val();
  var body = $(this).parent().siblings('p');
  var markUp = buildMarkup(key, title, body);
  localStorage.setItem(key, markUp);
  });
}

$('p').on('click', function(event) {
  var newText = $(this).text();
  var addInput = `<input type="text" value=${newText} class="changeContent">`;
   if ($(this).children().length === 0) {
    $(this).text('');
    $(this).append(addInput);
    $(this).children().focus();
    var key = $(this).parent().attr('id');
    updateBody(key);
  } else {
    return
  }
  });

function updateBody(key) {
  $('.changeContent').on('blur', function(event) {
  var body = $(this).val();
  var title = $(this).parent().siblings('h2');
  var markUp = buildMarkup(key, title, body);
  localStorage.setItem(key, markUp);
  })
}
});

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
