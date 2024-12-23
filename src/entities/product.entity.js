const { EntitySchema } = require('typeorm');

const product = new EntitySchema({
    name: "Product",
    tableName: "product",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        name: {
            type: "varchar",
            length: 50,
        },
        description: {
            type: "varchar",
            length: 250,
        },
        price: {
            type: "int"
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
    relations: {
        brand_id: {
            type: "many-to-one",
            target: "Brand",
            joinColumn: {
                name: "brand_id",
            },
            onDelete: "SET NULL"
        },
        category_id: {
            type: "many-to-one",
            target: "ProductCategory",
            joinColumn: {
                name: "category_id",
            },
            onDelete: "SET NULL"
        },
        vendor_id: {
            type: "many-to-one",
            target: "Vendor",
            joinColumn: {
                name: "vendor_id",
            },
            onDelete: "SET NULL"
        },
    }
})

module.exports = product;