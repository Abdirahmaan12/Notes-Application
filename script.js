const addBtn = document.querySelector('#add')

//getting data from the local storage

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes){
    for (const note of notes) {
        addNewNote(note)
    }
}


addBtn.addEventListener('click', ()=> addNewNote(""))

 function addNewNote(text = "")
 {
    const note = document.createElement('div')
    note.classList.add('note')
    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `


    const editBtn = note.querySelector('.edit'),
            deleteBtn = note.querySelector('.delete'),
            main = note.querySelector('.main'),
            textArea = note.querySelector('textarea');


    //displaying text from local storage
    textArea.value = text
    main.innerHTML = marked.parse(text)

    //deleting the note

    deleteBtn.addEventListener('click', ()=>{
        note.remove()
        updateLocalStorage()
    })

    //toggling the edit mode 

    editBtn.addEventListener('click',()=>{
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    } )


    //copying text to the .main element

    textArea.addEventListener('input', (event)=>{
        const value = event.target.value
        main.innerHTML = marked.parse(value)

        updateLocalStorage()
    })



    document.body.appendChild(note)
 }


function updateLocalStorage(){

    const textAreas = document.querySelectorAll('textarea')
    const notes = []

    for (const textArea of textAreas) {
        notes.push(textArea.value)
        
        
    }

    localStorage.setItem('notes', JSON.stringify(notes))

}