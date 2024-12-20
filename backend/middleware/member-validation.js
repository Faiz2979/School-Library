const Joi = require('joi');
const validateMember = (request, response, next) => {
    const rules = Joi
    .object()
    .keys({
        name: Joi.string().required(),
        address: Joi.string().required(),
        contact: Joi.string().required(),
        gender: Joi.string().valid('Male','Female'),
        profilePict: Joi.string()
    })
    .options({abortEarly:false});

    let {error} = rules. validate(request.body);

    if(error != null){
        let errorMessage = error.details.map(it => it.message).join(', ');

        return response.status(422).json({
            success: false,
            message: errorMessage
        });
    }
    next();

}
module.exports = {  validateMember }