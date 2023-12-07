import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

import db from "../config/db.js";
import Property from "./Property.js";

const User = db.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: DataTypes.STRING,
    confirmedEmail: DataTypes.BOOLEAN,
}, {
    hooks: {
        // Before creating the user on the database
        beforeCreate: async function(user) {
            // Hash the password
            const salt = await bcrypt.genSalt(10);
            
            console.log(`User password: ${user.password}`);
            user.password = await bcrypt.hash(user.password, salt);
        }
    },
    scopes: {
        deletePassword: {
            attributes: {
                exclude: [
                    "password",
                    "token",
                    "confirmedEmail",
                    "createdAt",
                    "updatedAt"
                ]
            }
        }
    }
});

// Personalized methods
User.prototype.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

Property.belongsTo(User);

export default User;
