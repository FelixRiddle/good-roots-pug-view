import path from "path";
import { dirname } from "path";
import { fileURLToPath } from 'url';
import CopyPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let publicFolder = "./src/public";
let jsPath = "./src/public/js/";
let publicRoutes = "./src/public/js/routes/";

/**
 * This is awful, but I don't know and I don't have time to improve it.
 * 
 * I really have to learn webpack haha
 */
export default {
    devtool: "source-map",
    mode: "development",
    entry: {
        auth: {
            import: [
                `${publicRoutes}auth/register.js`
            ],
            filename: "js/routes/auth/register.js"
        },
        config_default_property_images_config: {
            import: [
                `${jsPath}config/propertyImagesConfig.js`
            ],
            filename: "js/config/propertyImagesConfig.js"
        },
        // It's converted to js????
        css_components_property_image_editor: {
            import: [
                `${publicFolder}/css/components/property/ImageEditor.scss`
            ],
            filename: "css/components/property/ImageEditor.js"
        },
        controller1: {
            import: [
                `${jsPath}controller/statusMessages.js`
            ],
            filename: "js/controller/statusMessages.js"
        },
        formularies: {
            import: [
                `${jsPath}formularies/index.js`
            ],
            filename: "js/formularies/index.js"
        },
        insertImage: {
            import: [
                `${jsPath}insertImage.js`,
            ],
            filename: "js/insertImage.js"
        },
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
        lib_property: {
            import: [
                `${jsPath}lib/property/ImageEditor.js`
            ],
            filename: `js/lib/property.js`
        },
        map: {
            import: [`${jsPath}map.js`,],
            filename: "js/map.js"
        },
        navbar: {
            import: [
                `${jsPath}navbar/index.js`
            ],
            filename: "js/navbar/index.js"
        },
        // Properties
        routes_user_property_admin: {
            import: [
                `${publicRoutes}user/property/admin.js`
            ],
            filename: `js/routes/user/property/admin.js`
        },
        property1: {
            import: [
                `${publicRoutes}user/property/edit.js`
            ],
            filename: `js/routes/user/property/edit.js`
        },
        property2: {
            import: [
                `${publicRoutes}user/property/create.js`,
            ],
            filename: `js/routes/user/property/create.js`
        },
        validation: {
            import: [
                `${jsPath}validation/validateProperty.js`
            ],
            filename: `js/validation/validation.js`
        },
        // Routes examples
        routes_examples_map_draggable_marker: {
            import: [
                `${publicRoutes}examples/map/draggable_marker.js`
            ],
            filename: "js/routes/examples/map/draggable_marker.js"
        },
        routes_examples_map_live_user: {
            import: [
                `${publicRoutes}examples/map/live_user.js`
            ],
            filename: "js/routes/examples/map/live_user.js"
        },
        routes_examples_map_quick_start: {
            import: [
                `${publicRoutes}examples/map/quick_start.js`
            ],
            filename: "js/routes/examples/map/quick_start.js"
        },
        routes_examples_map_street_name: {
            import: [
                `${publicRoutes}examples/map/street_name.js`
            ],
            filename: "js/routes/examples/map/street_name.js"
        },
        // Multer
        routes_examples_publish_image_dropzone: {
            import: [
                `${publicRoutes}examples/publish_image/dropzone.js`,
            ],
            filename: "js/routes/examples/publish_image/dropzone.js"
        },
        routes_examples_publish_image_multer_multiple_images: {
            import: [
                `${publicRoutes}examples/publish_image/multer_multiple_images.js`,
            ],
            filename: "js/routes/examples/publish_image/multer_multiple_images.js"
        },
        routes_examples_publish_image_multer_example: {
            import: [
                `${publicRoutes}examples/publish_image/multer_example.js`,
            ],
            filename: "js/routes/examples/publish_image/multer_example.js"
        },
        // routes/property/view
        routes_property_view: {
            import: [
                `${publicRoutes}property/view.js`
            ],
            filename: "js/routes/property/view.js"
        },
        // User routes
        routes_user_property_set_image: {
            import: [
                `${publicRoutes}user/property/set_image.js`
            ],
            filename: "js/routes/user/property/set_image.js"
        }
    },
    module: {
        rules: [{
            // Load css files
            test: /\.css$/,
            use: "css-loader"
        }, {
            test: /\.s[ac]ss$/i,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        }, {
            test: /\.js$/,
            include: [
                path.resolve(__dirname, "src/public")
            ],
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env"
                    ]
                }
            }
        }, {
            test: /\.(png|jpg|jpeg|gif)$/i,
            type: 'asset/resource'
        }]
    },
    output: {
        // filename: "[name].js",
        path: path.resolve("public"),
        // Deletes property images 😭😭
        // clean: true,
        assetModuleFilename: '[name][ext]'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/public/image", to: "image" }
            ]
        })
    ]
};
