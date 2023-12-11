import path from "path";

let jsPath = "./src/public/js/";
let publicRoutes = "./src/public/js/routes/";

export default {
    mode: "development",
    entry: {
        controller1: {
            import: [
                `${jsPath}controller/statusMessages.js`
            ],
            filename: "controller/statusMessages.js"
        },
        formularies: {
            import: [
                `${jsPath}formularies/index.js`
            ],
            filename: "formularies/index.js"
        },
        insertImage: `${jsPath}insertImage.js`,
        global1: {
            import: [
                `${jsPath}global/location.js`
            ],
            filename: `js/global/location.js`
        },
        map: `${jsPath}map.js`,
        navbar: {
            import: [
                `${jsPath}navbar/index.js`
            ],
            filename: "navbar/index.js"
        },
        // Properties
        property1: {
            import: [
                `${publicRoutes}user/property/edit.js`
            ],
            filename: `routes/user/property/edit.js`
        },
        property2: {
            import: [
                `${publicRoutes}user/property/create.js`,
            ],
            filename: `routes/user/property/create.js`
        },
        validation: {
            import: [
                `${jsPath}validation/validateProperty.js`
            ],
            filename: `validation/validation.js`
        },
    },
    output: {
        // filename: "[name].js",
        path: path.resolve("public/js")
    }
};
