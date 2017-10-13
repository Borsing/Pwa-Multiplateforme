function saveNote(){
    var searchParams = new URLSearchParams(window.location.search);
    var id = searchParams.get("id");

    note = document.getElementById("areanote").value ;

    localStorage.setItem("note_" + id, note)
}

function loadNote(){
    var searchParams = new URLSearchParams(window.location.search);
    var id = searchParams.get("id");
    var note = localStorage.getItem("note_" + id);
    document.getElementById("areanote").value = note ;
}