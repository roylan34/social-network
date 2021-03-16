var Joi = require("joi");

const createSchema = Joi.object().keys({
  title: Joi.string().required("Title is required").min(3),
  body: Joi.string().required("Body is required").min(3),
});

exports.create = (req, res, next) => {
  const { error } = createSchema.validate(req.body);

  if (error) {
    res.status(400).send(error);
  }
  //proced to next middleware
  next();
};
