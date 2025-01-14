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

Book.prototype.info = function (){
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooksOf(library){
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
  const tRow = document.createElement("tr");
  tBody.appendChild(tRow);
  for(category in book) {
    const tCell = document.createElement("td");
    tCell.textContent = book[category];
    tRow.appendChild(tCell);
    }
  });
}
