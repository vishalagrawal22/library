const defaultImageURL = "./images/default_book_logo.svg";

let bookList = [];

function Book(title, author, pageCount, isRead, imageUrl) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
    this.imageUrl = imageUrl;
}

Book.prototype.getReadStatus = function () {
    return this.isRead ? "Finished" : "Pending";
}

Book.prototype.getActionStatus = function () {
    return this.isRead ? "Mark as pending" : "Mark as finished";
}

function exitForm() {
    let inputForm = document.querySelector("#form-container");
    inputForm.classList.add("hidden");
    let baseContainer = document.querySelector("#base-container");
    baseContainer.classList.remove("hidden");
}

let form = document.querySelector('form');
form.addEventListener('submit', event => {
    event.preventDefault();
    exitForm();
});

function getUserInput() {
    let inputForm = document.querySelector("#form-container");
    inputForm.classList.remove("hidden");
    let baseContainer = document.querySelector("#base-container");
    baseContainer.classList.add("hidden");
}

function changeStatus(index) {
    statusSection = document.querySelector(`[data-index="${index}"] .book-details .book-is-read`);
    bookList[index].isRead = !bookList[index].isRead;
    let readStatus = statusSection.querySelector(".book-value");
    readStatus.innerHTML = bookList[index].getReadStatus();
    let actionStatus = statusSection.querySelector(".book-value-button button");
    actionStatus.innerHTML = bookList[index].getActionStatus();
}

function addBookToLibrary(index) {
    let bookItemHtml = `<article class="book-item" data-index=${index}>
                        <section class="book-image">
                        <img src="${bookList[index].imageUrl}" alt="Not Found" onerror=this.src="${defaultImageURL}" />
                        </section>
                        <section class="book-details">
                        <section class="book-data book-title">
                            <section class="book-header">Title:</section>
                            <section class="book-value">
                            ${bookList[index].title}
                            </section>
                        </section>

                        <section class="book-data book-author">
                            <section class="book-header">Author:</section>
                            <section class="book-value">${bookList[index].author}</section>
                        </section>

                        <section class="book-data book-page-count">
                            <section class="book-header">Number of pages:</section>
                            <section class="book-value">${bookList[index].pageCount}</section>
                        </section>

                        <section class="book-data book-is-read">
                            <section class="book-header">Status: </section>
                            <section class="book-value">${bookList[index].getReadStatus()}</section>
                            <section class="book-value-button">
                                <button class="is-read" onclick="changeStatus(${index})">${bookList[index].getActionStatus()}</button>
                            </section>
                        </section>
                        </section>
                        </article>`
    let bookListSection = document.querySelector("#book-list");
    bookListSection.innerHTML += bookItemHtml;
}

let bookArray = [["Harry Potter and the Chamber of Secrets", "J. K. Rowling", 251, true, "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQonVotG4wBf9-cvKmdGf9UIM9ITHMfexp-ZtD_9xAkx9m1fKtR"], ["Amazing book title", "Famous author", 263, false, null]];
for (const book of bookArray) {
    bookList.push(new Book(...book));
}

for (let i = 0; i < bookList.length; i++) {
    addBookToLibrary(i);
}
