const { EntitySchema } = require("typeorm");

const order = new EntitySchema({
    name: "Order",
    tableName: "order",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true
        },
        discount_percent: {
            type: "float",
        },
        rating: {
            type: "int"
        },
        status: {
            type: "enum",
            enum: ["delivered", "canceled", "returned", "replaced"]
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
    relations: {
        user_id: {
            type: "many-to-one",
            target: "User",
            joinColumn: {
                name: "user_id"
            },
            onDelete: "SET NULL"
        },
        product_id: {
            type: "many-to-one",
            target: "Product",
            joinColumn: {
                name: "product_id"
            },
            onDelete: "SET NULL"
        }
    }
})

module.exports = order