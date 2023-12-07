import bcrypt from "bcrypt";

const users = [
    {
        name: "Felix",
        email: "felix@email.com",
        confirmedEmail: 1,
        password: bcrypt.hashSync("asd12345", 10)
    }, {
        name: "Eugene",
        email: "eugene@example.com",
        confirmedEmail: 1,
        password: bcrypt.hashSync("asd12345", 10)
    }
];

export default users;
