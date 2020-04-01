// eslint-disable-next-line no-unused-vars
import should from 'should';
import request from 'supertest';
import mocha from 'mocha';

import app from '../src/lib/app';
import Movie from '../src/models/movie';

const { describe, it, before } = mocha;

describe('Movies', () => {
  let moviesscne;
  let actorbigft;

  before((done) => {
    Movie.deleteMany();
    moviesscne = Movie.create({
      title: 'Hello World',
      year: 2013,
    }, (err, moviesouge) => {
      // console.log(moviesouge);
      moviesscne = moviesouge;
      done(err);
    });
  });

  describe('POST movie', () => {
    it('should create a movie', (done) => {
      const movie = {
        title: 'Hello World',
        year: 2013,
      };

      request(app)
        .post('/movies')
        .send(movie)
        .expect(201, done);
    });

    it('should not allow you to create duplicate movies', (done) => {
      const movie = {
        _id: moviesscne._id,
        title: 'Hello World',
        year: 2013,
      };

      request(app)
        .post('/movies')
        .send(movie)
        .expect(400, done);
    });

    it('should allow to create a movie without ID', (done) => {
      const movie = {
        title: 'Hello World2',
        year: 2013,
      };

      request(app)
        .post('/movies')
        .send(movie)
        .expect(201, (err) => {
          done(err);
        });
    });
  });

  describe('GET movie', () => {
    it('should retrieve movie from db', (done) => {
      request(app)
        .get(`/movies/${moviesscne._id}`)
        .expect(200, done);
    });

    it('should respond not found when no movie exists', (done) => {
      request(app)
        .get('/movies/392132')
        .expect(400, done);
    });
  });

  describe('PUT movie', () => {
    it('should edit a movie', (done) => {
      const edit = {
        year: 2012,
      };

      request(app)
        .put(`/movies/${moviesscne._id}`)
        .send(edit)
        .expect(200)
        .end((err) => {
          done(err);
        });
    });
  });

  describe('POST /movies/:id/actors', () => {
    it('should successfully add an actor to movie', (done) => {
      const actor = {
        name: 'AxiomZen',
        birth_year: '2012',
      };

      request(app)
        .post(`/movies/${moviesscne._id}/actors`)
        .send(actor)
        .expect(201, done);
    });

    it('movie should have array of actors now', (done) => {
      request(app)
        .get(`/movies/${moviesscne._id}`)
        .expect(200)
        .end((err, res) => {
          res.body.actors.length.should.eql(1);
          actorbigft = res.body.actors[0]._id;
          // console.log(actorbigft);
          done();
        });
    });
  });

  describe('DELETE /movies/:id/actors/:actor_id', () => {
    it('should successfully remove an actor from movie', (done) => {
      request(app)
        .delete(`/movies/${moviesscne._id}/actors/${actorbigft}`)
        .expect(204, done);
    });

    it('movie should no longer have that actor id', (done) => {
      request(app)
        .get(`/movies/${moviesscne._id}`)
        .expect(200)
        .end((err, res) => {
          res.body.actors.length.should.eql(0);
          done();
        });
    });
  });

  describe('DELETE movie', () => {
    it('should remove a movie', (done) => {
      request(app)
        .delete(`/movies/${moviesscne._id}`)
        .expect(204, done);
    });
  });
});
