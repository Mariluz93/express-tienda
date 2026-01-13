const express = require('express');
const app = express();
const PORT = 3000;

const productsData = [
    { id: 1, name: 'Portátil HP', price: 799, category: 'electrónica', stock: 15 },
    { id: 2, name: 'iPhone 14', price: 999, category: 'electrónica', stock: 25 },
    { id: 3, name: 'Camiseta Nike', price: 29, category: 'ropa', stock: 50 },
    { id: 4, name: 'Zapatillas Adidas', price: 89, category: 'ropa', stock: 30 },
    { id: 5, name: 'Mesa IKEA', price: 149, category: 'hogar', stock: 10 },
    { id: 6, name: 'Silla oficina', price: 199, category: 'hogar', stock: 20 },
    { id: 7, name: 'Auriculares Sony', price: 159, category: 'electrónica', stock: 40 },
    { id: 8, name: 'Teclado mecánico', price: 129, category: 'electrónica', stock: 18 },
    { id: 9, name: 'Pantalón Levi\'s', price: 79, category: 'ropa', stock: 35 },
    { id: 10, name: 'Chaqueta North Face', price: 199, category: 'ropa', stock: 22 },
    { id: 11, name: 'Lámpara LED', price: 45, category: 'hogar', stock: 60 },
    { id: 12, name: 'Alfombra', price: 69, category: 'hogar', stock: 15 },
    { id: 13, name: 'Tablet Samsung', price: 399, category: 'electrónica', stock: 12 },
    { id: 14, name: 'Smart TV LG 55"', price: 699, category: 'electrónica', stock: 8 },
    { id: 15, name: 'Sudadera Puma', price: 49, category: 'ropa', stock: 45 },
    { id: 16, name: 'Estantería', price: 89, category: 'hogar', stock: 14 },
    { id: 17, name: 'Ratón inalámbrico', price: 25, category: 'electrónica', stock: 70 },
    { id: 18, name: 'Gafas de sol Ray-Ban', price: 159, category: 'ropa', stock: 28 },
    { id: 19, name: 'Sofá 3 plazas', price: 599, category: 'hogar', stock: 5 },
    { id: 20, name: 'Cafetera Nespresso', price: 179, category: 'hogar', stock: 25 },
];

//FUNCION para filtrar productos por CATEGORIA:
function prodCategory(category) {
    return productsData.filter(prod => prod.category === category);
}

//FUNCION para filtrar productos por PRECIO
function prodPrice(type) {
    return productsData.filter(prod => {
        if (type === 'barato') {
            return prod.price < 100;
        } else if (type === 'caro') {
            return prod.price >= 100;
        }
    });
}

//FUNCION para renderizar la página
function renderProdPage(title, products) {
    let productList = '';
    products.forEach(prod => {
        productList += `<li>${prod.name} - ${prod.price}€ (Stock: ${prod.stock})</li>`;
    });

    return `
        <!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>${title}</title>
            </head>
            <body>
                <h1>${title}</h1>
                <p>Total de productos: ${products.length}</p<
                <ul>
                    ${productList}
                </ul>
                <a href="/">Volver a Inicio</a>
            </body>
        </html>
    `;
};

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Tienda Online</title>
            </head>
            <body>
                <h1>Bienvenido a nuestra tienda</h1>
                <h2>Aquí podrás encontrar todo tipo de productos y con todo tipo de precios</h2>
                <ul>
                    <li><a href="/electronica">Electrónica</a></li>
                    <li><a href="/ropa">Ropa</a></li>
                    <li><a href="/hogar">Hogar</a></li>
                </ul>
                <a href="/productos">Ver todos los productos</a>
                <a href="/productos/baratos">Productos baratos</a>
                <a href="/productos/caros">Productos caros</a>
            </body>
        </html>
    `);
});

app.get('/electronica', (req, res) => {
    const products = prodCategory('electrónica');
    res.send(renderProdPage('Productos de Electrónica', products));
});

app.get('/ropa', (req, res) => {
    const products = prodCategory('ropa');
    res.send(renderProdPage('Productos de Ropa', products));
});

app.get('/hogar', (req, res) => {
    const products = prodCategory('hogar');
    res.send(renderProdPage('Productos de Hogar', products));
});

app.get('/productos/baratos', (req, res) => {
    const products = prodPrice('barato');
    res.send(renderProdPage('Productos baratos', products));
});

app.get('/productos/caros', (req, res) => {
    const products = prodPrice('caro');
    res.send(renderProdPage('Productos caros', products));
});

app.get('/productos', (req, res) => {
    res.send(renderProdPage('Todos los productos', productsData));
});

app.use((req, res) => {
    res.status(404).send('<h1>Error 404 - Page not found</h1><a href="/">Home</a>')
});

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
});