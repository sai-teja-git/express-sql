import { EntitySchema } from 'typeorm';

const user = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            generated: true,
            type: "int",
        },
        username: {
            type: "varchar",
            length: 50,
            unique: true,
        },
        name: {
            type: "varchar",
            length: 100,
        },
        email: {
            type: "varchar",
            length: 100,
            unique: true,
        },
        password: {
            type: "varchar",
            length: 100,
        },
        last_login: {
            type: "timestamp",
            nullable: true,
            default: null
        },
        created_at: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
        update_at: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
        },
    },
    indexes: [
        {
            name: "IDX_USER_NAME",
            columnNames: ["username"]
        }
    ]
})

export default user;