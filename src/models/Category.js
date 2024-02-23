import dotenv from "dotenv";

// Setup dotenv
dotenv.config({
    path: ".env"
});

import { DataTypes } from "sequelize";

import { MSQLDC_FetchENV } from "express-authentication";
import Property from "./Property.js";

const Category = MSQLDC_FetchENV().define("category", {
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    tableName: "category",
});

Property.belongsTo(Category);

export default Category;
