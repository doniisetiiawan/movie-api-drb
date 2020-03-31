export default () => function generateId(schema) {
  schema.pre('validate', function (next, done) {
    const instance = this;
    const model = instance.model(
      instance.constructor.modelName,
    );

    if (instance.id == null) {
      model
        .findOne()
        .sort('-id')
        .exec((err, maxInstance) => {
          if (err) {
            return done(err);
          }
          const maxId = maxInstance.id || 0;
          instance.id = maxId + 1;
          done();
        });
    } else {
      done();
    }
  });
};
