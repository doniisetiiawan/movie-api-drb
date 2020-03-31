import Movie from '../models/movie';
import Actor from '../models/actor';

export default {
  // eslint-disable-next-line no-unused-vars
  getAll(req, res, next) {
    Movie.find((err, movies) => {
      if (err) return res.status(400).json(err);

      res.status(200).json(movies);
    });
  },

  // eslint-disable-next-line no-unused-vars
  createOne(req, res, next) {
    Movie.create(req.body, (err, movie) => {
      if (err) return res.status(400).json(err);

      res.status(201).json(movie);
    });
  },

  // eslint-disable-next-line no-unused-vars
  getOne(req, res, next) {
    Movie.findOne({ id: req.params.id })
      .populate('actors')
      .exec((err, movie) => {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();

        res.status(200).json(movie);
      });
  },

  // eslint-disable-next-line no-unused-vars
  updateOne(req, res, next) {
    Movie.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      (err, movie) => {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();

        res.status(200).json(movie);
      },
    );
  },

  // eslint-disable-next-line no-unused-vars
  deleteOne(req, res, next) {
    Movie.findOneAndRemove({ id: req.params.id }, (err) => {
      if (err) return res.status(400).json(err);

      res.status(204).json();
    });
  },

  // eslint-disable-next-line no-unused-vars
  addActor(req, res, next) {
    Movie.findOne({ id: req.params.id }, (err, movie) => {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();

      Actor.findOne({ id: req.body.id }, (err, actor) => {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();

        movie.actors.push(actor);
        movie.save((err) => {
          if (err) return res.status(500).json(err);

          res.status(201).json(movie);
        });
      });
    });
  },

  // eslint-disable-next-line no-unused-vars
  deleteActor(req, res, next) {
    Movie.findOne({ id: req.params.id }, (err, movie) => {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();

      // HACK TO CHANGE
      movie.actors = [];
      movie.save((err) => {
        if (err) return res.status(400).json(err);

        res.status(204).json(movie);
      });
    });
  },
};
