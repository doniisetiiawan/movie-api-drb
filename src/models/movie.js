import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
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

export default mongoose.model('Movie', movieSchema);
