const express = require('express');
const port = 3000;
const app = express();
const cartItems = require('./cart-item')

app.use(express.json());
app.use('/cart-items', cartItems)

app.listen(port, () => console.log(`listening on port: ${port}`));