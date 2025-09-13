import Contact from '../models/Contact.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GET /contacts
export const getContacts = async (req, res) => {
  const contacts = await Contact.find({ user: req.user._id });
  res.json(contacts);
};

// GET /contacts/:id
export const getContact = async (req, res) => {
  const contact = await Contact.findOne({ _id: req.params.id, user: req.user._id });
  if (!contact) return res.status(404).json({ message: 'Contact not found' });
  res.json(contact);
};

// POST /contacts
export const createContact = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      address,
      state,
      district,
      country,
      dob,
      occupation,
      qualification,
    } = req.body;

    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    const contact = await Contact.create({
      name,
      email,
      mobile,
      address,
      state,
      district,
      country,
      dob,
      occupation,
      qualification,
      photo,
      user: req.user._id,
    });

    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /contacts/:id
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user._id });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    const {
      name,
      email,
      mobile,
      address,
      state,
      district,
      country,
      dob,
      occupation,
      qualification,
    } = req.body;

    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.mobile = mobile || contact.mobile;
    contact.address = address || contact.address;
    contact.state = state || contact.state;
    contact.district = district || contact.district;
    contact.country = country || contact.country;
    contact.dob = dob || contact.dob;
    contact.occupation = occupation || contact.occupation;
    contact.qualification = qualification || contact.qualification;

    if (req.file) {
      if (contact.photo) {
        const oldPhoto = path.join(__dirname, '../', contact.photo);
        if (fs.existsSync(oldPhoto)) fs.unlinkSync(oldPhoto);
      }
      contact.photo = `/uploads/${req.file.filename}`;
    }

    await contact.save();
    res.json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /contacts/:id
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user._id });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    if (contact.photo) {
      const photoPath = path.join(__dirname, '../', contact.photo);
      if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
    }

    await contact.deleteOne();
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
