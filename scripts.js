//creacion de variables

const dayName = document.getElementById('dayName');
const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');


//contenedor de las tareas

const taskContainer = document.getElementById('taskContainer');


//declaramos setDate, funcion para formatear la fecha

const setDate = () => {
    //fecha actual
    const date = new Date();
    //cambiamos el textContent con date.toLocaleString, en español y el dia en valor numerico para datenumber.
    day.textContent = date.toLocaleString('es', {day:'numeric'});
    dayName.textContent = date.toLocaleString('es', {weekday:'long'});
    month.textContent = date.toLocaleString('es', {month:'short'});
    year.textContent = date.toLocaleString('es', {year:'numeric'});
};



//EVENTO agregar una nueva tarea, llamada cuando se envia el form (se agrega una nueva tarea)

const newTask = event =>{
    //para que el form no haga submit y direccione a otra pagina
    event.preventDefault();
    //obtenemos el valor del input
    const{value}=event.target.task;
    //no agregue tareas vacias
    if(!value) return;
    //elemento div
    const task = document.createElement('div');
    //agregar dos clases, task y roundborder (css)
    task.classList.add('task', 'roundBorder')
    //event listener para cambiar el estado de hecho a por completar
    task.addEventListener('click', changeTaskState)
    //agregar el texto ingresado a la tarea
    task.textContent=value;
    //agregamos los elementos al principio del taskcontainer con prepend
    taskContainer.prepend(task);
    //receteamos el form para ingresar una nueva tarea
    event.target.reset();
};

//recibimos el evento de click 

const changeTaskState = event=>{
    //cuando se hace click en el elemento accedemos a las clases del elemento, si tiene la clase done se la sacamos, sino la agregamos (con toggle)
    event.target.classList.toggle('done')
}



//funcion para ordenar las tareas

const order = () => {
    const done = [];
    const todo = [];
    //accedemos a taskcontainer, accedemos a sus hijos(a cada tarea) y iteramos los elementos con forEach
    taskContainer.childNodes.forEach(x => {
        //si el elemento tiene la clase done lo agregamos al array done, sino agregamos a todo
        x.classList.contains('done') ? done.push(x) : todo.push(x)
    })
    //la funcion devuelve un array devuelve un spread del todo y despues del done
    return[...todo, ...done];
};



//llamar a order aca e iterar cada elemento y agregarlo al taskcontainer

const orderTasks = () =>{
    order().forEach(x => taskContainer.appendChild(x))
}
//llamamos a setDate que setea todos los valores al html
setDate()