const { Router } = require("express");
const usersController = require("../controllers/users.controller");
const verifyJwt = require("../middlewares/jwtVerify");

const router = Router();

/**
 * @swagger
 * components:
 *   tags:
 *     - name: Users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         username:
 *           type: string
 */

/**
 * @openapi
 * /users:
 *   get:
 *     tags: [Users]
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 *       401:
 *         description: User must be logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/", verifyJwt, usersController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     description: Get user by id
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: string
 *      - in: query
 *        name: fields
 *        schema:
 *         type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:id", verifyJwt, usersController.getMe);

/**
 * @swagger
 * /test:
 *   get:
 *     responses:
 *       '200':
 *         description: OK
 */

router.patch("/me", verifyJwt, usersController.updateMe);
router.delete("/me", verifyJwt, usersController.deleteMe);

router.post("/orders", verifyJwt, usersController.createOrder);

module.exports = router;
