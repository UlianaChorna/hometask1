const categories =["Task", "Random Thought", "Idea", "Quote"];

function showCategories() {
    var noteList = JSON.parse(localStorage.getItem("notes") || "[]");
    if(!noteList) return;
    document.querySelectorAll(".category").forEach(li => li.remove());
    var d1 = document.getElementById('category');
    categories.filter(category => {
       let categoryNotes = noteList.filter(note => note.category === category);
       return categoryNotes.length > 1;
    }).forEach((category) => {
        let categoryNotes = noteList.filter(note => note.category === category);
        let active = categoryNotes.filter(note => !note.isArchived).length;
        let archived = categoryNotes.filter(note => note.isArchived).length;
        
        let liTag = `<table class="category">
                        <trclass="details">
                            <td class ="note_categoty">${category}</td>
                            <td class="active">${active}</td>
                            <td class="archived"> ${archived}</td>
                             
                        </trclass=>
                       
                    </table>`;
                 
                    d1.insertAdjacentHTML("afterend", liTag);
                    
                });
}
showCategories();