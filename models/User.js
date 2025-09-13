import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { type } from 'os';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile:{type:Number,required:true},
  address:{type:String,required:true},
  state:{type:String,required:true},
  district:{type:String,required:true},
  country:{type:String,required:true},
  dob:{type:Date,required:true},
  photo: { type: String, default: null },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model('User', userSchema);
