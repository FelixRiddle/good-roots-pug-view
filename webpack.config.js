import path from "path";

let jsPath = "./src/public/js/";
let publicRoutes = "./src/public/js/routes/";

/**
 * This is awful, but I don't know and I don't have time to improve it.
 */
export default {
    mode: "development",
    entry: {
        auth: {
            import: [
                `${publicRoutes}auth/register.js`
            ],
            filename: "routes/auth/register.js"
        },
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
        // Lib
        // Libraries shouldn't be separated into different scripts upon build
        lib_visibility: {
            import: [
                `${jsPath}lib/visibility/hideOnOutsideClick.js`,
                `${jsPath}lib/visibility/PopUpElementVisibilityHandler.js`,
                `${jsPath}lib/visibility/toggleVisible.js`
            ],
            filename: `js/lib/visibility.js`
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
