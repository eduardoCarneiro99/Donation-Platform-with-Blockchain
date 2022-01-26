import { Request, Response } from "express";
import { UserDTO } from "../DTO/UserDTO";
import { AssociationService } from "../Service/AssociationService";
import { Container } from "inversify";
import { ExpenditureDTO } from "../DTO/ExpenditureDTO";

export class AssociationController {
  private associationService: AssociationService;

  constructor(container: Container) {
    this.associationService = new AssociationService(container);
  }

  async addExpenditure(req: Request, res: Response) {
    var expenditureDTO: ExpenditureDTO = req.body;
    await this.associationService
      .addExpenditureByAssociationID(req.params.id, expenditureDTO)
      .then((expenditureDTORet) => {
        return res.status(200).json(expenditureDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async updateExpenditure(req: Request, res: Response) {
    var expenditureDTO: ExpenditureDTO = req.body;
    await this.associationService
      .updateAssociationExpenditureByID(req.params.id, expenditureDTO)
      .then((expenditureEdited) => {
        res.json(expenditureEdited);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async getExpenditureByID(req: Request, res: Response) {
    await this.associationService
      .getAssociationExpenditureByID(req.params.userID, req.params.expenditureID)
      .then((expenditureDTORet) => {
        return res.status(200).json(expenditureDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async deleteExpenditure(req: Request, res: Response) {
    await this.associationService
      .deleteAssociationExpenditure(req.params.userID, req.params.expenditureID)
      .then((answer) => {
        if (answer) {
          res.status(200).json({ message: "Expenditure deleted." });
        } else {
          res.status(400).json({ message: "Expenditure not found." });
        }
      });
  }
}
