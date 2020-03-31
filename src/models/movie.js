import mongoose from 'mongoose';
import generateId from './plugins/generateId';

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    index: {
      unique: true,
    },
  },
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  actors: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Actor',
    },
  ],
});

movieSchema.plugin(generateId());

export default mongoose.model('Movie', movieSchema);
