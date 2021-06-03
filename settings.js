const form = document.getElementById("formValueParameters");

/*------------------------------------------*/
/*--return object with the keys focusTime and breakTime values--*/
/*------------------------------------------*/
function getParameter(){
    let parameters = [];
    Array.from(form.elements).map(e => {(e.name) && (parameters[e.name] = e.value)})
    return parameters;
}

function setParametersInLocalStorage(parameters) {
    localStorage.setItem("parameters", JSON.stringify({...parameters}))
}

module.exports = {
    getParameter,
    setParametersInLocalStorage,
}