

const formTrigger = document.querySelector('[data-form]'),
form = document.querySelector('.form'),
formClose = document.querySelector('[data-close]'),
addBtn = document.querySelector('.btn_add'),
titleTag = document.querySelector("input"),
pTitle = document.querySelector('header p')
closeIcon = document.querySelector("header i"),
descTag = document.querySelector("textarea");


const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
 let isUpdate = false, updateId;



const notes = JSON.parse(localStorage.getItem("notes") || "[]");

 formTrigger.addEventListener('click', () => {
    form.classList.add('show')
    form.classList.remove('hide')
 })

 formClose.addEventListener('click', () => {
    form.classList.add('hide')
    form.classList.remove('show')
 })
 

  


var categoryTag = document.getElementById("language");
//  var categoryValue ="";
function onChange() {
  var value = categoryTag.value;
  var text = categoryValue = categoryTag.options[categoryTag.selectedIndex].text;
//   console.log(value, text);
}
onChange();

 function showNotes() {
    if(!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.filter(note => !note.isArchived).forEach((note,id) => {
        let filterDesc = note.description ? note.description.replaceAll("\n", '<br/>') : "";
        let liTag = `<li class="note">
                        <div class="details">
                            <div><i  class ='${note.categoryId}'></i></div>
                          
                            <div>${note.title}</div>
                            <div>  ${note.date}  </div>
                            <div>${note.category}</div>

                             <span>${filterDesc}</span>
                            <div>  ${note.date}  </div>
                            <button  onClick='updateNote(${id}, "${note.title}")'><i class="uil uil-pen"></i></button>
                            <button onClick= "archiveNote(${note.id})"><i class="uil uil-folder-plus"></i></button>
                             <button onClick = "deleteNote(${note.id})"><i class="uil uil-trash"></i></button>
                        </div>
                       
                    </li>`;
                 
                    formTrigger.insertAdjacentHTML("beforebegin", liTag);
                    
                });
}
showNotes();


function deleteNote(noteId) {
    let valueToDelete = [...notes].find((note) => note.id == noteId);
    let index = notes.indexOf(valueToDelete);
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    showCategories();
}
function archiveNote(noteId) { 
    console.log(notes, noteId);
    let current = notes.find(t => t.id === noteId);
     current.isArchived = !current.isArchived
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    showCategories();
}

// function changeDateNote(noteId) { 
//     console.log(notes, noteId);
//     const dateSelector = document.querySelector('#datepicker');
//     dateSelector.innerHTML = `<span class="date-text">${value}</span>`;
//     console.log(value);
// }



function updateNote(noteId, title, filterDesc, category, newDate) {
        let description =filterDesc ? filterDesc.replaceAll('<br/>', '\r\n') : "";
        updateId = noteId;
        isUpdate = true;
        formTrigger.click();
        titleTag.value = title;
        descTag.value = description;
        pTitle.innerText = "Update a Note";
        addBtn.innerText = "Update Note";}
    
   


function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }

    });  
}



addBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value.trim(),
    description = descTag.value.trim();
    let categoryId = categoryTag.value;
    let category = categoryTag.options[categoryTag.selectedIndex].text;
  
    if(title || description) {
        let id = Date.now();
        let createdDate = new Date(),
        month = months[createdDate.getMonth()],
        day = createdDate.getDate(),
        year = createdDate.getFullYear();
        let isArchived = false;
    

        let noteInfo = {id, categoryId, title, description, category, isArchived, date: `${month} ${day}, ${year}`}
        if(!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
            
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        console.log(notes);
        showNotes();
        showCategories();
        formClose.click();
    }
});
