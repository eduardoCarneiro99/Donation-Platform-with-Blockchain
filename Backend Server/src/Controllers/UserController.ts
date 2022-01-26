import { Request, Response } from "express";
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
}
