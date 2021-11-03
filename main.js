const defaultImageURL = "./images/default_book_logo.svg";

let bookList = [];
let currentlyPage = 0;
let prevButton = document.querySelector("#prev");
let nextButton = document.querySelector("#next");
let curPage = document.querySelector("#cur-page");
let lastPage = document.querySelector("#last-page");

nextButton.onclick = function () {
    if (3 * (currentlyPage + 1) < bookList.length) {
        clearScreen();
        currentlyPage++;
        curPage.textContent = currentlyPage + 1;
        displayBook();
    } else {
        alert("Already at last page!");
    }
}

prevButton.onclick = function () {
    if (3 * (currentlyPage - 1) >= 0) {
        clearScreen();
        currentlyPage--;
        curPage.textContent = currentlyPage + 1;
        displayBook();
    } else {
        alert("Already at first page!");
    }
}

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

function clearScreen() {
    let l = 3 * currentlyPage;
    let r = Math.min(3 * currentlyPage + 3, bookList.length);
    for (let i = l; i < r; i++) {
        book = document.querySelector(`[data-index="${i}"]`);
        book.remove();
    }
}

function displayBook() {
    let l = 3 * currentlyPage;
    let r = Math.min(3 * currentlyPage + 3, bookList.length);
    for (let i = l; i < r; i++) {
        addBookToDisplay(i);
    }
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
    let data = form.elements;
    let title = data["book-title"].value;
    let author = data["book-author"].value;
    let pageCount = data["book-page-count"].value;
    let imageURL = data["book-image-url"].value;
    clearScreen();
    bookList.push(new Book(title, author, pageCount, false, imageURL));
    let curLen = bookList.length;
    let maxLen = Math.ceil(curLen / 3); 
    lastPage.textContent = maxLen;
    curPage.textContent = maxLen;
    currentlyPage = maxLen - 1;
    displayBook();
    updateCache();
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
    updateCache();
}

function deleteBook(index) {
    let len = bookList.length;
    clearScreen();
    for (let i = index + 1; i < len; i++) {
        bookList[i - 1] = bookList[i];
    }
    bookList.pop();
    let curLen = bookList.length;
    let maxLen = Math.ceil(curLen / 3);
    if (maxLen != 0) {
        lastPage.textContent = maxLen;
    }
    if (curLen % 3 == 0 && currentlyPage != 0) {
        currentlyPage--;
        curPage.textContent = currentlyPage + 1;
    }
    displayBook();
    updateCache();
}

function addBookToDisplay(index) {
    let bookItemHtml = `<article class="book-item" data-index=${index}>
                        <section class="book-image">
                        <img src="${bookList[index].imageUrl}" onerror=this.src="${defaultImageURL}" />
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
                        <section class="remove-button">
                        <button onclick="deleteBook(${index})">X</button>
                        </section>
                        </article>`
    let bookListSection = document.querySelector("#book-list");
    bookListSection.innerHTML += bookItemHtml;
}

function updateCache() {
    console.log("Updating Cache");
    let cacheArray = new Array(bookList.length);
    for (let i = 0; i < bookList.length; i++) {
        const book = bookList[i];
        console.log(book);
        cacheArray[i] = [book.title, book.author, book.pageCount, book.isRead, book.imageUrl];
    }
    myStorage.setItem("userBookList", JSON.stringify(cacheArray));
    console.log(cacheArray);
    console.log(JSON.stringify(cacheArray));
}

function getCache() {
    myStorage = window.localStorage;
    if (myStorage.getItem("userBookList") == null) {
        let defaultCacheArray = [["Harry Potter and the Chamber of Secrets", "J. K. Rowling", 251, true, "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQonVotG4wBf9-cvKmdGf9UIM9ITHMfexp-ZtD_9xAkx9m1fKtR"], ["Amazing book title", "Famous author", 263, false, ""], ["Lorem ipsum dolor sit amet, consectetur adipiscing", "Lorem ipsum dolor sit amet, consectetur adipiscing", 243, false, ""]];
        console.log(JSON.stringify(defaultCacheArray));
        myStorage.setItem("userBookList", JSON.stringify(defaultCacheArray));
    }
    console.log(myStorage.getItem("userBookList"));
    let cacheArray = JSON.parse(myStorage.getItem("userBookList"));
    curPage.textContent = 1;
    lastPage.textContent = Math.ceil(cacheArray.length / 3);
    if (lastPage.textContent == 0)
    {
        lastPage.textContent = 1;
    }
    convertCache(cacheArray);
}

function convertCache(cacheArray) {
    console.log(cacheArray);
    for (const book of cacheArray) {
        bookList.push(new Book(...book));
    }
}

getCache();
displayBook();
