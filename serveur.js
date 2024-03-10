const express = require('express');
const accountsRoutes = require('./accounts');
const purchasesRoutes = require('./purchases');
const app = express();
app.use(express.json());
app.use(accountsRoutes);
app.use(purchasesRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}.`));