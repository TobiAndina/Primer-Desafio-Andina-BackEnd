const fs = require('fs');

class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    loadProductsFromFile(filePath) {
        try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        this.products = JSON.parse(jsonData);
        this.updateNextId();
        } catch (error) {
        console.error('Error cargando productos de este archivo:', error);
        }
    }

    updateNextId() {
        if (this.products.length === 0) {
        this.nextId = 1;
        } else {
        const ids = this.products.map(product => product.id);
        this.nextId = Math.max(...ids) + 1;
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Chequeo si el codigo existe o no
        const existingProduct = this.products.find(product => product.code === code);
        if (existingProduct) {
        console.error(`El producto con el codigo '${code}' ya existe.`);
        return;
        }

    // Chequeo si todos las propiedades estan
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Todos los campos son obligatorios.');
        return;
        }

    // Creo el producto
    const product = {
        id: this.nextId,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
    };

    // Incremento el id para el proximo producto
    this.nextId++;

    // Agrego los productos al array
    this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
            return product;
        } else {
            console.error('Product not found.');
          return null; // Return null or throw an error to indicate that the product was not found
        }
        }
    }

// Creo el product manager
const manager = new ProductManager();

// Cargo los productos desde un JSON
manager.loadProductsFromFile('products.json');

// Uso del addProduct
manager.addProduct('ShortBoard 6.4', 'Description 4', 190000, 'ruta/short-6-4.jpg', 'S0003', 4);

// Uso del getProductById
const productId = 3; // reemplazar por el id que quiere buscar
const product = manager.getProductById(productId);
if (product) {
    console.log('Product found by ID:', product);
} else {
    console.log('Product not found.');
}

    
const allProducts = manager.getProducts();
console.log(allProducts);



