function LoadAllSpeakers(){
    fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json')
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
    // lecture du corps de la réponse en tant que JSON.
    return response.json();
    })
    .then(function(responseAsJson) {
        // traitement de l'objet
        var speakers = [];
        //create array of objects
        for(var i in responseAsJson){
            var speaker = {
                id   : responseAsJson[i].id,
                name : responseAsJson[i].name
            } ;
            speakers.push(speaker);
        }

        //get all different types
        var container = document.getElementById("speakers");
        //add types
        speakers.forEach(speaker => {
            var containerSpeaker = document.createElement("div");
            containerSpeaker.setAttribute("id",speaker.id);
            containerSpeaker.innerHTML='<a href=speaker.html?id='+speaker.id +'>'+speaker.name+'</a>';
            container.appendChild(containerSpeaker);
        })
    })
    .catch(function(error) {
        console.log('Une erreur est survenue : ', error);
    });
}


function LoadSpeaker(){
   // var id = URLSearchParams("id");
    var searchParams = new URLSearchParams(window.location.search);
    var id = searchParams.get("id");

    fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json')
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
    // lecture du corps de la réponse en tant que JSON.
    return response.json();
    })
    .then(function(responseAsJson) {
        // traitement de l'objet
        let speaker;
        //create array of objects
        for(var i in responseAsJson){
            if(responseAsJson[i].id == id)
                speaker = responseAsJson[i] ;
        }
        //get container
        var container = document.getElementById("speaker");
        //Session
        var containerSession = document.createElement("div");
        containerSession.setAttribute("id",speaker.id);
        //titre
        var containerTitle  = document.createElement("h2")
        containerTitle.setAttribute("class","name")
        containerTitle.innerHTML=speaker.name;
        containerSession.appendChild(containerTitle);

        //description
        if(speaker.bio != undefined){
            var containerDescription  = document.createElement("p")
            containerDescription.setAttribute("class","bio")
            containerDescription.innerHTML=speaker.bio;
            containerSession.appendChild(containerDescription);
        }

        container.appendChild(containerSession);
    })
    .catch(function(error) {
        console.log('Une erreur est survenue : ', error);
    });
}


function FindSessionBySpeaker(){
    var searchParams = new URLSearchParams(window.location.search);
    var id = parseInt(searchParams.get("id"));
    console.log(parseInt(id));

    fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json')
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
    // lecture du corps de la réponse en tant que JSON.
    return response.json();
    })
    .then(function(responseAsJson) {
        // traitement de l'objet
        var sessions = [];
        //create array of objects
        for(var i in responseAsJson){
            var session = {
                id   : responseAsJson[i].id,
                title : responseAsJson[i].title,
                speakers : responseAsJson[i].speakers
            } ;
            console.log(session.speakers);
            if(session.speakers != undefined && session.speakers.indexOf(id) >= 0){
                sessions.push(session);
            }
        }

        var container = document.getElementById("sessions");
        sessions.forEach(session => {
            var containerSession = document.createElement("div");
            containerSession.setAttribute("id",session.id);
            containerSession.innerHTML='<a href=/app/html/session.html?id='+session.id +'>'+session.title+'</a>';
            container.appendChild(containerSession);
        })

    })
    .catch(function(error) {
    console.log('Une erreur est survenue : ', error);
    });
}