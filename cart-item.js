const express = require('express');
const cartItemsRoute = express.Router();

const cartItemArray = [
    {id: 1, product: 'deodorant', price: 3, quantity: 6},
    {id: 2, product: 'body wash', price: 6, quantity: 5},
    {id: 3, product: 'toothbrush', price: 2, quantity: 2},
    {id: 4, product: 'toothpaste', price: 4, quantity: 3},
]

cartItemsRoute.get('/', (req, res) => {
    let cartItemsToSend = cartItemArray;
    if (req.query.maxPrice) {
        cartItemsToSend = cartItemsToSend.filter(c => c.price <= req.query.maxPrice);
    }
    if (req.query.prefix) {
        cartItemsToSend = cartItemsToSend.filter(c => c.product.startsWith(req.query.prefix));
    }
    if (req.query.pageSize) {
        cartItemsToSend = cartItemsToSend.slice(0, req.query.pageSize);
    }
    res.send(cartItemsToSend);
})

cartItemsRoute.get('/:id', (req, res) => {
    const cartItem = cartItemArray.find(item => item.id == req.params.id);
    if (!cartItem) {
        res.sendStatus(404);
    }
    res.send(cartItem);
})

cartItemsRoute.post('/', (req, res) => {
    const lastIndexInArray = cartItemArray.length - 1;
    const lastItemsId = cartItemArray[lastIndexInArray].id;
    const newCartItem = {
        id: lastItemsId + 1,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity
    }
    cartItemArray.push(newCartItem);
    res.status(201).send(newCartItem);
    res.send(newCartItem);
})

cartItemsRoute.put('/:id', (req, res) => {
    const itemWithCorrectId = cartItemArray.find(c => c.id == req.body.id);
    const indexOfCorrectItem = cartItemArray.indexOf(itemWithCorrectId);
    cartItemArray[indexOfCorrectItem] = {
        id: itemWithCorrectId.id,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity
    }
    res.send(cartItemArray[indexOfCorrectItem]);
})

cartItemsRoute.delete('/:id', (req, res) => {
    const itemWithCorrectId = cartItemArray.find(c => c.id == req.params.id);
    const indexOfCorrectItem = cartItemArray.indexOf(itemWithCorrectId);
    cartItemArray.splice(indexOfCorrectItem, 1);
    res.sendStatus(204);
})

module.exports = cartItemsRoute;