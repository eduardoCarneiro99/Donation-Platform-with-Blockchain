import { Request, Response } from "express";
import { UserDTO } from "../DTO/UserDTO";
import { AssociationService } from "../Service/AssociationService";
import { Container } from "inversify";
import { DonationDTO } from "../DTO/DonationDTO";
import { DonationService } from "../Service/DonationService";

export class DonationController {
  private donationService: DonationService;

  constructor(container: Container) {
    this.donationService = new DonationService(container);
  }

  async donate(req: Request, res: Response) {
    var donationDTO: DonationDTO = req.body;
    await this.donationService
      .donate(donationDTO)
      .then((donationDTORet) => {
        return res.status(200).json(donationDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async getDonationByID(req: Request, res: Response) {
    await this.donationService
      .getDonationByID(req.params.donationID)
      .then((donationDTORet) => {
        return res.status(200).json(donationDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async getDonationsByDonorID(req: Request, res: Response) {
    await this.donationService
      .getDonationsByDonatorID(req.params.userID)
      .then((donations) => {
        return res.status(200).json(donations);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async getDonationsByAssociationID(req: Request, res: Response) {
    await this.donationService
      .getDonationsByAssociationID(req.params.userID)
      .then((donations) => {
        return res.status(200).json(donations);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async deleteDonation(req: Request, res: Response) {
    await this.donationService
      .deleteDonation(req.params.donationID)
      .then((answer) => {
        if (answer) {
          res.status(200).json({ message: "Donation deleted." });
        } else {
          res.status(400).json({ message: "Donation not found." });
        }
      });
  }
}
