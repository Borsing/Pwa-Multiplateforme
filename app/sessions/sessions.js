function LoadAllSessions(){
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
                type : responseAsJson[i].type,
                title : responseAsJson[i].title,
                description : responseAsJson[i].description,
                speakers : responseAsJson[i].speakers
            } ;
            sessions.push(session);
        }

        //get all different types
        var container = document.getElementById("sessions");
        //add types
        sessions.forEach(session => {
            var containerSession = document.createElement("div");
            containerSession.setAttribute("id",session.id);
            containerSession.innerHTML='<a href=session.html?id='+session.id +'>'+session.title+'</a>';
            container.appendChild(containerSession);
        })
    })
    .catch(function(error) {
        console.log('Une erreur est survenue : ', error);
    });
}

function LoadSession(){
   // var id = URLSearchParams("id");
    var searchParams = new URLSearchParams(window.location.search);
    var id = searchParams.get("id");
    console.log(id)

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
        let session;
        //create array of objects
        for(var i in responseAsJson){
            if(responseAsJson[i].id == id)
                session = responseAsJson[i] ;
        }
        //get container
        var container = document.getElementById("session");
        //Session
        var containerSession = document.createElement("div");
        containerSession.setAttribute("id",session.id);
        //titre
        var containerTitle  = document.createElement("h2")
        containerTitle.setAttribute("class","title")
        containerTitle.innerHTML=session.title;
        containerSession.appendChild(containerTitle);

        //description
        if(session.description != undefined){
            var containerDescription  = document.createElement("p")
            containerDescription.setAttribute("class","description")
            containerDescription.innerHTML=session.description;
            containerSession.appendChild(containerDescription);
        }
        //speaker
        if(session.speakers != undefined)
            session.speakers.forEach(s => {
                var containerSpeaker = document.createElement("div");
                containerSpeaker.setAttribute("id",s);
                containerSpeaker.setAttribute("class","speaker");
                containerSession.appendChild(containerSpeaker);
            })

        container.appendChild(containerSession);
    })
    .catch(function(error) {
        console.log('Une erreur est survenue : ', error);
    });
}


function FindSpeakers(){
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

        //replace id speaker by its link
        var containers = document.getElementsByClassName("speaker");
        for(var i = 0; i < containers.length ; i++){
            var id = containers.item(i).getAttribute("id");
            var speaker = speakers.find(s => s.id == id)
            containers.item(i).innerHTML = '<a href=/app/speakers/speaker.html?id=' + speaker.id +'>'+ speaker.name + '</a>' ;
        }
    })
    .catch(function(error) {
    console.log('Une erreur est survenue : ', error);
    });
}