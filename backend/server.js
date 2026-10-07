const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  petName: { type: String, default: '' },
  preferredService: { type: String, default: '' },
  userType: { type: String, default: 'pet-owner', enum: ['pet-owner'] },
  role: { type: String, default: 'pet-owner', enum: ['pet-owner'] },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

const bookingSchema = new mongoose.Schema({
  trainerId: { type: Number, required: true },
  trainerName: { type: String, required: true },
  petOwnerId: { type: mongoose.Schema.Types.ObjectId, default: null },
  petOwnerName: { type: String, required: true },
  petOwnerEmail: { type: String, required: true, lowercase: true },
  dogName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  notes: { type: String, default: '' },
  service: { type: String, default: '' },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'] },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

app.post('/api/bookings', async (req, res) => {
  try {
    const {
      trainerId,
      trainerName,
      petOwnerId,
      petOwnerName,
      petOwnerEmail,
      dogName,
      date,
      time,
      notes,
      service
    } = req.body;

    if (!trainerId || !trainerName || !petOwnerName || !petOwnerEmail || !dogName || !date || !time) {
      return res.status(400).json({ message: 'All booking fields are required' });
    }

    const booking = await Booking.create({
      trainerId,
      trainerName,
      petOwnerId: petOwnerId || null,
      petOwnerName,
      petOwnerEmail: petOwnerEmail.toLowerCase(),
      dogName,
      date,
      time,
      notes: notes || '',
      service: service || ''
    });

    res.status(201).json({
      message: 'Consultation booking saved successfully',
      booking: { _id: booking._id, trainerName, dogName, date, time }
    });
  } catch (error) {
    console.error('❌ Booking failed:', error);
    res.status(500).json({ message: 'Server error during booking', detail: error.message });
  }
});

app.post('/api/signup', async (req, res) => {
  try {
    const { fullName, name, email, password, phone, petName, preferredService, userType, role } = req.body;
    const safeName = (fullName || name || '').trim();

    if (!safeName || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      fullName: safeName,
      email: email.toLowerCase(),
      password,
      phone: phone || '',
      petName: petName || '',
      preferredService: preferredService || '',
      userType: 'pet-owner',
      role: role || 'pet-owner'
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: { _id: user._id, name: user.fullName, email: user.email }
    });
  } catch (error) {
    console.error('❌ Signup failed:', error);
    res.status(500).json({
      message: 'Server error during signup',
      detail: error.message
    });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: 'New user? Please sign up first.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { _id: user._id, name: user.fullName, email: user.email }
    });
  } catch (error) {
    console.error('❌ Login failed:', error);
    res.status(500).json({
      message: 'Server error during login',
      detail: error.message
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Kind Paws server is running',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kindpaws';

mongoose.connect(mongoUri)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Kind Paws server running on port ${PORT}`));