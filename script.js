var $titleInput = $('.idea-title');
var $bodyInput = $('.body');
var $saveButton = $('.save');
//   var markUp = buildMarkup(toDoItem)
$saveButton.on('click', saveToDo);
$('section').on('click', '.delete-button', deleteButtonClicked);
$('section').on('click', '.upvote-button', upVoteClicked);
$('section').on('click', '.downvote-button', downVoteClicked);
$('section').on('keyup', '.title', editTitle);
$('section').on('keyup', '.body-content', editBody);
$('.search').on('keyup', filterToDo);

function toDo(title, body, id) {
  this.title = title;
  this.body = body; 
  this.quality = 'normal';
  this.id = id;
}

function filterToDo(){
var searchInput = $('.search').val().toLowerCase();
$('article').filter(function (){
  $(this).toggle($(this).text().indexOf(searchInput) > -1);
  })
}

function saveToDo(toDoItem) {
     event.preventDefault();
     var toDoItem = new toDo($titleInput.val(), $bodyInput.val(), $.now());
     prependToDo(toDoItem);
     toStorage(toDoItem);
     clearInputs();
};
function prependToDo(toDoItem){
  $('section').prepend(
     `<article id=${toDoItem.id}>
      <button class = 'delete-button'></button>
      <h2 class="title" contenteditable>${toDoItem.title}</h2>
       <p class="body-content" contenteditable>${toDoItem.body}</p>
       <button class = 'upvote-button' aria-label='upvote'></button>
       <button class = 'downvote-button' aria-label = 'downvote' ></button>
       <h4>Importance: <span class='quality' role='quality'>${toDoItem.quality}</span></h4>
       <hr>
       </article>`)
}
function toStorage(toDoItem){
  var stringifyToDo = JSON.stringify(toDoItem);
  localStorage.setItem(toDoItem.id, stringifyToDo)
}
function fromStorage(){
for (var i = 0; i < localStorage.length; i++){
  var object = getObject(localStorage.key(i));
  prependToDo(object)
  }
}

function getObject(id) {
  var retrievedToDo = localStorage.getItem(id);
  var toDoItem = JSON.parse(retrievedToDo);
  return toDoItem;
}
$(window).on('load', function() {
fromStorage();
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
  var importance = ['none','low','normal','high','critical'];
  var $currentArticle = $(event.target).parent();
  var id =$(this).parent().attr('id');
  var retrievedToDo = getObject(id);
  var $quality = $currentArticle.children('h4').children('.quality');
  var i = importance.indexOf(retrievedToDo.quality);
  if (i < 4){
  retrievedToDo.quality = importance[i+1];
  $quality.text(importance[i+1]);
  toStorage(retrievedToDo);}
 };

//fixed//
function downVoteClicked(event){
  var importance = ['none','low','normal','high','critical'];
  var $downvoteButton = $(event.target);
  var $currentArticle = $downvoteButton.parent();
  var id =$(this).parent().attr('id');
  var retrievedToDo = getObject(id);
  var $quality = $currentArticle.children('h4').children('.quality');
  var i = importance.indexOf(retrievedToDo.quality);
  if (i > 0){
  retrievedToDo.quality = importance[i-1];
  $quality.text(importance[i-1]);
  toStorage(retrievedToDo);}
}

//fixed//
function deleteButtonClicked (event) {
    $(this).parent().remove();
  localStorage.removeItem($(this).closest('article').attr('id'));
}

//fixed//
function editTitle (event) {
  var title = this.innerText;
  var id =$(this).parent().attr('id');
  var retrievedToDo = getObject(id);
  retrievedToDo.title = title;
  toStorage(retrievedToDo);
}

function editBody (event) {
  var body = this.innerText;
  var id =$(this).parent().attr('id');
  var retrievedToDo = getObject(id)
  retrievedToDo.body = body;
  toStorage(retrievedToDo);

}
function clearInputs() {
  event.preventDefault();
  $titleInput.val('');
  $bodyInput.val('');
}