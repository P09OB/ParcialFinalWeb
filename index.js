const input = document.getElementById('Question');
const button = document.getElementById('buttonQuestion');
const component = document.getElementById('NewQuestion');
const story = document.getElementById('story');
const database = firebase.database();
let id2;
let ref;
let pregunta;
let Objquestion, objStory;
let idhistoria;


add = () => {

    let text = document.createElement('div');
    let puntaje = document.createElement('div');
    puntaje.className = 'puntaje';


    if (id2 === undefined) {

        ref = database.ref('preguntas/actuales').push()
        id2 = ref.key;

        let refNew = database.ref('preguntas/actual/').push()
        id3 = refNew.key;
        let obj = {
            id: id2,
        }
        refNew.set(obj);

        ref.set(id2);




    } else {

        let newref = database.ref('preguntas/historia/').push()
        idhistoria = newref.key;
        newref.set(objStory);
        //database.ref('preguntas/actuales/'+id2).set(null);
        ref = database.ref('preguntas/actuales').push()
        id2 = ref.key;

        let refNew = database.ref('preguntas/actual/' + id3)
        let obj = {
            id: id2,
        }
        refNew.set(obj);

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

    database.ref('preguntas/actuales/' + id2).on('value',

        (data) => {

            let get = data.val();
            pregunta = get.pregunta;
            let promedio = get.puntaje;
            text.innerHTML = (pregunta);
            puntaje.innerHTML = (promedio);

            objStory = {
                id:id2,
                pregunta: pregunta,
                puntaje: promedio,
            }

        }

        

    );


    component.appendChild(text);
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