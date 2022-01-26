import * as express from "express";
import { DonationController } from "../Controllers/DonationController";
import container from "../InversifyConfig/inversify.config";

class DonationRoutes {
  public router: express.Router = express.Router();

  private donationController: DonationController;

  constructor() {
    this.config();
    this.donationController = new DonationController(container);
  }

  private config(): void {
    this.router.post("/", (req: express.Request, res: express.Response) =>
      this.donationController.donate(req, res)
    );
    this.router.get("/:donationID", (req: express.Request, res: express.Response) =>
      this.donationController.getDonationByID(req, res)
    );
    this.router.get("/donator/:userID", (req: express.Request, res: express.Response) =>
      this.donationController.getDonationsByDonorID(req, res)
    );
    this.router.get("/association/:userID", (req: express.Request, res: express.Response) =>
      this.donationController.getDonationsByAssociationID(req, res)
    );
    this.router.delete("/:donationID", (req: express.Request, res: express.Response) =>
      this.donationController.deleteDonation(req, res)
    );

  }
}

export const donationRoutes = new DonationRoutes().router;
