const defaultNotes = []

function insertDefault() {
 if (defaultNotes.length && defaultNotes.length > 0) return;
 let createdDate = new Date(),
  month = ("0" + (createdDate.getMonth() + 1)).slice(-2);
  (day = createdDate.getDate()), (year = createdDate.getFullYear());
  let dates = [];
  dates.push(`${year}-${month}-${day}`);

    let noteTask1Info = {
        id: 1,
        categoryId: 'uil-shopping-cart-alt',
        title: 'Task 1',
        description: 'Description 1',
        category: 'Task',
        isArchived: false,
        dates,
    };
    let noteTask2Info = {
        id: 2,
        categoryId: 'uil-shopping-cart-alt',
        title: 'Task 2',
        description: 'Description 2',
        category: 'Task',
        isArchived: false,
        dates,
    };
    let noteRandomThought1Info = {
        id: 3,
        categoryId: 'uil-bright',
        title: 'Random Thought 1',
        description: 'Description Random Thought 1',
        category: 'Random Thought',
        isArchived: false,
        dates,
    };
    let noteRandomThought2Info = {
        id: 4,
        categoryId: 'uil-bright',
        title: 'Random Thought 2',
        description: 'Description Random Thought 2',
        category: 'Random Thought',
        isArchived: false,
        dates,
    };
    let noteIdea1Info = {
        id: 5,
        categoryId: 'uil uil-folder-plus',
        title: 'Idea 1',
        description: 'Description Idea 1',
        category: 'Idea',
        isArchived: false,
        dates,
    };
    let noteIdea2Info = {
        id: 6,
        categoryId: 'uil uil-folder-plus',
        title: 'Idea 2',
        description: 'Description Idea 2',
        category: 'Idea',
        isArchived: false,
        dates,
    };
    let noteQuote1Info = {
        id: 7,
        categoryId: 'uil-google-hangouts',
        title: 'Quote Task',
        description: 'Description Quote',
        category: 'Quote',
        isArchived: false,
        dates,
    };
 
    defaultNotes.push(noteTask1Info);
    defaultNotes.push(noteTask2Info);
    defaultNotes.push(noteRandomThought1Info);
    defaultNotes.push(noteRandomThought2Info);
    defaultNotes.push(noteIdea1Info);
    defaultNotes.push(noteIdea2Info);
    defaultNotes.push(noteQuote1Info);
 localStorage.setItem("notes", JSON.stringify(defaultNotes));
}
insertDefault();