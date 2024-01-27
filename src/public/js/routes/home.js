import PropertiesMap from "../lib/property/views/PropertiesMap.js";
import GridPropertiesView from "../lib/property/views/GridPropertiesView.js";

(async() => {
    const propsMap = new PropertiesMap();
    await propsMap.start();
    
    const gridPropertiesView = new GridPropertiesView();
    await gridPropertiesView.setup();
})();
