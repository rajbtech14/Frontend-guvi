function append(value){

    document.getElementById("display").value += value;

}


function cleardisplay(){

    document.getElementById("display").value ="";

}

function backspace(){
    let clearspace = document.getElementById("display");
    clearspace.value = clearspace.value.slice(0,-1);
}


function equalop(){
    try {
        document.getElementById("display").value = eval(document.getElementById("display").value);
    } catch (error) {
        document.getElementById("display").value = "Invalid";
        
    }
    
}