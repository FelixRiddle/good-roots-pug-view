import path from "path";

let jsPath = "./src/public/js/";

export default {
    mode: "development",
    entry: {
        map: `${jsPath}map.js`,
        insertImage: `${jsPath}insertImage.js`,
        // Libraries
        lib: {
            import: [
                `${jsPath}lib/form/formFetchAllValues.js`
            ]
        },
        // Comunication with routes
        routes: {
            import: [
                `${jsPath}routes/user/property/create.js`
            ],
            // To what does it depends on
            dependOn: [
                "lib"
            ]
        }
    },
    output: {
        filename: "[name].js",
        path: path.resolve("public/js")
    }
};
