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
    /*this.router.post("/login/", (req: express.Request, res: express.Response) =>
      this.userController.getUserByEmail(req, res)
    );*/
    this.router.post("/login/", (req: express.Request, res: express.Response) => this.userController.login(req, res));
    this.router.delete("/:id", (req: express.Request, res: express.Response) =>
      this.userController.deleteUser(req, res)
    );
    this.router.post("/:id/addFunds", (req: express.Request, res: express.Response) =>
      this.userController.addFunds(req, res)
    );
    this.router.post("/:id/withdrawFunds", (req: express.Request, res: express.Response) =>
      this.userController.withdrawFunds(req, res)
    );
  }
}

export const userRoutes = new UserRoutes().router;
