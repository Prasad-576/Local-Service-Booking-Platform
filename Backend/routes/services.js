import express from 'express';
import Service from '../models/Service.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// 1. ADD SERVICE
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('--- ADD SERVICE POST ---');
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    const { providerId, title, customService, description, price, category } = req.body;
    let images = [];
    
    // If an image was uploaded, store the path
    if (req.file) {
      images.push(`/uploads/${req.file.filename}`);
    }

    const newService = new Service({
      providerId,
      title,
      customService,
      description,
      price: Number(price),
      images,
      category,
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add service', error: err.message });
  }
});

// 2. GET ALL SERVICES
router.get('/', async (req, res) => {
  try {
    // Optionally populate provider details
    const services = await Service.find().populate('providerId', 'name email avatar rating');
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
});

// 3. GET SERVICES BY PROVIDER ID
router.get('/provider/:providerId', async (req, res) => {
  try {
    const services = await Service.find({ providerId: req.params.providerId });
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch provider services' });
  }
});

// 4. UPDATE A SERVICE (Without an image upload for simplicity here, but could be extended)
router.put('/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update service' });
  }
});

// 5. DELETE A SERVICE
router.delete('/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete service' });
  }
});

export default router;
