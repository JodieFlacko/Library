const myLibrary = [
  {
    title: "Lo Hobbit",
    author: "Fratm",
    pages: 295,
    read: "read",
  },
  {
    title: "Nosferatu",
    author: "Patt",
    pages: 245,
    read: "read",
  },
  {
    title: "Hulk",
    author: "Sort",
    pages: 198,
    read: "not read yet",
  },
];

const showBtn = document.querySelector(".show-modal");
const closeBtn = document.querySelector(".cancel");
const dialog = document.querySelector("dialog")
const form = document.querySelector("form");

displayLibrary(myLibrary);
// Dialog event listeners
showBtn.addEventListener("click", () =>{
    dialog.showModal();
  })
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

form.addEventListener("submit", () =>{
  let book = document.querySelectorAll(["#title", "#author", "#pages", "#read"]);
  addBookToLibrary(book[0].value, book[1].value, book[2].value, book[3].value); 
  displayBook(myLibrary[myLibrary.length - 1], myLibrary);
  form.reset();
})

function Book(title, author, pages, read) {
  this.title = title;  
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}
function displayLibrary(library){
  clearTable();
  library.forEach(book =>{
    displayBook(book, library);
  });
}

function displayBook(book, library){
  const tBody = document.querySelector("tbody");
  const tRow = document.createElement("tr");
  const rmBtn = document.createElement("button");
  tBody.appendChild(tRow);
  for(category in book) {
    const tCell = document.createElement("td");
    tCell.textContent = book[category];
    tRow.appendChild(tCell);
  }
  const tCell = document.createElement("td");
  tRow.appendChild(tCell);
  tCell.appendChild(rmBtn);
  rmBtn.classList.add("remove-book");
  rmBtn.setAttribute("data-attribute", library.map(item => item.title).indexOf(book.title));
  rmBtn.textContent = "Remove book";
  rmBtn.addEventListener("click", e => {
    const index = rmBtn.getAttribute("data-attribute");
    removeBook(index, myLibrary); 
  });
}

function clearTable(){
  const rows = document.querySelectorAll("tbody tr");
  rows.forEach(row => row.remove());
}

function removeBook(index, library){
  library.splice(index, 1);
  displayLibrary(library);
}


