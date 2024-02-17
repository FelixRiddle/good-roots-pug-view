import { DataTypes } from "sequelize";

import db from "../config/db.js";

const DebugPropertyImageUpload = db.define("debug-property-image-upload", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    // Action type
    // 'validate_image_size'
    action: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Image information
    image_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // State information
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "debug-property-image-upload",
});

export default DebugPropertyImageUpload;
