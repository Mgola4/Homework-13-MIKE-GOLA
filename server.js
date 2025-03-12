const express = require('express');
const app = express();
const port = 3000;

// Simulating localStorage with a simple array
let dataStore = [];

// Middleware to parse JSON bodies
app.use(express.json());

// GET route to fetch data
app.get('/api/items', async (req, res) => {
    try {
        // Returning the stored items as a JSON response
        res.status(200).json({ items: dataStore });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// POST route to add new data
app.post('/api/items', async (req, res) => {
    try {
        // Ensure that the request body contains a name
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        // Add the new item to the dataStore
        dataStore.push({ name });

        // Return confirmation
        res.status(201).json({ message: 'Item added successfully', item: { name } });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add item' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
