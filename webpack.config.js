import path from "path";

let jsPath = "./src/public/js/";
let publicRoutes = "public/js/routes/";

export default {
    mode: "development",
    entry: {
        map: `${jsPath}map.js`,
        insertImage: `${jsPath}insertImage.js`,
        create: {
            import: [
                `${jsPath}routes/user/property/create.js`
            ],
            filename: `routes/user/property/create.js`
        },
        validation: {
            import: [
                `${jsPath}validation/validateProperty.js`
            ],
            filename: `validation/validation.js`
        }
    },
    output: {
        filename: "[name].js",
        path: path.resolve("public/js")
    }
};
