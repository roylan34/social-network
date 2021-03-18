var Joi = require("joi");

const signupSchema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  name: Joi.string().required().min(3),
  password: Joi.string().required().min(3),
});

exports.signupValidator = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }
  //proceed to next middleware if success;
  next();
};
