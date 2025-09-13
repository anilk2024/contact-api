import User from '../models/User.js';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getProfile = (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      address,
      state,
      district,
      country,
      dob,
    } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update basic fields if provided
    user.name = name || user.name;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;
    user.address = address || user.address;
    user.state = state || user.state;
    user.district = district || user.district;
    user.country = country || user.country;
    user.dob = dob || user.dob;

    // Update password if provided
    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Handle photo update
    if (req.file) {
      if (user.photo) {
        const oldPhotoPath = path.join(__dirname, '../', user.photo);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
      user.photo = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: err.message });
  }
};
