import mongoose from 'mongoose';

const actorSchema = new mongoose.Schema({
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

export default mongoose.model('Actor', actorSchema);
