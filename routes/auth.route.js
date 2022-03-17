const { Router } = require("express");
const authController = require("../controllers/auth.controller");

const router = Router();

/**
 * @swagger
 * components:
 *   tags:
 *    - name: Auth
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *   tags: [Auth]
 *   description: Login user
 *   requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *   responses:
 *     200:
 *       description: User logged in successfully
 *       content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *     401:
 *       description: Invalid username or password
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *
 */

router.post("/login", authController.login);

/**
 * @swagger
 * /auth/register:
 *  post:
 *   tags: [Auth]
 *   description: Register user
 *   requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *            name:
 *             type: string
 *            birthdate:
 *              type: string
 *   responses:
 *     200:
 *       description: User registered in successfully
 *       content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *     401:
 *       description: Invalid username or password
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *
 */

router.post("/register", authController.register);

module.exports = router;
