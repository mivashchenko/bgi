const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Pricing Logic
const basePricePerWindow = 50; // base price for tinting a window
const vehicleTypeMultiplier = {
    sedan: 1,
    suv: 1.2,
    truck: 1.3,
    coupe: 1.1,
};

// Function to calculate the total price
const calculateTintingPrice = (windowsCount, vehicleType) => {
    const multiplier = vehicleTypeMultiplier[vehicleType.toLowerCase()] || 1;
    const totalPrice = windowsCount * basePricePerWindow * multiplier;
    return totalPrice;
};

// Endpoint to receive windows count and vehicle info
app.post('/calculate-price', (req, res) => {
    const { windowsCount, vehicleType } = req.body;

    if (!windowsCount || !vehicleType) {
        return res.status(400).json({ error: 'Invalid input data. Please provide both windows count and vehicle type.' });
    }

    const totalPrice = calculateTintingPrice(windowsCount, vehicleType);

    return res.json({
        windowsCount,
        vehicleType,
        totalPrice,
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
