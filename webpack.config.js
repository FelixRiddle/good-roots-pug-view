import path from "path";

let someFn = () => {
    
    return {
        insert: "./src/public/js/insertImage.js",
    }
}

export default {
    mode: "development",
    entry: {
        map: "./src/public/js/map.js",
        insertImage: "./src/public/js/insertImage.js",
        ...someFn()
    },
    output: {
        filename: "[name].js",
        path: path.resolve("public/js")
    }
};
