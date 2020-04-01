// eslint-disable-next-line no-unused-vars
import should from 'should';
import request from 'supertest';
import mocha from 'mocha';

import app from '../src/lib/app';
import Actor from '../src/models/actor';

const { describe, it, before } = mocha;

describe('Actors', () => {
  let actornuwnx;
  let moviecxwme;

  before((done) => {
    Actor.deleteMany();
    actornuwnx = Actor.create({
      name: 'AxiomZen',
      birth_year: '2012',
    }, (err, actorjtmym) => {
      // console.log(moviesouge);
      actornuwnx = actorjtmym;
      done(err);
    });
  });

  describe('POST actor', () => {
    it('should create a actor', (done) => {
      const actor = {
        name: 'AxiomZen',
        birth_year: '2012',
      };

      request(app)
        .post('/actors')
        .send(actor)
        .expect(201, done);
    });

    it('should not allow you to create duplicate actors', (done) => {
      const actor = {
        _id: actornuwnx._id,
        name: 'AxiomZen2',
        birth_year: '2012',
      };

      request(app)
        .post('/actors')
        .send(actor)
        .expect(400, done);
    });

    it('should allow to create an actor without ID', (done) => {
      request(app)
        .get('/actors')
        .expect(200, (err) => {
          done(err);
        });
    });
  });

  describe('GET actor', () => {
    it('should retrieve actor from db', (done) => {
      request(app)
        .get(`/actors/${actornuwnx._id}`)
        .expect(200, done);
    });

    it('should respond not found when no actor exists', (done) => {
      request(app)
        .get('/actors/392132')
        .expect(400, done);
    });
  });

  describe('PUT actor', () => {
    it('should edit a actor', (done) => {
      const edit = {
        name: 'ZenAxiom',
        birth_year: 2011,
      };

      request(app)
        .put(`/actors/${actornuwnx._id}`)
        .send(edit)
        .expect(200, done);
    });

    it('should have been edited', (done) => {
      request(app)
        .get(`/actors/${actornuwnx._id}`)
        .expect(200)
        .end((err, res) => {
          res.body.name.should.eql('ZenAxiom');
          res.body.birth_year.should.eql(2011);
          done();
        });
    });
  });

  describe('POST /actors/:id/movies', () => {
    it('should successfully add a movie to the actor', (done) => {
      const movie = {
        title: 'Hello World v2.0',
        year: 2013,
      };
      request(app)
        .post(`/actors/${actornuwnx._id}/movies`)
        .send(movie)
        .expect(201, done);
    });

    it('actor should have array of movies now', (done) => {
      request(app)
        .get(`/actors/${actornuwnx._id}`)
        .expect(200)
        .end((err, res) => {
          res.body.movies.length.should.eql(1);
          moviecxwme = res.body.movies[0]._id;
          done();
        });
    });
  });

  describe('DELETE /actors/:id/movies/:movie_id', () => {
    it('should successfully remove a movie from actor', (done) => {
      request(app)
        .delete(`/actors/${actornuwnx._id}/movies/${moviecxwme}`)
        .expect(204, done);
    });

    it('actor should no longer have that movie id', (done) => {
      request(app)
        .get(`/actors/${actornuwnx._id}`)
        .expect(201)
        .end((err, res) => {
          res.body.movies.length.should.eql(0);
          done();
        });
    });
  });

  describe('DELETE actor', () => {
    it('should remove an actor', (done) => {
      request(app)
        .delete(`/actors/${actornuwnx._id}`)
        .expect(204, done);
    });
  });
});
