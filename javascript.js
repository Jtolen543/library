const library = []

function Book(author, title, pages, read=false, image="") {
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read
    this.image = image
}

const book_button = document.querySelector(".add-book")
const dialog_form = document.querySelector("dialog")
const close_button = document.querySelector("#close-button")
const user_form = document.querySelector("form")
book_button.addEventListener("click", () => {
    dialog_form.showModal()
    
})
close_button.addEventListener("click", (event) => {
    event.preventDefault()
    AddToLibrary()
    user_form.reset()
    dialog_form.close()
})

const erase = document.querySelector(".delete-all")
erase.addEventListener("click", () => {
    library.splice(0, library.length)
    updateStats()
    AddToLibrary()
})

const hide = document.querySelector(".hide-filter")
let hidden = false
hide.addEventListener("click", () => {
    const details = document.querySelector(".details-bar")
    if (hidden) {
        details.style.display = "flex"
        hide.textContent = "Hide Details"
    }
    else if (!hidden) {
        details.style.display = "none"
        hide.textContent = "Show Details"
    }
    hidden = !hidden
})

user_form.addEventListener("submit", (event) => {
    event.preventDefault()
    const content1 = document.getElementById("author").value
    const content2 = document.getElementById("title").value
    const content3 = document.getElementById("pages").value
    const content4 = document.getElementById("check").checked
    const content5 = document.getElementById("image").value
    const newBook = new Book(content1, content2, content3, content4, content5)
    library.push(newBook)
    AddToLibrary()
    updateStats()
    user_form.reset()
    dialog_form.close()
})

const card = document.querySelector(".books-container")
const dropdown = document.getElementById("book-filter")
dropdown.addEventListener("click", () => {
    dropdown.addEventListener("change", AddToLibrary())
})

function AddToLibrary() {
    card.innerHTML = ''
    const selection = filterBooks()
    selection.forEach((element, index) => {
        const photo = document.createElement("img")
        photo.src = element.image
        photo.style.width = "80px"
        photo.style.height = "80px"
        photo.style.backgroundColor = "#bae6fd";
        const container = document.createElement("div")
        container.classList.add("card-button-action")
        const read_button = document.createElement("button")
        read_button.addEventListener("click", ()=> {
            element.read = !element.read
            read_button.style.backgroundImage = (!element.read) ? "url('images/book-open-svgrepo-com.svg')" : "url('./images/book-svgrepo-com.svg')"
            updateStats()
            AddToLibrary()
        })
        read_button.classList.add("read_book")
        const trash_button = document.createElement("button")
        trash_button.classList.add("trash_button")
        trash_button.id = index
        trash_button.addEventListener("click", ()=> {
            library.splice(index, 1)
            AddToLibrary()
            updateStats()
        })
        container.appendChild(read_button)
        container.appendChild(trash_button)
        const author = document.createElement("div")
        author.textContent = `Author: ${element.author}`
        const title = document.createElement("div")
        title.textContent = `Title: ${element.title}`
        const pages = document.createElement("div")
        pages.textContent = `Pages: ${element.pages}`
        let holder = document.createElement("div")
        read_button.style.backgroundImage = (!element.read) ? "url('images/book-open-svgrepo-com.svg')" : "url('./images/book-svgrepo-com.svg')"
        holder.classList.add("book-card")
        if (element.image.includes("https"))
            holder.appendChild(photo)
        else {
            photo.src = "https://www.w3schools.com/w3css/img_avatar3.png"
            holder.appendChild(photo)
        }
        holder.appendChild(author)
        holder.appendChild(title)
        holder.appendChild(pages)
        holder.appendChild(container)
        card.appendChild(holder)
        updateStats()
    })
}

function updateStats() {
    const total = document.querySelector(".total-books")
    total.textContent = `Total Books In Library: ${library.length}`
    const books_read = document.querySelector(".total-read")
    let i = 0;
    library.forEach((element) => {
        if (element.read)
            i++
    })
    books_read.textContent = `Total Books Read: ${i}`
    const books_unread = document.querySelector(".total-unread")
    books_unread.textContent = `Total Books Unread: ${library.length - i}`
}

function filterBooks() {
    const filter = document.querySelector("#book-filter").value
    if (filter === "all")
        return library
    else if (filter === "read")
        return library.filter((book) => book.read)
    else (filter === "unread") 
        return library.filter((book) => !book.read)
}       
