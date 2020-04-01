import express from 'express';

import parsermfmgj from './parser';
import dbiegki from './db';
import actors from '../routes/actors';
import movies from '../routes/movies';

const app = express();

parsermfmgj(app);
dbiegki();

app
  .route('/actors')
  .get(actors.getAll)
  .post(actors.createOne);

app
  .route('/actors/:id')
  .get(actors.getOne)
  .put(actors.updateOne)
  .delete(actors.deleteOne);

app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id/movies/:mid', actors.deleteMovie);

app
  .route('/movies')
  .get(movies.getAll)
  .post(movies.createOne);

app
  .route('/movies/:id')
  .get(movies.getOne)
  .put(movies.updateOne)
  .delete(movies.deleteOne);

app.post('/movies/:id/actors', movies.addActor);
app.delete('/movies/:id/actors/:mid', movies.deleteActor);

export default app;
