const input = document.getElementById('Question');
const button = document.getElementById('buttonQuestion');
const component = document.getElementById('NewQuestion');
const story = document.getElementById('story');
const delate = document.createElement('button');
const database = firebase.database();


let id2;
let ref;
let Objquestion, objStory;
let view = false;

if (id2 === undefined) {

    database.ref('preguntas/historia').set(null);

}



add = () => {

    let text = document.createElement('div');
    let puntaje = document.createElement('div');

    
    puntaje.className = 'puntaje';


    if (id2 === undefined) {

        database.ref('preguntas/actuales').set(null);


        ref = database.ref('preguntas/actuales').push()
        id2 = ref.key;

    } else {

        let newref = database.ref('preguntas/historia/').push()
        newref.set(objStory);

        database.ref('preguntas/actuales/'+id2).set(null);

        ref = database.ref('preguntas/actuales').push()
        id2 = ref.key;

    }


    let question = input.value;

    Objquestion = {

        id: id2,
        pregunta: question,
        votantes: '0',
        sumatoria: '0',
        puntaje: '0',


    }

    ref.set(Objquestion);


    component.innerHTML = ('');
    input.innerHTML = ('');

   

    database.ref('preguntas/actuales/' + id2).on('value',

        (data) => {

            if(data.hasChildren()){
            let get = data.val();
            let pregunta = get.pregunta;
            let promedio = get.puntaje;
            text.innerHTML = (pregunta);
            puntaje.innerHTML = (promedio);
            delate.innerHTML = ('Eliminar');


            objStory = {
                id:id2,
                pregunta: pregunta,
                puntaje: promedio,

            }
            
        
            
            } else {

                text.innerHTML = ('Realice una pregunta');
                puntaje.innerHTML = ('');
                delate.innerHTML = ('');

            
            }

        }

        

    );
    component.appendChild(text);
    component.appendChild(delate);
    component.appendChild(puntaje);

    
    

    


    


}

database.ref('preguntas/historia').on('value', function (data) {

    

    let text = document.createElement('div');
    let puntaje = document.createElement('div');

    puntaje.className = 'puntaje';


    data.forEach(

        buscar => {

            let getStory = buscar.val();
            let pregunta = getStory.pregunta;
            let promedio = getStory.puntaje;
            text.innerHTML = (pregunta);
            puntaje.innerHTML = (promedio);

            story.appendChild(text);
            story.appendChild(puntaje);



        }



    );




});






button.addEventListener('click', add);
delate.addEventListener('click',() =>{

    database.ref('preguntas/actuales/'+id2).set(null);



})