import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Price = db.define("price", {
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }
});

export default Price;
