import Actor from '../models/actor';
import Movie from '../models/movie';

export default {
  // eslint-disable-next-line no-unused-vars
  getAll(req, res, next) {
    Actor.find((err, actors) => {
      if (err) return res.status(400).json(err);

      res.status(200).json(actors);
    });
  },

  // eslint-disable-next-line no-unused-vars
  createOne(req, res, next) {
    Actor.create(req.body, (err, actor) => {
      if (err) return res.status(400).json(err);

      res.status(201).json(actor);
    });
  },

  // eslint-disable-next-line no-unused-vars
  getOne(req, res, next) {
    Actor.findOne({ _id: req.params.id })
      .populate('movies')
      .exec((err, actor) => {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();

        res.status(200).json(actor);
      });
  },

  // eslint-disable-next-line no-unused-vars
  updateOne(req, res, next) {
    Actor.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      (err, actor) => {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();

        res.status(200).json(actor);
      },
    );
  },

  // eslint-disable-next-line no-unused-vars
  deleteOne(req, res, next) {
    Actor.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) return res.status(400).json(err);

      res.status(204).json();
    });
  },

  // eslint-disable-next-line no-unused-vars
  addMovie(req, res, next) {
    Actor.findOne({ _id: req.params.id }, (err, actor) => {
      if (err) return res.status(400).json(err);
      if (!actor) return res.status(404).json();

      Movie.create(req.body, (err, movie) => {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();

        actor.movies.push(movie);
        actor.save((err) => {
          if (err) return res.status(500).json(err);

          res.status(201).json(actor);
        });
      });
    });
  },

  // eslint-disable-next-line no-unused-vars
  deleteMovie(req, res, next) {
    Actor.findOne({ _id: req.params.id }, (err, actor) => {
      if (err) return res.status(400).json(err);
      if (!actor) return res.status(404).json();

      Movie.findOneAndRemove({ _id: req.params.mid })
        .exec((err, movie) => {
          if (err) return res.status(400).json(err);
          if (!movie) return res.status(404).json();

          actor.movies.push(movie);
          actor.save((err) => {
            if (err) return res.status(400).json(err);

            res.status(204).json(actor);
          });
        });
    });
  },
};
