import { Request, Response } from "express";
import { EquipmentDTO } from "../DTO/EquipmentDTO";
import { LandDTO } from "../DTO/LandDTO";
import { LotDTO } from "../DTO/LotDTO";
import { UserDTO } from "../DTO/UserDTO";
import { UserService } from "../Service/UserService";
import { Container } from "inversify";

export class UserController {
  private userService: UserService;

  constructor(container: Container) {
    this.userService = new UserService(container);
  }

  public postUser(req: Request, res: Response) {
    const userDTO: UserDTO = req.body;
    this.userService
      .createUser(userDTO)
      .then((userDTOReturned) => {
        return res.status(201).json(userDTOReturned);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  }

  async putUser(req: Request, res: Response) {
    var userDTO: UserDTO = req.body;
    await this.userService
      .editUser(userDTO)
      .then((userEdited) => {
        res.json(userEdited);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async getUserByID(req: Request, res: Response) {
    await this.userService
      .getUserById(req.params.id)
      .then((userDTORet) => {
        return res.status(200).json(userDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async getUserByEmail(req: Request, res: Response) {
    await this.userService
      .getUserByEmail(req.body.email)
      .then((userDTORet) => {
        return res.status(200).json(userDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async deleteUser(req: Request, res: Response) {
    await this.userService.deleteUser(req.params.id).then((answer) => {
      if (answer === true) {
        res.status(200).json({ message: "User deleted." });
      } else {
        res.status(400).json({ message: "User not found." });
      }
    });
  }

  async addLand(req: Request, res: Response) {
    var landDTO: LandDTO = req.body;
    await this.userService
      .addLandByUserID(req.params.id, landDTO)
      .then((landDTORet) => {
        return res.status(200).json(landDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async updateLand(req: Request, res: Response) {
    var landDTO: LandDTO = req.body;
    await this.userService
      .updateUserLandByID(req.params.id, landDTO)
      .then((landEdited) => {
        res.json(landEdited);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async getLandByID(req: Request, res: Response) {
    await this.userService
      .getUserLandByID(req.params.userID, req.params.landID)
      .then((landDTORet) => {
        return res.status(200).json(landDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async deleteLand(req: Request, res: Response) {
    await this.userService.deleteUserLand(req.params.userID, req.params.landID).then((answer) => {
      if (answer === true) {
        res.status(200).json({ message: "Land deleted." });
      } else {
        res.status(400).json({ message: "Land not found." });
      }
    });
  }

  async addLot(req: Request, res: Response) {
    var lotDTO: LotDTO = req.body;
    await this.userService
      .addLotByUserIDLandID(req.params.id, req.params.landID, lotDTO)
      .then((lotDTORet) => {
        return res.status(200).json(lotDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async updateLot(req: Request, res: Response) {
    var lotDTO: LotDTO = req.body;
    await this.userService
      .updateUserLotByUserIDLandID(req.params.id, req.params.landID, lotDTO)
      .then((lotEdited) => {
        res.json(lotEdited);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async getLotByID(req: Request, res: Response) {
    await this.userService
      .getUserLotByUserIDLandID(req.params.userID, req.params.landID, req.params.lotID)
      .then((lotDTORet) => {
        return res.status(200).json(lotDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async deleteLot(req: Request, res: Response) {
    await this.userService.deleteUserLot(req.params.userID, req.params.landID, req.params.lotID).then((answer) => {
      if (answer === true) {
        res.status(200).json({ message: "Lot deleted." });
      } else {
        res.status(400).json({ message: "Lot not found." });
      }
    });
  }

  async addEquipment(req: Request, res: Response) {
    var equipmentDTO: EquipmentDTO = req.body;
    await this.userService
      .addEquipmentByUserIDLandIDLotID(req.params.id, req.params.landID, req.params.lotID, equipmentDTO)
      .then((equipmentDTORet) => {
        return res.status(200).json(equipmentDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async updateEquipment(req: Request, res: Response) {
    var equipmentDTO: EquipmentDTO = req.body;
    await this.userService
      .updateEquipmentByUserIDLandIDLotID(req.params.id, req.params.landID, req.params.lotID, equipmentDTO)
      .then((equipmentEdited) => {
        res.json(equipmentEdited);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async getEquipmentByID(req: Request, res: Response) {
    await this.userService
      .getEquipmentByUserIDLandIDLotIDEquipmentID(
        req.params.id,
        req.params.landID,
        req.params.lotID,
        req.params.equipmentID
      )
      .then((equipmentDTORet) => {
        return res.status(200).json(equipmentDTORet);
      })
      .catch((err) => {
        res.status(400).type("text").send(err.message);
      });
  }

  async deleteEquipment(req: Request, res: Response) {
    await this.userService
      .deleteEquipment(req.params.id, req.params.landID, req.params.lotID, req.params.equipmentID)
      .then((answer) => {
        if (answer) {
          res.status(200).json({ message: "Equipment deleted." });
        } else {
          res.status(400).json({ message: "Equipment not found." });
        }
      });
  }
}
