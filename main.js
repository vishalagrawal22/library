const defaultImageURL = "./images/default_book_logo.svg";

function createBookItem(imageUrl, title, author, pageCount, isRead) {
    let bookItemHtml = `<article class="book-item">
                        <section class="book-image">
                        <img src="${imageUrl}" alt="Not Found" onerror=this.src="${defaultImageURL}" />
                        </section>
                        <section class="book-details">
                        <section class="book-data book-title">
                            <div class="book-header">Title:</div>
                            <div class="book-value">
                            ${title}
                            </div>
                        </section>

                        <section class="book-data book-author">
                            <div class="book-header">Author:</div>
                            <div class="book-value">${author}</div>
                        </section>

                        <section class="book-data book-page-count">
                            <div class="book-header">Number of pages:</div>
                            <div class="book-value">${pageCount}</div>
                        </section>

                        <section class="book-data book-is-read">
                            <div class="book-header">
                            <label for="is-read">Is read? </label>
                            </div>
                            <div class="book-value">
                            <input type="checkbox" name="is-read" value="1" checked />
                            </div>
                        </section>
                        </section>
                        </article>`
    const bookListSection = document.querySelector("#book-list");
    bookListSection.innerHTML += bookItemHtml;
}

// ,  , [null, "C", "D", 69, 1]
let bookList = [["https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQonVotG4wBf9-cvKmdGf9UIM9ITHMfexp-ZtD_9xAkx9m1fKtR", "Harry Potter and the Chamber of Secrets", "J. K. Rowling", 251, 1], [null, "Amazing book title", "Famous author", 263, 0]];

for (const book of bookList) {
    createBookItem(...book);
}