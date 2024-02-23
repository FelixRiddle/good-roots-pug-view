import { DataTypes } from "sequelize";

import { MSQLDC_FetchENV, User } from "express-authentication";

/**
 * This doesn't looks good but anyways
 * 
 * The problem is that env variables are not fetched at the start
 */
function userMessagesModel() {
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
    
    return UserMessages;
}

export default UserMessages;
