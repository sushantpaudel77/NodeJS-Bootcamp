// graphql/resolvers.js
const products = require('../data/products');

// GraphQL resolvers for Product queries and mutations
const resolvers = {
    Query: {
        // Returns all products
        products: () => products,

        // Returns a single product by ID
        product: (_, { id }) => products.find(item => item.id === id),
    },

    Mutation: {
        // Creates a new product and adds it to the products array
        createProduct: (_, { title, category, price, inStock }) => {
            const newProduct = {
                id: String(products.length + 1),
                title,
                category,
                price,
                inStock
            };

            products.push(newProduct);
            return newProduct;
        },

        // Deletes a product by ID, returns true if deleted, false if not found
        deleteProduct: (_, { id }) => {
            const index = products.findIndex((product) => product.id === id);
            if (index === -1) return false;

            products.splice(index, 1);
            return true;
        },

        // Updates a product by ID with provided fields, returns updated product or null if not found
        updateProduct: (_, { id, ...updates }) => {
            const index = products.findIndex((product) => product.id === id);
            if (index === -1) return null;

            const updatedProduct = {
                ...products[index], // existing product fields
                ...updates          // new/updated fields
            }

            products[index] = updatedProduct;

            return updatedProduct;
        }
    },
};

module.exports = resolvers;
