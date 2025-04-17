class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = function () {
            let readInfo = "";
            if (this.read == 0) {
                readInfo = "not read yet";
            } else {
                readInfo = "already read";
            }
            return this.title+ ' by ' + this.author + ', ' + this.pages + ' pages, ' + readInfo;
        }
    }    
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function display(book) {
    const indexOfBook = myLibrary.indexOf(book);
    const bookCard = document.createElement('div');
    bookCard.classList.add('bookCard');

    if(book.read == 0) {
        bookCard.classList.add('unread');
    } else {
        bookCard.classList.add('read');
    }
    
    bookCard.setAttribute('id', book.title);
    
    const title = document.createElement('p');
    title.textContent = book.title;
    title.classList.add('title');

    const author = document.createElement('p');
    author.textContent = book.author;
    author.classList.add('author');
    
    const pages = document.createElement('p');
    pages.textContent = book.pages.toString() + ' pages';
    pages.classList.add('pages');

    const action = document.createElement('div');
    action.classList.add('action');

    const suppr = document.createElement('img');
    suppr.setAttribute('src','images/delete.png');
    suppr.classList.add('del');
    suppr.classList.add(indexOfBook);
    const read = document.createElement('img');
    read.setAttribute('src','images/book.png');
    read.classList.add('isRead');
    read.classList.add(indexOfBook);

    action.appendChild(read);
    action.appendChild(suppr);
    
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(action);
    
    library.appendChild(bookCard);
}

function populate() {
    myLibrary.forEach(book => display(book));
}

function readToggle(e) {
    readiness = this.parentNode.parentNode.classList;
    check = this.parentNode.parentNode.classList[1];
    indexOfObject = this.classList[1];
    if(check == "unread") {
        readiness.remove('unread');
        readiness.add('read');
        myLibrary[indexOfObject].read = 1;
    } else {
        readiness.remove('read');
        readiness.add('unread');
        myLibrary[indexOfObject].read = 0;
    }
}

function deleteBook(e) {
    indexOfObject = this.classList[1];
    myLibrary.splice(indexOfObject, 1);
    document.querySelector('.library').innerHTML = "";
    populate();

    const reads = document.querySelectorAll('.isRead');
    reads.forEach(read => read.addEventListener('click', readToggle));

    const deleter = document.querySelectorAll('.del');
    deleter.forEach(deletee => deletee.addEventListener('click', deleteBook));    
}

function showForm(e) {
    if(newForm.style.visibility == "visible") {
        newForm.style.visibility = "hidden";
    } else {
        newForm.style.visibility = "visible";
    }
}

let myLibrary = [];

const tolkien = new Book("The Hobbit", "J.R.R. Tolkien", 295, 0);
const tolokien = new Book("The Hobbito", "J.R.R. Tolkien", 295, 1);
const tolakien = new Book("The Hobbita", "J.R.R. Tolkien", 295, 0);
const tolikien = new Book("The Hobbiti", "J.R.R. Tolkien", 295, 1);
const tolrkien = new Book("The Hobbitr", "J.R.R. Tolkien", 295, 0);
const tolukien = new Book("The Hobbitu", "J.R.R. Tolkien", 295, 1);

addBookToLibrary(tolkien);
addBookToLibrary(tolokien);
addBookToLibrary(tolakien);
addBookToLibrary(tolikien);
addBookToLibrary(tolukien);
addBookToLibrary(tolrkien);

let library = document.querySelector('.library');

populate();

const reads = document.querySelectorAll('.isRead');
reads.forEach(read => read.addEventListener('click', readToggle));

const deleter = document.querySelectorAll('.del');
deleter.forEach(deletee => deletee.addEventListener('click', deleteBook));

const newBook = document.querySelector('button');
const newForm = document.querySelector('form');

newBook.addEventListener('click', showForm);

const submitBook = document.querySelector('#submit');

submitBook.addEventListener('click', registerBook);

function registerBook(e) {
    e.preventDefault();
    if(!newForm.checkValidity()) {
       return emptyError();
    }
    const title = document.getElementById('title');
    const titleValue = title.value;

    const author = document.getElementById('author');
    const authorValue = author.value;

    const pages = document.getElementById('pages');
    const pagesValue = pages.value;

    const newRead = document.getElementById('read');
    let newReadValue = newRead.checked;
    if (newReadValue) {
        newReadValue = 1;
    } else {
        newReadValue = 0;
    }

    const newBook = new Book(titleValue, authorValue, pagesValue, newReadValue);
    addBookToLibrary(newBook);

    document.querySelector('.library').innerHTML = "";
    populate();

    const reads = document.querySelectorAll('.isRead');
    reads.forEach(read => read.addEventListener('click', readToggle));

    const deleter = document.querySelectorAll('.del');
    deleter.forEach(deletee => deletee.addEventListener('click', deleteBook));

    newForm.style.visibility = "hidden";
}

function emptyError() {
    const error = document.querySelector(".error");
    error.textContent = "Il faut tout remplir avant de valider";
}
