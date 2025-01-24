const myLibrary = [
  {
    title: "Angela",
    author: "Fratm",
    pages: 295,
    read: "read",
    description: "OOOOOoo"
  },
  {
    title: "è",
    author: "Patt",
    pages: 245,
    read: "read",
  },
  {
    title: "bellissimamente",
    author: "Sort",
    pages: 198,
    read: "not read yet",
  },

  {
    title: "billissimissimisssimissima",
    author: "Sort",
    pages: 198,
    read: "not read yet",
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
  let book = document.querySelectorAll(["#title", "#author", "#pages", "#read", "#description"]);
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
  card.classList.add("card");
  
  const cardHeader = document.createElement("h2");
  cardHeader.textContent = book.title;

  const par = document.createElement("p");
  par.textContent = book.description;

  const author = document.createElement("div");
  author.classList.add("author");

  const authorHeader = document.createElement("h4");
  authorHeader.textContent = "Author: ";
  const authorName = document.createElement("span");
  authorName.textContent = book.author;

  author.appendChild(authorHeader);
  author.appendChild(authorName);

  const btnsDiv = document.createElement("div");
  btnsDiv.classList.add("card-buttons"); 

  card.appendChild(cardHeader);
  card.appendChild(par);
  card.appendChild(author);
  card.appendChild(btnsDiv);
  
  const btnRead = document.createElement("button");
  const btnRm = document.createElement("button");

  btnsDiv.appendChild(btnRead);
  btnsDiv.appendChild(btnRm);

  const imgRead = document.createElement("img");
  const imgRm = document.createElement("img");
  setAttributes(imgRead, {src:`images/book-open-blank-variant-outline.svg`, alt:"no-image", width:"18", height:"18"});
  setAttributes(imgRm, {src:`images/book-remove.svg`, alt:"no-image", width:"18", height:"18"});
  btnRm.setAttribute("data-attribute", index);
  btnRead.setAttribute("data-attribute", index);
  btnRm.addEventListener("click", () =>{
    const index = btnRm.getAttribute("data-attribute");
    removeBook(index, myLibrary);
  });

  btnRead.addEventListener("click", ()=>{
    const index = btnRead.getAttribute("data-attribute");
    toggleStatus(btnRead, imgRead, imgRm);
  })

  btnRead.appendChild(imgRead);
  btnRm.appendChild(imgRm); 
  
  card.setAttribute("data-attribute", index);
  content.appendChild(card);
  index++;
}

function setAttributes(el, attr){
  for(key in attr){
    el.setAttribute(key, attr[key]);
  }
}

function removeBook(index, library){
  library.splice(index, 1);
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const dataAttribute = card.getAttribute("data-attribute"); 
    if(dataAttribute === index) {
      const content = document.querySelector(".content");
      content.removeChild(card);
    }
  })
}

function toggleStatus(index){

}
