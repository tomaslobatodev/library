const content = document.querySelector('.content')
const addBtn = document.querySelector('.addBook')
const modal = document.querySelector('.modal')
const closeModalBtn = document.querySelector('.closeModal')
const createBookBtn = document.querySelector('.createBook')

const books = []

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

    const newBook = new Book(title, author, pages)
    books.push(newBook)

    titleInput.value = ''
    authorInput.value = ''
    pagesInput.value = ''

    modal.style.display = 'none'
    loadCards()
})

function Book(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
    this.info = function() {
        return `This is ${this.title} by ${this.author}, it has ${this.pages} pages.`
    }
}

function loadCards() {
    const bookCards = books.map(book => `
        <div class="bookCard">
            <h2>${book.title}</h2>
            <h3>Wrote by ${book.author}</h3>
            <h3>it has ${book.pages} pages</h3>
        </div>
    `).join('')
    content.innerHTML = bookCards
}

document.onload(loadCards())
