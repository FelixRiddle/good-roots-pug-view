
/**
 * Convert a form to json
 */
export function jsonForm(formId) {
    const form = document.getElementById(formId);
    if(!form) {
        console.error("No form with id: ", formId);
        return;
    }
    
    let data = {};
    const formData = new FormData(form);
    formData.forEach((value, key) => data[key] = value);
    
    return data;
}
