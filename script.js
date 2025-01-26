const myLibrary = [
  {
    title: "Angela",
    author: "Fratm",
    pages: 295,
    read: "read",
    description: "OOOOOoo",
    index: 0,
  },
  {
    title: "è",
    author: "Patt",
    pages: 245,
    read: "read",
    index: 1,
  },
  {
    title: "bellissimamente",
    author: "Sort",
    pages: 198,
    read: "not-read",
    index: 2,
  },

  {
    title: "billissimissimisssimissima",
    author: "Sort",
    pages: 198,
    read: "not-read",
    index: 3,
  },
];

const showBtn = document.querySelector(".show-modal");
const closeBtn = document.querySelector(".cancel");
const dialog = document.querySelector("dialog")
const form = document.querySelector("form");
let index = 0;

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
  let book = document.querySelectorAll(["#title", "#author", "#pages", 'input[name="read"]:checked', "#description"]);
  addBookToLibrary(book[0].value, book[1].value, book[2].value, book[3].value, book[4].value, index);
  form.reset();
})


function Book(title, author, pages, read, description, index) {
  this.title = title;  
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.description = description;
  this.index = index;
}

function addBookToLibrary(title, author, pages, read, description) {
  const book = new Book(title, author, pages, read, description, index);
  myLibrary.push(book);
  displayBook(book);
}
function displayLibrary(library){
  library.forEach(book =>{
    displayBook(book, library);
  });
}

function displayBook(book, library){
  const content = document.querySelector(".content");
  const card = document.createElement("div");

  card.setAttribute("data-attribute", index);
  content.appendChild(card);

  card.classList.add("card");
  
  const title = document.createElement("h2");
  title.textContent = book.title;

  const description = document.createElement("p");
  description.textContent = book.description;

  const author = document.createElement("div");
  author.classList.add("author");

  const authorHeader = document.createElement("h4");
  authorHeader.textContent = "Author: ";
  const authorName = document.createElement("span");
  authorName.textContent = book.author;

  author.appendChild(authorHeader);
  author.appendChild(authorName);

  const cardBtns = document.createElement("div");
  cardBtns.classList.add("card-buttons"); 

  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(author);
  card.appendChild(cardBtns);
  
  const readStatusBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  cardBtns.appendChild(readStatusBtn);
  cardBtns.appendChild(removeBtn);

  const readStatusImg = document.createElement("img");
  const removeBookImg = document.createElement("img");
  setAttributes(removeBookImg, {src:`images/book-remove.svg`, alt:"no-image", width:"18", height:"18"});

  removeBtn.setAttribute("data-attribute", index);
  readStatusBtn.setAttribute("data-attribute", index);
  removeBtn.addEventListener("click", () =>{
    const Card = card;
    removeBook(Card, myLibrary);
  });

  readStatusBtn.addEventListener("click", ()=>{
    toggleStatus(book, readStatusImg);
  })
  //Appending the image showing the read status
  setAttributes(readStatusImg, {alt:"no-image", width:"18", height:"18"});
  setAttributes(readStatusImg, {alt:"no-image", width:"18", height:"18"});

  toggleStatus(book, readStatusImg);
  removeBtn.appendChild(removeBookImg); 
  readStatusBtn.appendChild(readStatusImg);

  index++;
}

function setAttributes(el, attr){
  for(key in attr){
    el.setAttribute(key, attr[key]);
  }
}

function removeBook(card, library){
  const index = card.getAttribute("data-attribute");
  library.splice((library.findIndex(el =>{
    return el.index == index
  })), 1);
  const content = document.querySelector(".content");
  content.removeChild(card);    
}

function toggleStatus(book, readStatusImg){
  book.read = book.read === "read" ? "not-read" : "read";
  if(book.read === "read") setAttributes(readStatusImg, {src: `images/book-check.svg`, title: "You have read this book"});
  else setAttributes(readStatusImg, {src: `images/book-open-blank-variant-outline.svg`, title: "You are reading this book"});
}
