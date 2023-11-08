const { body, validationResult, param, query } = require('express-validator')

const userValidationRules = () => {
    return [
        body("username")
            .exists()
            .notEmpty()
            .isAlphanumeric()
            .withMessage("cannot be empty and must be alphanumeric")
            .bail(),
        body("email").isEmail().withMessage("Invalid Email").bail(),
        body("password")
            .isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minSymbols: 1,
            })
            .withMessage(
                "password should be 8 character long and must contain 1 lowercase, 1 uppercase and 1 symbol"
            )
            .bail(),
        body("role")
            .optional()
            .custom((value) => {
                if (value && !["Student", "Instructor", "Admin"].includes(value)) {
                    throw new Error("Invalid user type");
                }
                return true;
            })
            .bail(),
        body("firstName").notEmpty().withMessage("fistname cannot be empty"),
        body("lastName").notEmpty().withMessage("lastname cannot be empty"),
        // Add more validation for address fields if needed
    ];
};

const loginValidationRules = () => {
    return [body("email").isEmail().withMessage("Invalid Email").bail()];
};


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => {
        console.log(err);
        return extractedErrors.push(err.msg);
    });
    return res.status(422).json({
        errors: extractedErrors,
    });
};


module.exports = { userValidationRules, loginValidationRules, validate }