import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Property from "./Property.js";

const Category = db.define("category", {
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }
});

Property.belongsTo(Category);

export default Category;
