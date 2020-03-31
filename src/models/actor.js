import mongoose from 'mongoose';
import generateId from './plugins/generateId';

const actorSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    index: {
      unique: true,
    },
  },
  name: {
    type: String,
    required: true,
  },
  birth_year: {
    type: Number,
    required: true,
  },
  movies: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Movie',
    },
  ],
});

actorSchema.plugin(generateId());

export default mongoose.model('Actor', actorSchema);
