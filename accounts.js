const express = require('express');
const router = express.Router();
let users = []
router.post('/register', (req, res) => {
    const { name, balance } = req.body;    
    if (!name || !balance || isNaN(balance)) {
        return res.status(400).json({ message: 'Veuillez fournir un nom et un solde valides.' });
    }
    const newUser = {
        id: users.length + 1,
        name,
        balance: parseFloat(balance)
    };
    users.push(newUser);
    return res.status(201).json(newUser);
});
router.get('/account/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    return res.status(200).json(user);
});
router.put('/account/update', (req, res) => {
    const { userId, newBalance } = req.body;
    if (!userId || isNaN(newBalance)) {
        return res.status(400).json({ message: 'Veuillez fournir un ID utilisateur et un nouveau solde valides.' });
    }
    const userIdInt = parseInt(userId);
    const newBalanceFloat = parseFloat(newBalance);
    const userIndex = users.findIndex(user => user.id === userIdInt);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    users[userIndex].balance = newBalanceFloat;
    return res.status(200).json(users[userIndex]);
});
router.delete('/account/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    users = users.filter(user => user.id !== userId);
    return res.status(204).end();
});
module.exports = router;
