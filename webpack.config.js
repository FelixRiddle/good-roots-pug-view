import path from "path";

let jsPath = "./src/public/js/";

/**
 * Get the list of files to compile into lib.js on the frontend
 * 
 * @returns {array}
 */
function libFiles() {
    // Forms path
    let formsPath = `${jsPath}lib/form`;
    let formFilesName = [
        "formFetchAllValues",
        "validation",
        "validationResult"
    ];
    let formsSrcs = [];
    for(let fileName of formFilesName) {
        formsSrcs.push(`${formsPath}/${fileName}.js`);
    }
    console.log(`Compilation result: `, formsSrcs);
    
    return formsSrcs;
}

export default {
    mode: "development",
    entry: {
        map: `${jsPath}map.js`,
        insertImage: `${jsPath}insertImage.js`,
        // Libraries
        lib: {
            import: libFiles(),
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
