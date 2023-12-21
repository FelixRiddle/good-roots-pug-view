import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Property from "./Property.js";

const Price = db.define("price", {
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    tableName: "price",
});

Property.belongsTo(Price);

export default Price;
