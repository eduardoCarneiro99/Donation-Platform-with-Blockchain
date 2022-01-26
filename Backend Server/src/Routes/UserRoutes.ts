import * as express from "express";
import { UserController } from "../Controllers/UserController";
import container from "../InversifyConfig/inversify.config";

class UserRoutes {
  public router: express.Router = express.Router();

  private userController: UserController;

  constructor() {
    this.config();
    this.userController = new UserController(container);
  }

  private config(): void {
    this.router.post("/", (req: express.Request, res: express.Response) => this.userController.postUser(req, res));
    this.router.put("/", (req: express.Request, res: express.Response) => this.userController.putUser(req, res));
    this.router.get("/:id", (req: express.Request, res: express.Response) => this.userController.getUserByID(req, res));
    this.router.post("/login/", (req: express.Request, res: express.Response) => this.userController.getUserByEmail(req, res));
    this.router.delete("/:id", (req: express.Request, res: express.Response) =>
      this.userController.deleteUser(req, res)
    );
    this.router.post("/:id/land", (req: express.Request, res: express.Response) =>
      this.userController.addLand(req, res)
    );
    this.router.put("/:id/land", (req: express.Request, res: express.Response) =>
      this.userController.updateLand(req, res)
    );
    this.router.get("/:userID/land/:landID", (req: express.Request, res: express.Response) =>
      this.userController.getLandByID(req, res)
    );
    this.router.delete("/:userID/land/:landID", (req: express.Request, res: express.Response) =>
      this.userController.deleteLand(req, res)
    );

    this.router.post("/:id/land/:landID/lot", (req: express.Request, res: express.Response) =>
      this.userController.addLot(req, res)
    );
    this.router.put("/:id/land/:landID/lot", (req: express.Request, res: express.Response) =>
      this.userController.updateLot(req, res)
    );
    this.router.get("/:userID/land/:landID/lot/:lotID", (req: express.Request, res: express.Response) =>
      this.userController.getLotByID(req, res)
    );
    this.router.delete("/:userID/land/:landID/lot/:lotID", (req: express.Request, res: express.Response) =>
      this.userController.deleteLot(req, res)
    );

    this.router.post("/:id/land/:landID/lot/:lotID/equipment", (req: express.Request, res: express.Response) =>
      this.userController.addEquipment(req, res)
    );
    this.router.put("/:id/land/:landID/lot/:lotID/equipment", (req: express.Request, res: express.Response) =>
      this.userController.updateEquipment(req, res)
    );
    this.router.get(
      "/:id/land/:landID/lot/:lotID/equipment/:equipmentID",
      (req: express.Request, res: express.Response) => this.userController.getEquipmentByID(req, res)
    );
    this.router.delete(
      "/:id/land/:landID/lot/:lotID/equipment/:equipmentID",
      (req: express.Request, res: express.Response) => this.userController.deleteEquipment(req, res)
    );
    /**
    this.router.post(
      "/:id/land/:landID/lot/:lotID/equipment/:equipmentID/toggleActuator/:actuatorID",
      (req: express.Request, res: express.Response) => this.userController.toggleActuator(req, res)
    );
    **/
  }
}

export const userRoutes = new UserRoutes().router;
