$('.show-completed').on('click', showCompleted)
$('.save-btn').on('click', saveToDo)
$('section').on('click', '.delete-btn', deleteClicked);
$('section').on('click', '.upvote-btn', upVoteClicked);
$('section').on('click', '.downvote-btn', downVoteClicked);
$('section').on('keyup', '.todo-title', editTitle);
$('section').on('keyup', '.body-content', editBody);
$('.filter').on('keyup', filterToDo);
$('section').on('click', '.completed-btn', markCompleted)

$(window).on('load', function() {
    fromStorage();
});

function toDo(title, body, id) {
    this.title = title;
    this.body = body;
    this.quality = 'normal';
    this.id = id;
    this.completed = false;
}

function saveToDo(toDoItem) {
    event.preventDefault();
    var $bodyInput = $('.body');
    var $titleInput = $('.todo-title');
    var toDoItem = new toDo($titleInput.val(), $bodyInput.val(), $.now());
    createToDo(toDoItem);
    toStorage(toDoItem);
    clearInputs();
};

function createToDo(toDoItem, className) {
    $('section').prepend(
        `<article class=${className} id=${toDoItem.id}>
     <button class = 'delete-btn'></button>
     <button class ='completed-btn' aria-label='completed'>completed</button>
     <h2 class='todo-title' contenteditable>${toDoItem.title}</h2>
     <p class="body-content" contenteditable>${toDoItem.body}</p>
     <button class ='upvote-btn' aria-label='upvote'></button>
     <button class ='downvote-btn' aria-label='downvote'></button>
     <h4>Importance: <span class='quality' role='quality'>${toDoItem.quality}</span></h4>
     <hr>
     </article>`)
};

function toStorage(toDoItem) {
    var stringifyToDo = JSON.stringify(toDoItem);
    localStorage.setItem(toDoItem.id, stringifyToDo);
};

function fromStorage() {
    for (var i = 0; i < localStorage.length; i++) {
        var object = getObject(localStorage.key(i));
        if (object.completed === false) {
            createToDo(object);
        };
    };
};

function getObject(id) {
    var retrievedToDo = localStorage.getItem(id);
    var toDoItem = JSON.parse(retrievedToDo);
    return toDoItem;
};

function markCompleted() {
    var id = $(this).parent().attr('id');
    var retrievedToDo = getObject(id);
    retrievedToDo.completed = true;
    if (retrievedToDo.completed = true) {
        $(event.target).parent().toggleClass('task-completed');
        toStorage(retrievedToDo);
    };
};

function showCompleted(e) {
    e.preventDefault();
    for (var i = 0; i < localStorage.length; i++) {
        var object = getObject(localStorage.key(i));
        if (object.completed === true) {
            createToDo(object, 'task-completed');
        };
        $('.show-completed').attr('disabled', true);
    };
};

function filterToDo() {
    var searchInput = $('.filter').val().toLowerCase();
    $('article').filter(function() {
        $(this).toggle($(this).text().indexOf(searchInput) > -1);
    });
};

function upVoteClicked(event) {
    var importance = ['none', 'low', 'normal', 'high', 'critical'];
    var $currentArticle = $(event.target).parent();
    var id = $(this).parent().attr('id');
    var retrievedToDo = getObject(id);
    var $quality = $currentArticle.children('h4').children('.quality');
    var i = importance.indexOf(retrievedToDo.quality);
    if (i < 4) {
        retrievedToDo.quality = importance[i + 1];
        $quality.text(importance[i + 1]);
        toStorage(retrievedToDo);
    };
};

function downVoteClicked(event) {
    var importance = ['none', 'low', 'normal', 'high', 'critical'];
    var $downvoteButton = $(event.target);
    var $currentArticle = $downvoteButton.parent();
    var id = $(this).parent().attr('id');
    var retrievedToDo = getObject(id);
    var $quality = $currentArticle.children('h4').children('.quality');
    var i = importance.indexOf(retrievedToDo.quality);
    if (i > 0) {
        retrievedToDo.quality = importance[i - 1];
        $quality.text(importance[i - 1]);
        toStorage(retrievedToDo);
    };
};

function deleteClicked(event) {
    $(this).parent().remove();
    localStorage.removeItem($(this).closest('article').attr('id'));
};

function editTitle(event) {
    var title = this.innerText;
    var id = $(this).parent().attr('id');
    var retrievedToDo = getObject(id);
    retrievedToDo.title = title;
    toStorage(retrievedToDo);
};

function editBody(event) {
    var body = this.innerText;
    var id = $(this).parent().attr('id');
    var retrievedToDo = getObject(id);
    retrievedToDo.body = body;
    toStorage(retrievedToDo);
};

function clearInputs() {
    event.preventDefault();
    var $titleInput = $('.todo-title');
    var $bodyInput = $('.body');
    $titleInput.val('');
    $bodyInput.val('');
};