import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_URL
  || 'mongodb://localhost/movie-api-drb';

export default (app) => {
  mongoose.connect(mongoUrl, {}, (err) => {
    if (err) {
      return console.log(
        'Mongoose - connection error:',
        err,
      );
    }
  });

  return mongoose;
};
