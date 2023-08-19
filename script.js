const content = document.querySelector('.content')
const addBtn = document.querySelector('.addBook')
const modal = document.querySelector('.modal')
const closeModalBtn = document.querySelector('.closeModal')
const createBookBtn = document.querySelector('.createBook')

let books = []

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
        this.id = books.length + 1
        this.info = function() {
            return `This is ${this.title} by ${this.author}, it has ${this.pages} pages.`
        }
    }
}


addBtn.addEventListener('click', () => {
    modal.style.display = 'flex'
})

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none'
})

createBookBtn.addEventListener('click', (ev) => {
    ev.preventDefault()
    const titleInput = document.querySelector('#title')
    const authorInput = document.querySelector('#author')
    const pagesInput = document.querySelector('#pages')

    const title = titleInput.value
    const author = authorInput.value
    const pages = pagesInput.value

    const newBook = new Book(title, author, pages, false)
    books.push(newBook)

    titleInput.value = ''
    authorInput.value = ''
    pagesInput.value = ''

    modal.style.display = 'none'
    loadCards()
})

function loadCards() {
    const bookCards = books.map(book => `
        <div class="bookCard" id="${book.id}">
            <div class="cardHead">
                <h2>${book.title}</h2>
                <button class="delete" onClick={deleteCard(${book.id})}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>
            <h3>Wrote by ${book.author}</h3>
            <h3>it has ${book.pages} pages</h3>
            <button class='read-${book.read}' onClick='{toggleRead(${book.id}, ${book.read})}' >${book.read ? 'read' : 'not read'}</button>
        </div>
    `).join('')
    content.innerHTML = bookCards
}

function toggleRead(bookId, read) {
    const book = books.find(book => book.id === bookId)


    if (book.read) book.read = false
    else book.read = true

    loadCards()

}

function deleteCard(bookId) {
    const newBooks = books.filter(book => book.id !== parseInt(bookId))
    books = newBooks

    loadCards()
}