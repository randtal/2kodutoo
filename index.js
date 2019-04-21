/*jshint esversion:6*/
//console.log("Javascripti fail أµigesti أ¼hendatud");

class Entry{
  constructor(title, description, toDoDate){
    this.title = title;
    this.description = description;
    this.date = toDoDate;
    this.done = false;
  }
}

class ToDo{
  constructor(){
    this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];
    document.querySelector("#addButton").addEventListener('click', () => this.addEntry());
    document.querySelector("#saveButton").addEventListener('click', () => this.saveToFile());
    this.render(this.entries);
  }

  render(entries){
    console.log("entries",entries)
    if(document.querySelector('.todo-list')){
      document.body.removeChild(document.querySelector('.todo-list'));
    }
    const ul = document.createElement('ul');
    ul.className = "todo-list";

    entries.forEach((entry, entryIndex)=>{
      const li = document.createElement('li');
      const removeTaskButton = document.createElement('button');
      const removeIcon = document.createTextNode('\u00D7');

      li.classList.add('entry');
      removeTaskButton.className = "delete-task-button";

      li.addEventListener('click', (event) =>{
        event.target.classList.add('task--completed');

        if(entry.done){
          entry.done = false;

          this.entries = this.entries.slice(0, entryIndex).concat(this.entries.slice(entryIndex+1, this.entries.length));

          this.entries.unshift(entry);

        }else{
          entry.done = true;

          this.entries = this.entries.slice(0, entryIndex).concat(this.entries.slice(entryIndex+1, this.entries.length));

          this.entries.push(entry);
          li.style.textDecoration = "line-through";
          li.style.backgroundColor = "lightgreen";

        }

        //this.saveEntriesInLocalStorage();
        this.render(this.entries);


      });

      if(entry.done){
        li.style.textDecoration = "line-through";
        li.style.backgroundColor = "darkRed";
      }

      removeTaskButton.addEventListener('click', ()=>{
        ul.removeChild(li);
        this.entries = this.entries.slice(0, entryIndex).concat(this.entries.slice(entryIndex+1, this.entries.length));
        console.log("removeTaskButton", this.entries)
        this.saveEntriesInLocalStorage();
        this.render(this.entries);
      });

      removeTaskButton.appendChild(removeIcon);
      li.innerHTML = `${entry.title}<br>${entry.description}<br> ${entry.date}`;
      li.appendChild(removeTaskButton);
      ul.appendChild(li);

    });

    document.body.appendChild(ul);

  }

  addEntry(){
    const titleValue = document.querySelector("#title").value;
    const descriptionValue = document.querySelector("#description").value;
    const dateValue = document.querySelector('#date').value;
    this.entries.push(new Entry(titleValue, descriptionValue, dateValue));
    this.saveEntriesInLocalStorage();
    this.render(this.entries);
    console.log(this.entries);
  }

  saveToFile(){
    $.post('server.php', {save: todos}).done(function(){
      console.log('done');
    }).fail(function(){
      console.log('fail');
    }).always(function(){
      console.log('always');
    });
  }

  saveEntriesInLocalStorage(){
    console.log("saveEntries in localStorage", this.entries)
    window.localStorage.setItem('entries', JSON.stringify(this.entries));
  }
}

let todos = [];

// $('#saveButton').on('click', ()=>saveToFile());
$('#loadButton').on('click', ()=>render());

function render(){
  $('#todos').html("");
  $.get('database.txt', function(data){
    let content = JSON.parse(data).content;

    content.forEach(function(todo, todoIndex){
      console.log(todoIndex);
      $('#todos').append('<ul><li>'+ todo.title+'</li><li>'+ todo.description +'</li><li>'+ todo.date +'</li></ul>');
    });
  });
}


// function saveToFile(){
//   $.post('server.php', {save: todos}).done(function(){
//     console.log('done');
//   }).fail(function(){
//     console.log('fail');
//   }).always(function(){
//     console.log('always');
//   });
// }
const todo = new ToDo();
