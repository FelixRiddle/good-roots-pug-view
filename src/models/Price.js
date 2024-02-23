// import dotenv from "dotenv";

// // Setup dotenv
// dotenv.config({
//     path: ".env"
// });

// console.log(`[Price] Environment setup`);

import { DataTypes } from "sequelize";

import { MSQLDC_FetchENV } from "express-authentication";
import Property from "./Property.js";

const Price = MSQLDC_FetchENV().define("price", {
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    tableName: "price",
});

Property.belongsTo(Price);

export default Price;
