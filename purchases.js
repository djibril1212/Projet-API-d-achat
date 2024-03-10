const express = require('express');
const router = express.Router();
const { users } = require('./data');
let products = [{ id: 1, name: 'Product 1', price: 10 }];
router.get('/products', (req, res) => {
    return res.status(200).json(products);
});
router.post('/purchase', (req, res) => {
    const { userId, itemId } = req.body;
    if (!userId || !itemId) {
        return res.status(400).json({ message: 'Veuillez fournir un ID utilisateur et un ID produit valides.' });
    }
    const userIdInt = parseInt(userId);
    const itemIdInt = parseInt(itemId);
    const user = users.find(user => user.id === userIdInt);
    const product = products.find(product => product.id === itemIdInt);
    if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    if (!product) {
        return res.status(404).json({ message: 'Produit non trouvé.' });
    }
    if (user.balance < product.price) {
        return res.status(301).json({ message: 'Fonds insuffisants.' });
    }
    user.balance -= product.price;
    user.purchases.push(product);
    return res.status(200).json({ message: 'Achat réussi.' });
});
router.get('/purchases/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    return res.status(200).json(user.purchases);
});
module.exports = router;