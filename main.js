const formTrigger = document.querySelector("[data-form]"),
  form = document.querySelector(".form"),
  formClose = document.querySelector("[data-close]"),
  titleTag = document.querySelector(".title"),
  pTitle = document.querySelector("header p");
  (closeIcon = document.querySelector("header i")),
  (descTag = document.querySelector(".description"));
  datePicker = document.querySelector(".datePicker");

submitBtn = document.querySelector(".btn_submit");
showArchivedCheckbox = document.querySelector("#showArchived");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let isUpdate = false, showArchived = false,
updateId;

const notes = JSON.parse(localStorage.getItem("notes") || insertDefault());

showArchivedCheckbox.addEventListener("change", () => {
  showArchived = showArchivedCheckbox.checked;
  showNotes();
});

formTrigger.addEventListener("click", () => {
  submitBtn.innerText = "Add";
  datePicker.hidden = true;
  categoryTag.hidden=false;
  titleTag.value = "";
  descTag.value = "";
  form.classList.add("show");
  form.classList.remove("hide");
});

formClose.addEventListener("click", () => {
  form.classList.add("hide");
  form.classList.remove("show");
});

let categoryTag = document.getElementById("categories");
function onChange () {
  let value = categoryTag.value;
  let text = (categoryValue =
  categoryTag.options[categoryTag.selectedIndex].text);
}
onChange();

function showNotes () {
  if (!notes) return;
  document.querySelectorAll(".note").forEach((li) => li.remove());
  notes
  .filter((note) => note.isArchived === showArchived)
  .forEach((note, id) => {
  let filterDesc = note.description
  ? note.description.replaceAll("\n", "<br/>")
  : "";
      let date =  note.dates[note.dates.length - 1];
      let dates = note.dates.length > 1 
      ? note.dates[note.dates.length - 1] + ' : ' + note.dates[note.dates.length - 2]
      : '';
      let liTag = `<table class="note">
                      <tr class="details">
                        <td class = "categoryId"><i  class ='${note.categoryId}'></i></td>
                        <td class ="title">${note.title}</td>
                        <td class ="date">  ${date} </td>
                        <td class ="categories">${note.category}</td>
                        <td class="content">${filterDesc}</td>
                        <td class="dates">  ${dates}  </td>
                        <td class="edit"  onClick='updateNote(${note.id} , "${note.title} "," ${note.description}","${date}","${note.categoryId}" )'><i class="uil uil-pen"></i></td>
                        <td class="arcived" onClick= "archiveNote(${note.id})"><i class="uil uil-folder-plus"></i></td>
                        <td class="delete" onClick = "deleteNote(${note.id})"><i class="uil uil-trash"></i></td>
                      </tr>                       
                    </table>`;
      formTrigger.insertAdjacentHTML("beforebegin", liTag);
    });
}
showNotes();

function deleteNote (noteId) {
  let valueToDelete = [...notes].find((note) => note.id == noteId);
  let index = notes.indexOf(valueToDelete);
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
  showCategories();
}

function archiveNote (noteId) {
  let valueToUpdate = notes.find((t) => t.id === noteId);
  valueToUpdate.isArchived = !valueToUpdate.isArchived;
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
  showCategories();
}

function updateNote(noteId, title, description, date, categoryId) {
  let parsetDesc = description ? description.replaceAll("<br/>", "\r\n") : "";
  updateId = noteId;
  isUpdate = true;
  formTrigger.click();
  titleTag.value = title;
  descTag.value = parsetDesc;
  categoryTag.value = categoryId;
  submitBtn.innerText = "Update";
  datePicker.hidden = false;
  datePicker.value = date;
}

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
  if (e.target.tagName != "I" || e.target != elem) {
  elem.parentElement.classList.remove("show");
  }
  });
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = titleTag.value.trim(),
  description = descTag.value.trim();
  let categoryId = categoryTag.value;
  let category = categoryTag.options[categoryTag.selectedIndex].text;
  if (title || description) {
    if (isUpdate) {
      update(title, description, category, categoryId);
    } else {
      create(title, description, category, categoryId);
    }    
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    showCategories();
    formClose.click();
  }
});

function update(title, description, category, categoryId) {
  let valueToUpdate = notes.find((t) => t.id === updateId);
  valueToUpdate.title = title;
  valueToUpdate.description = description;
  valueToUpdate.category = category;
  valueToUpdate.categoryId = categoryId;
  if (datePicker.value && datePicker.value !== valueToUpdate.date) {
    let newDate = new Date(datePicker.value),
    month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    (day = newDate.getDate()), (year = newDate.getFullYear());
    valueToUpdate.dates.push(`${year}-${month}-${day}`);
  }
}

function create(title, description, category, categoryId) {
  let id = Date.now();
  let createdDate = new Date(),
  month = ("0" + (createdDate.getMonth() + 1)).slice(-2);
  (day = createdDate.getDate()), (year = createdDate.getFullYear());
  let isArchived = false;
  let dates = [];
  dates.push(`${year}-${month}-${day}`);
  let noteInfo = {
      id,
      categoryId,
      title,
      description,
      category,
      isArchived,
      dates,
  };
  notes.push(noteInfo);
}
