class Library {

  constructor(){  
    this.books = [{
        title: "A Tale of Two Cities",
        author: "Charles Dickens",
        pages: 489,
        read: "read",
        description: "A Tale of Two Cities is a historical novel published in 1859 by English author Charles Dickens, set in London and Paris before and during the French Revolution. The novel tells the story of the French Doctor Manette, his 18-year-long imprisonment in the Bastille in Paris, and his release to live in London with his daughter Lucie whom he had never met. The story is set against the conditions that led up to the French Revolution and the Reign of Terror.",
        index: 0,
      },
      {
        title: "The Little Prince",
        author: "Antoine de Saint-Exupéry",
        pages: 160,
        read: "read",
        description: "The Little Prince (French: Le Petit Prince, pronounced [lə p(ə)ti pʁɛ̃s]) is a novella written and illustrated by French writer and military pilot Antoine de Saint-Exupéry. It was first published in English and French in the United States by Reynal & Hitchcock in April 1943 and was published posthumously in France following liberation; Saint-Exupéry's works had been banned by the Vichy Regime. The story follows a young prince who visits various planets, including Earth, and addresses themes of loneliness, friendship, love, and loss. Despite its style as a children's book, The Little Prince makes observations about life, adults, and human nature.",
        index: 1,
      },
      {
        title: "The Alchemist (O Alquimista)",
        author: "Paulo Coelho",
        pages: 167,
        read: "not-read",
        description: "The Alchemist (Portuguese: O Alquimista) is a novel by Brazilian author Paulo Coelho which was first published in 1988. Originally written in Portuguese, it became a widely translated international bestseller. The story follows the shepherd boy Santiago in his journey across North Africa to the Egyptian pyramids after he dreams of finding treasure there.",
        index: 2,
      },
    
      {
        title: "And Then There Were None",
        author: "Agatha Christie",
        pages: 272,
        read: "not-read",
        description: "And Then There Were None is a mystery novel by the English writer Agatha Christie, who described it as the most difficult of her books to write. It was first published in the United Kingdom by the Collins Crime Club on 6 November 1939, as Ten Little Niggers, after an 1869 minstrel song that serves as a major plot element. The US edition was released in January 1940 with the title And Then There Were None, taken from the last five words of the song. Successive American reprints and adaptations use that title, though American Pocket Books paperbacks used the title Ten Little Indians between 1964 and 1986. UK editions continued to use the original title until 1985.",
        index: 3,
      },
    ];
  }

  isBookInbooks(newBook){
    return this.books.some(book => book.title === newBook.title);
  }

  addBook(newBook){
    if(!this.isBookInbooks(newBook)) this.books.push(newBook);
  }

  removeBook(title){
    this.books = this.books.filter(book => book.title !== title);
  }

  getBook(title){
    return this.books.find(book => book.title === title);
  }
}

const myLibrary = new Library;
//Main functions

class Book {
  constructor(title, author, pages, read, description){
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.description = description
  this.index = myLibrary.length
  }
}

const updateBooksGrid = () => {
  resetGrid();
  for(let book of myLibrary.books) {
    displayBook(book);
  }
}

const resetGrid = () => {
  const grid = document.querySelector('.content');
  grid.textContent = '';
}

const removeBook = (e) => {
  const title = e.target.parentNode.parentNode.parentNode.firstChild.textContent;
  myLibrary.removeBook(title);
  updateBooksGrid();
}

const addBook = () => {
  const newBook = getBookFromInput();

  myLibrary.addBook(newBook);
  updateBooksGrid();
}


function displayBook(book){
  
  //Create elements
  const content = document.querySelector(".content");
  const card = document.createElement("div");
  const title = document.createElement("h2");
  const description = document.createElement("p");
  const author = document.createElement("div");
  const authorHeader = document.createElement("h4");
  const authorName = document.createElement("span");
  const cardBtns = document.createElement("div");
  const readStatusBtn = document.createElement("button");
  const removeBtn = document.createElement("button");
  const readStatusImg = document.createElement("img");
  const removeBookImg = document.createElement("img");

  //Append children
  content.appendChild(card);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(author);
  author.appendChild(authorHeader);
  author.appendChild(authorName);
  card.appendChild(cardBtns);
  cardBtns.appendChild(readStatusBtn);
  cardBtns.appendChild(removeBtn);
  removeBtn.appendChild(removeBookImg); 
  readStatusBtn.appendChild(readStatusImg);

  //Set attributes
  const index = book.index;
  card.setAttribute("data-attribute", index);
  setAttributes(removeBookImg, {src:`images/book-remove.svg`, alt:"no-image", width:"18", height:"18"});
  setAttributes(readStatusImg, {alt:"no-image", width:"18", height:"18"});
  setAttributes(readStatusImg, {alt:"no-image", width:"18", height:"18"});
  toggleStatus(book, readStatusImg);

  //Set class lists
  card.classList.add("card");
  author.classList.add("author");
  cardBtns.classList.add("card-buttons"); 

  //Set text content
  title.textContent = book.title;
  description.textContent = book.description;
  authorHeader.textContent = "Author: ";
  authorName.textContent = book.author;

  //Set event listeners
  removeBtn.onclick = removeBook;

  readStatusBtn.addEventListener("click", ()=>{
    toggleStatus(book, readStatusImg);
  })

}

function handleModal(){
  const showBtn = document.querySelector(".show-modal");
  const closeBtn = document.querySelector(".cancel");
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
    addBook();
    form.reset();
  })
}


//Helper functions

function setAttributes(el, attr){
  for(key in attr){
    el.setAttribute(key, attr[key]);
  }
}

function toggleStatus(book, readStatusImg){
  book.read = book.read === "read" ? "not-read" : "read";
  if(book.read === "read") setAttributes(readStatusImg, {src: `images/book-check.svg`, title: "You have read this book"});
  else setAttributes(readStatusImg, {src: `images/book-open-blank-variant-outline.svg`, title: "You are reading this book"});
}

const getBookFromInput = () => {
  const title = document.getElementById("title").value; 
  const author = document.getElementById("author").value; 
  const pages = document.getElementById("pages").value; 
  const description = document.getElementById("description").value; 
  const read = document.querySelector('input[name="read"]:checked').value;

  return new Book(title, author, pages, read, description);
}

handleModal();
updateBooksGrid();