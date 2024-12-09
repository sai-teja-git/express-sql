const { EntitySchema } = require('typeorm');

const vendor = new EntitySchema({
    name: "Vendor",
    tableName: "vendors",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        name: {
            type: "varchar",
            length: 50,
            unique: true,
        },
        contact_name: {
            type: "varchar",
            length: 50,
        },
        address: {
            type: "varchar",
            length: 150,
        },
        mobile: {
            type: "varchar",
            length: 16,
        },
        postal_code: {
            type: "varchar",
            length: 10,
        },
        email: {
            type: "varchar",
            length: 50,
            unique: true,
        },
        website: {
            type: "varchar",
            length: 50,
            nullable: true,
            default: null
        },
        is_active: {
            type: "boolean",
            default: true
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
})

module.exports = vendor;