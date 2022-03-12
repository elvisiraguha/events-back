import express from "express";
import controller from "../controllers/user";
import AuthMiddleware from "../middlewares/auth";
import OrganizerReqestMiddleware from "../middlewares/organizerRequest";

const router = express.Router();

router.get("/", AuthMiddleware.isValidUserQuery, controller.getUser);
router.get(
  "/profile",
  AuthMiddleware.isUserAuthenticated,
  controller.getCurrentUser
);
router.post("/auth/signup", controller.signup);
router.post("/auth/login", controller.signin);
router.get("/checkUserName/:userName", controller.checkUserName);
router.get(
  "/booking",
  AuthMiddleware.isUserAuthenticated,
  controller.getAllBookingsFromUser
);

router.patch(
  "/profile",
  AuthMiddleware.isUserAuthenticated,
  controller.updateUserProfile
);

router.post(
  "/organizerRequest",
  AuthMiddleware.isUserAuthenticated,
  OrganizerReqestMiddleware.isNewOrganizerRequest,
  controller.organizerRequest
);

router.post(
  "/auth/logout",
  AuthMiddleware.isUserAuthenticated,
  controller.logoutUser
);

export default router;
