import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },  
  mobile:{type:Number,required:true},
  address:{type:String,required:true},
  state:{type:String,required:true},
  district:{type:String,required:true},
  country:{type:String,required:true},
  dob:{type:Date,required:true},
  occupation:{type:String,required:true},
  qualification:{type:String,required:true},
  photo: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Contact', contactSchema);
