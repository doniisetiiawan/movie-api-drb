import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_URL
  || 'mongodb://localhost/movie-api-drb';

export default () => {
  mongoose.connect(
    mongoUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        return console.log(
          'Mongoose - connection error:',
          err,
        );
      }
    },
  );

  return mongoose;
};
