import { Equipment } from "../../Domain/Land/Equipment";
import { Land } from "../../Domain/Land/Land";
import { Lot } from "../../Domain/Land/Lot";
import { User } from "../../Domain/User/User";
import { EquipmentDTO } from "../../DTO/EquipmentDTO";
import { IRepository } from "./IRepository";

export interface IUserRepository extends IRepository {
  findByEmail(email: string): Promise<User>;

  deleteUser(id: string): Promise<boolean>;

  addLandToUser(id: String, land: Land): Promise<Land>;

  updateUserLand(id: String, land: Land): Promise<Land>;

  findUserLandById(userID: string, landID: string): Promise<Land>;

  deleteUserLand(userID: string, landID: string): Promise<boolean>;

  addLotToUser(id: string, landID: string, lot: Lot): Promise<Lot>;

  updateUserLot(id: string, landID: string, lot: Lot): Promise<Lot>;

  findUserLotById(id: string, landID: string, lotID: string): Promise<Lot>;

  deleteUserLot(userID: string, landID: string, lotID: string): Promise<boolean>;

  addEquipmentToUser(id: string, landID: string, lotID: string, equipment: Equipment): Promise<Equipment>;

  updateUserEquipment(id: string, landID: string, lotID: string, equipment: Equipment): Promise<Equipment>;

  findUserEquipmentById(userID: string, landID: string, lotID: string, equipmentID: string): Promise<Equipment>;

  deleteUserEquipment(userID: string, landID: string, lotID: string, equipmentID: string): Promise<boolean>;
}
