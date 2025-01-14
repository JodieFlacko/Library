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

  const body = document.querySelector("body");
  const table = document.createElement("table");
  const caption = document.createElement("caption");
  caption.textContent = "Books";
  const tHead = document.createElement("thead");
  const tBody = document.createElement("tbody");
  body.appendChild(table);
  table.appendChild(caption);
  table.appendChild(tHead);
  for(category in myLibrary[0]){
    const tHeader = document.createElement("th");
    tHeader.textContent = category;
    tHead.appendChild(tHeader);
  };
  table.appendChild(tBody);
  myLibrary.forEach(book =>{
    displayBook(book);
    });

function displayBook(book){
  const tRow = document.createElement("tr");
  tBody.appendChild(tRow);
  for(category in book) {
    const tCell = document.createElement("td");
    tCell.textContent = book[category];
    tRow.appendChild(tCell);
    }
  }

const showBtn = document.querySelector(".show-modal");
const closeBtn = document.querySelector(".cancel");
const confirmBtn = document.querySelector(".confirm")
const dialog = document.querySelector("dialog")
const form = document.querySelector("form");

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
  displayBook(myLibrary[myLibrary.length - 1]);
  form.reset();
})
