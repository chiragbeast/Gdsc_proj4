import express from 'express';
import Url from '../models/url.js';
import * as shortid from 'shortid';
const router = express.Router();

router.get('/details/:url', async (req, res) => {
    const { url } = req.params;
  
    try {
      // Check if the URL is a short URL
      const urlDoc = await Url.findOne({ shortUrl: url });
      if (urlDoc) {
        return res.json({
          longUrl: urlDoc.longUrl,
          shortUrl: urlDoc.shortUrl,
          hitCounts: urlDoc.visitCount,
        });
      }
  
      // Check if the URL is a long URL
      const longUrlDoc = await Url.findOne({ longUrl: url });
      if (longUrlDoc) {
        return res.json({
          longUrl: longUrlDoc.longUrl,
          shortUrl: longUrlDoc.shortUrl,
          hitCounts: longUrlDoc.visitCount,
        });
      }
  
      res.status(404).json({ error: 'URL not found' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  });
  
 router.get('/top/:number', async (req, res) => {
    const { number } = req.params;
  
    try {
      const topUrls = await Url.find()
        .sort({ visitCount: -1 }) // Sort by hitCounts in descending order
        .limit(Number(number));   // Limit to the specified number
  
      res.json(topUrls.map(url => ({
        longUrl: url.longUrl,
        shortUrl: url.shortUrl,
        hitCounts: url.visitCount,
      })));
    } catch (err) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  });
  


// POST /shorten - Create a short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) return res.status(400).json({ error: 'Long URL is required' });

  try {
    // Check if URL already exists
    let url = await Url.findOne({ longUrl });
    if (url) {
      return res.json({ shortUrl: `http://localhost:3000/${url.shortUrl}` });
    }

    // Create new short URL
    const shortUrl = shortid.generate();
    url = new Url({ longUrl, shortUrl });
    await url.save();

    res.json({ shortUrl: `http://localhost:3000/${shortUrl}` });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /:shortUrl - Redirect to long URL or ad page
router.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });
    if (!url) return res.status(404).json({ error: 'URL not found' });

    // Increment visit count
    url.visitCount++;
    await url.save();

    // Redirect to an ad page every 10th visit
    if (url.visitCount % 10 === 0) {
      return res.redirect('https://example.com/advertisement'); // Replace with your ad page URL
    }

    // Redirect to the original long URL
    res.redirect(url.longUrl);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

