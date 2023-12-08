/**
 * Reload a formulary
 * 
 * Actually it can reload any element
 * 
 * @param {string} id Formulary id
 */
function reloadFormulary(id) {
    let container = document.getElementById(id);
    if(container) {
        let content = container.innerHTML;
        container.innerHTML = content;
        console.log(`Element restarted!`);
    } else {
        console.log(`Warning: The given formulary with id ${id} was not found`);
    }
}

export {
    reloadFormulary
};
