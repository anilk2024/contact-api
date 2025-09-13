import { body, validationResult } from "express-validator";

export const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("mobile").isNumeric().withMessage("Mobile must be a number"),
  body("address").notEmpty().withMessage("Address is required"),
  body("state").notEmpty().withMessage("State is required"),
  body("district").notEmpty().withMessage("District is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("dob").notEmpty().withMessage("Date of Birth is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

export const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

export const profileUpdateValidation = [
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("mobile").optional().isNumeric().withMessage("Mobile must be a number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

export const contactCreateValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("mobile")
    .notEmpty()
    .withMessage("Mobile is required")
    .isNumeric()
    .withMessage("Mobile must be numeric"),
  body("address").notEmpty().withMessage("Address is required"),
  body("state").notEmpty().withMessage("State is required"),
  body("district").notEmpty().withMessage("District is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("dob")
    .notEmpty()
    .withMessage("Date of Birth is required")
    .isISO8601()
    .withMessage("DOB must be a valid date")
    .toDate(),
  body("occupation").notEmpty().withMessage("Occupation is required"),
  body("qualification").notEmpty().withMessage("Qualification is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

export const contactUpdateValidation = [
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("mobile").optional().isNumeric().withMessage("Mobile must be numeric"),
  body("dob")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("DOB must be a valid date"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
