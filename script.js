var $titleInput = $('.idea-title');
var $bodyInput = $('.body');
var $saveButton = $('.save');
//   var markUp = buildMarkup(toDoItem)
$saveButton.on('click', saveToDo);
$('section').on('click', '.delete-button', deleteButtonClicked);
$('section').on('click', '.upvote-button', upVoteClicked);
$('section').on('click', '.downvote-button', downVoteClicked);


function toDo(title, body, id) {
  this.title = title;
  this.body = body; 
  this.quality = ' swill';
  this.id = id;
}

function saveToDo(toDoItem) {
     event.preventDefault();
     var toDoItem = new toDo($titleInput.val(), $bodyInput.val(), $.now())
     prependToDo(toDoItem)
     toStorage(toDoItem)
};

function prependToDo(toDoItem){
  $('section').prepend(
     `<article id=${toDoItem.id}>
      <button class = 'delete-button'></button>
      <h2 contenteditable>${toDoItem.title}</h2>
       <p contenteditable>${toDoItem.body}</p>
       <button class = 'upvote-button' aria-label='upvote'></button>
       <button class = 'downvote-button' aria-label = 'downvote' ></button>
       <h4>quality:<span class='quality' role='quality'>${toDoItem.quality}</span></h4>
       <hr>
       </article>`)
}



function toStorage(toDoItem){
  var stringifyToDo = JSON.stringify(toDoItem);
  localStorage.setItem(toDoItem, stringifyToDo)
}

function fromStorage(){
  localStorage.forEach(function(toDoItem) {
  var retrievedToDo = localStorage.getItem(toDoItem);
  var parsedToDo = JSON.parse(retrievedToDo);
  })

  prependToDo(ParsedToDo);
  debugger;
}

$(window).on('load', function() {
fromStorage()
  });

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
  }
  });

function updateBody(key) {
  $('.changeContent').on('blur', function(event) {
  var body = $(this).val();
  var title = $(this).parent().siblings('h2');
  var markUp = buildMarkup(key, title, body);
  localStorage.setItem(key, markUp);
  })

};

function upVoteClicked(event) {
	var $upvoteButton = $(event.target);
  var $currentArticle = $upvoteButton.parent();
	var $quality = $currentArticle.children('h4').children('.quality');
 	if ($quality.text() ==='swill') {
 		$quality.text('plausible');
 	} else if ($quality.text() === 'plausible') {
 		$quality.text('genius');
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
 	}
}

function deleteButtonClicked (event, idGen) {
	$(this).parent().remove();
  localStorage.removeItem(localStorage.key(toDoItem.id));
}

function clearInputs() {
  event.preventDefault();
  $titleInput.val('');
  $bodyInput.val('');
}
