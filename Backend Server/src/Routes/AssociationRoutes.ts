import * as express from "express";
import { AssociationController } from "../Controllers/AssociationController";
import container from "../InversifyConfig/inversify.config";

class AssociationRoutes {
  public router: express.Router = express.Router();

  private associationController: AssociationController;

  constructor() {
    this.config();
    this.associationController = new AssociationController(container);
  }

  private config(): void {
    this.router.post("/:id/expenditure", (req: express.Request, res: express.Response) =>
      this.associationController.addExpenditure(req, res)
    );
    this.router.put("/:id/expenditure", (req: express.Request, res: express.Response) =>
      this.associationController.updateExpenditure(req, res)
    );
    this.router.get("/:userID/expenditure/:expenditureID", (req: express.Request, res: express.Response) =>
      this.associationController.getExpenditureByID(req, res)
    );
    this.router.get("/:userID/expenditureList", (req: express.Request, res: express.Response) =>
      this.associationController.getExpenditureListByAssociationID(req, res)
    );
    this.router.delete("/:userID/expenditure/:expenditureID", (req: express.Request, res: express.Response) =>
      this.associationController.deleteExpenditure(req, res)
    );
  }
}

export const associationRoutes = new AssociationRoutes().router;
