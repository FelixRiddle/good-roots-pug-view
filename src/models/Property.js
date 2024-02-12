import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Property = db.define("property", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    parking: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    // // Store status messages about the property
    // // Mainly because multer doesn't allow to send messages
    // statusMessages: {
    //     type: DataTypes.JSON,
    //     allowNull: false,
    // },
}, {
    tableName: "property",
});

export default Property;
