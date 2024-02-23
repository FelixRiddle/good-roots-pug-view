// import dotenv from "dotenv";

// // Setup dotenv
// dotenv.config({
//     path: ".env"
// });

// console.log(`[UserMessages] Environment setup`);

import { DataTypes } from "sequelize";

import { MSQLDC_FetchENV, User } from "express-authentication";

const UserMessages = MSQLDC_FetchENV().define("user-messages", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
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
    tableName: "user-messages",
});

UserMessages.belongsTo(User);

export default UserMessages;
