import mongoose from 'mongoose';
import shortid from 'shortid';

const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  visitCount: { type: Number, default: 0 },
});

export default mongoose.model('Url', urlSchema);
