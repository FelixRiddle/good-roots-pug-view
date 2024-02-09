import PropertiesMap from "../lib/property/views/PropertiesMap.js";
import GridPropertiesView from "../lib/property/views/GridPropertiesView.js";

(async() => {
    console.log(`Properties map view!`);
    try {
        // Don't fucking break
        // I've wasted between 1 hour and 1:30 because this crashes everything, crash yourself
        const propsMap = new PropertiesMap();
        await propsMap.start();
    } catch(err) {
        
    }
    
    console.log(`Code didn't crash, continuing!`);
    
    try {
        const gridPropertiesView = new GridPropertiesView();
        await gridPropertiesView.setup();
    } catch(err) {
        
    }
})();
