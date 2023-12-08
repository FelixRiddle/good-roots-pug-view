import path from "path";

let jsPath = "./src/public/js/";
let publicRoutes = "./src/public/js/routes/";

export default {
    mode: "development",
    entry: {
        map: `${jsPath}map.js`,
        insertImage: `${jsPath}insertImage.js`,
        create: {
            import: [
                `${publicRoutes}user/property/create.js`
            ],
            filename: `routes/user/property/create.js`
        },
        validation: {
            import: [
                `${jsPath}validation/validateProperty.js`
            ],
            filename: `validation/validation.js`
        },
        navbar: {
            import: [
                `${jsPath}navbar/index.js`
            ],
            filename: "navbar/index.js"
        }
    },
    output: {
        filename: "[name].js",
        path: path.resolve("public/js")
    }
};
