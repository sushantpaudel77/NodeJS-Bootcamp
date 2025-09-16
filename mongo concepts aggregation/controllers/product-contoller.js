const Product = require('../models/Product')

const getProductsStats = async (req, res) => {
    try {
        const result = await Product.aggregate([{
            $match: {
                inStock: true,
                price: {
                    $gte: 200
                }
            }
        }])

        res.status(200).json({
            success: true,
            data: result
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}

const insertSampleProducts = async (req, res) => {
    try {
        const sampleProducts = [
            {
                name: "Wireless Mouse",
                category: "Electronics",
                price: 300,
                inStock: true,
                tags: ["computer", "accessories", "wireless"]
            },
            {
                name: "Mechanical Keyboard",
                category: "Electronics",
                price: 150,
                inStock: true,
                tags: ["keyboard", "gaming", "mechanical"]
            },
            {
                name: "Running Shoes",
                category: "Footwear",
                price: 201,
                inStock: false,
                tags: ["sports", "fitness", "comfortable"]
            },
            {
                name: "Denim Jacket",
                category: "Clothing",
                price: 200,
                inStock: true,
                tags: ["fashion", "winter", "casual"]
            },
            {
                name: "Coffee Mug",
                category: "Home & Kitchen",
                price: 80,
                inStock: false,
                tags: ["kitchen", "drinkware", "ceramic"]
            }
        ];

        const result = await Product.insertMany(sampleProducts);
        res.status(201).json({
            success: true,
            data: `Inserted ${result.length} sample products`,
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}

const deleteAllProducts = async (req, res) => {
  try {
    const result = await Product.deleteMany({}); // removes all docs

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} products successfully`
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Some error occurred'
    });
  }
};

module.exports = { insertSampleProducts, getProductsStats, deleteAllProducts };
