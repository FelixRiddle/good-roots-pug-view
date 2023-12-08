
let description = document.getElementById("description");
if(description) {
    description.addEventListener("change", (e) => {
        let el = e.target;
        console.log(`New value: ${el.value}`);
        description.value = el.value;
    })
} else {
    console.log(`Couldn't find description element!`);
}
