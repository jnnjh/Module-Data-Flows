let myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    let book1 = new Book("Robinson Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book("The Old Man and the Sea", "Ernest Hemingway", "127", true);
    myLibrary.push(book1, book2);
    render();
  }
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function submit() {
  // Добавлена проверка автора, так как он тоже важен
  if (!title.value || !author.value || !pages.value) {
    alert("Please fill all fields!");
    return false;
  } else {
    // ИСПРАВЛЕНО: передаем author.value, а не дважды title
    // ИСПРАВЛЕНО: пушим в myLibrary (а не в library)
    let book = new Book(title.value, author.value, pages.value, check.checked);
    myLibrary.push(book);
    render();
    
    // Очистим поля, чтобы было красиво
    title.value = "";
    author.value = "";
    pages.value = "";
    check.checked = false;
  }
}

function render() {
  let table = document.getElementById("display");
  let rowsNumber = table.rows.length;
  
  // ИСПРАВЛЕНО: добавлена закрывающая скобка в n--)
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }

  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    let row = table.insertRow(1);
    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);

    titleCell.innerHTML = myLibrary[i].title;
    authorCell.innerHTML = myLibrary[i].author;
    pagesCell.innerHTML = myLibrary[i].pages;

    // Кнопка изменения статуса
    let changeBut = document.createElement("button");
    changeBut.className = "btn btn-success btn-sm"; // btn-sm для компактности
    wasReadCell.appendChild(changeBut);
    
    // ИСПРАВЛЕНО: Логика статуса (если true -> "Read", если false -> "Not Read")
    changeBut.innerText = myLibrary[i].check ? "Read" : "Not Read";

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    // Кнопка удаления
    let delBut = document.createElement("button");
    deleteCell.appendChild(delBut);
    delBut.className = "btn btn-warning btn-sm";
    delBut.innerHTML = "Delete";
    
    // ИСПРАВЛЕНО: событие "click" вместо "clicks"
    delBut.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);
      render();
    });
  }
}