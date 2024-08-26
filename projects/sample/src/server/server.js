const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Function to fetch subscriber count with retry logic
async function fetchSubscriberCountWithRetry(url, retries = 3) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 60000, // Set a higher timeout to avoid early timeouts
        });

        const subCount = await page.evaluate(() => {
            const digitElements = document.querySelectorAll('.id_odometer__dDC1d.mainOdometer .odometer-inside .odometer-digit');
            const digits = Array.from(digitElements).map(el => {
                const activeDigit = el.querySelector('.odometer-value').textContent.trim();
                return activeDigit;
            });
            return digits.join('');
        });

        await browser.close();
        return subCount;
    } catch (error) {
        if (retries > 0) {
            console.warn(`Retrying... attempts left: ${retries - 1}`);
            return fetchSubscriberCountWithRetry(url, retries - 1);
        } else {
            console.error('Failed to fetch subscriber count after multiple attempts:', error);
            await browser.close();
            throw error;
        }
    }
}

// API endpoint to get subscriber count
app.get('/api/subscriber-count', async (req, res) => {
    const url = 'https://socialcounts.org/youtube-live-subscriber-count/UCtxD0x6AuNNqdXO9Wp5GHew';

    console.log(`Client request received at ${new Date().toISOString()}`);

    try {
        const subCount = await fetchSubscriberCountWithRetry(url);
        console.log('Extracted subscriber count:', subCount);
        res.json({ subscriber_count: subCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch subscriber count' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});