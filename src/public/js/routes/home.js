import PropertiesMap from "../lib/property/views/PropertiesMap.js";
import GridPropertiesView from "../lib/property/views/GridPropertiesView.js";

(async() => {
    console.log(`Properties map view!`);
    try {
        const propsMap = new PropertiesMap();
        await propsMap.start();
    } catch(err) {
        console.error(err);
    }
    
    try {
        const gridPropertiesView = new GridPropertiesView();
        await gridPropertiesView.setup();
    } catch(err) {
        console.error(err);
    }
})();
