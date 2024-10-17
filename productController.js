const Product = require('./product');

// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET PRODUCT BY ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found'}); 
        res.json(product); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ADD PRODUCT
exports.addProduct  = async (req, res) => {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE PRODUCT
exports.updateProductById = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found'}); 
        res.json(updatedProduct); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//REMOVE PRODUCT BY ID
exports.removeProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found'}); 
        res.json({ message: 'Product deleted'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// REMOVE ALL PRODUCTS
exports.removeAllProducts  = async (req, res) => {
    try {
        await Product.deleteMany();
        res.json({message: 'All products deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//FIND PRODUCTS BY NAME
exports.findProductByName  = async (req, res) => {
    const { name } = req.query;
    try {
        const products = await Product.find({ name: {$regex: 'kw', $options: 'i' } });
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};