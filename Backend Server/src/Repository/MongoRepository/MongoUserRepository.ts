import { User } from "../../Domain/User/User";
import { UserMapper } from "../../Mapper/UserMapper";
import { IUserModel } from "../../Model/UserModel";
import { IUserRepository } from "../InterfacesRepository/IUserRepository";
import userDB from "../../Model/UserModel";
import { Land } from "../../Domain/Land/Land";
import { ILandModel } from "../../Model/LandModel";
import { LandMapper } from "../../Mapper/LandMapper";
import { Lot } from "../../Domain/Land/Lot";
import { LotMapper } from "../../Mapper/LotMapper";
import { ILotModel } from "../../Model/LotModel";
import { Equipment } from "../../Domain/Land/Equipment";
import { EquipmentMapper } from "../../Mapper/EquipmentMapper";
import { IEquipmentModel } from "../../Model/EquipmentModel";
import { injectable } from "inversify";

@injectable()
export class MongoUserRepository implements IUserRepository {
  async findById(id: string): Promise<User> {
    const foundUserPromise: IUserModel = await userDB.findById(id).catch((err) => {
      throw new Error(err);
    });
    const userDomainRet: User = UserMapper.model2Domain(foundUserPromise);
    return userDomainRet;
  }

  async findByEmail(emailString: string): Promise<User> {
    const foundUserPromise: IUserModel = await userDB.findOne({"email": emailString});
    if (foundUserPromise == undefined){
      throw new Error("User");
    }
    const userDomainRet: User = UserMapper.model2Domain(foundUserPromise);
    return userDomainRet;
  }

  async save(newUser: User): Promise<User> {
    const user: IUserModel = UserMapper.domain2Model(newUser);
    await user.validate();

    const createdUser: IUserModel = await userDB.create(user);

    const userRet: User = UserMapper.model2Domain(createdUser);
    return userRet;
  }

  async change(user: User): Promise<User> {
    const userModel: IUserModel = UserMapper.domain2Model(user);

    var userModelSearch: IUserModel = await userDB.findById(userModel.id).catch((err) => {
      throw new Error(err);
    });

    userModelSearch.name = userModel.name;
    userModelSearch.username = userModel.username;
    userModelSearch.password = userModel.password;
    userModelSearch.email = userModel.email;
    userModelSearch.landList = userModel.landList;

    await userDB.updateOne({}, userModelSearch).exec();

    const userRet: User = UserMapper.model2Domain(userModelSearch);

    return userRet;
  }

  async deleteUser(id: string): Promise<boolean> {
    if ((await userDB.findByIdAndDelete(id)) === null) {
      return false;
    } else {
      return true;
    }
  }

  async addLandToUser(id: String, land: Land): Promise<Land> {
    const landModel: ILandModel = LandMapper.domain2Model(land);
    const foundUserPromise: IUserModel = await userDB.findById(id).catch((err) => {
      throw new Error(err);
    });

    foundUserPromise.landList.push(landModel);

    await userDB.findByIdAndUpdate(id, foundUserPromise).catch( (err) => {
      throw new Error(err);
    });

    return LandMapper.model2Domain(landModel);
  }

  async updateUserLand(id: String, land: Land): Promise<Land> {
    const landModel: ILandModel = LandMapper.domain2Model(land);

    const foundUserPromise: IUserModel = await userDB.findById(id).catch((err) => {
      throw new Error(err);
    });

    for (let element of foundUserPromise.landList) {
      if (element._id.valueOf() == landModel.id) {
        element.name = landModel.name;
        element.description = landModel.description;
        element.lotList = landModel.lotList;
        break;
      }
    }

    await userDB.findByIdAndUpdate(id, foundUserPromise).catch( (err) => {
      throw new Error(err);
    });

    return land;
  }

  async findUserLandById(userID: string, landID: string): Promise<Land> {
    const foundUserPromise: IUserModel = await userDB.findById(userID).catch((err) => {
      throw new Error(err);
    });

    for (let element of foundUserPromise.landList) {
      if (element._id.valueOf() == landID) {
        return LandMapper.model2Domain(element);
      }
    }

    return null;
  }

  async deleteUserLand(userID: string, landID: string): Promise<boolean> {
    let index = null;
    const foundUserPromise: IUserModel = await userDB.findById(userID).catch((err) => {
      throw new Error(err);
    });
    for (let i = 0; i < foundUserPromise.landList.length; i++) {
      if (foundUserPromise.landList[i]._id.valueOf() == landID) {
        index = i;
      }
    }

    if (index != null) {
      foundUserPromise.landList.splice(index, 1);
      await userDB.findByIdAndUpdate(userID, foundUserPromise).catch( (err) => {
        throw new Error(err);
      });
      return true;
    } else {
      return false;
    }
  }

  async addLotToUser(id: string, landID: string, lot: Lot): Promise<Lot> {
    const lotModel: ILotModel = LotMapper.domain2Model(lot);

    const foundUserPromise: IUserModel = await userDB.findById(id).catch((err) => {
      throw new Error(err);
    });

    for (let element of foundUserPromise.landList) {
      if (element._id.valueOf() == landID) {
        element.lotList.push(lotModel);
      }
    }

    await userDB.findByIdAndUpdate(id, foundUserPromise).catch( (err) => {
      throw new Error(err);
    });

    return LotMapper.model2Domain(lotModel);
  }

  async updateUserLot(id: string, landID: string, lot: Lot): Promise<Lot> {
    const lotModel: ILotModel = LotMapper.domain2Model(lot);

    const foundUserPromise: IUserModel = await userDB.findById(id).catch((err) => {
      throw new Error(err);
    });

    for (let land of foundUserPromise.landList) {
      if (land._id.valueOf() == landID) {
        for (let lot of land.lotList) {
          if (lot._id.valueOf() == lotModel.id) {
            lot.name = lotModel.name;
            lot.description = lotModel.description;
            lot.equipmentList = lotModel.equipmentList;
            lot.minimumHumidity = lotModel.minimumHumidity;
            lot.maximumHumidity = lotModel.maximumHumidity;
            lot.currentHumidity = lotModel.currentHumidity;
            lot.minimumTemperature = lotModel.minimumTemperature;
            lot.maximumTemperature = lotModel.maximumTemperature;
            lot.currentTemperature = lotModel.currentTemperature;
            lot.cultivation = lotModel.cultivation;
            break;
          }
        }
        break;
      }
    }

    await userDB.findByIdAndUpdate(id, foundUserPromise).catch( (err) => {
      throw new Error(err);
    });

    return lot;
  }

  async findUserLotById(id: string, landID: string, lotID: string): Promise<Lot> {
    const foundUserPromise: IUserModel = await userDB.findById(id).catch((err) => {
      throw new Error(err);
    });

    for (let element of foundUserPromise.landList) {
      if (element._id.valueOf() == landID) {
        for (let lot of element.lotList) {
          if (lot._id.valueOf() == lotID) {
            return LotMapper.model2Domain(lot);
          }
        }
      }
    }

    return null;
  }

  async deleteUserLot(userID: string, landID: string, lotID: string): Promise<boolean> {
    let indexLand: number,
      indexLot: number = null;
    const foundUserPromise: IUserModel = await userDB.findById(userID).catch((err) => {
      throw new Error(err);
    });
    for (let i = 0; i < foundUserPromise.landList.length; i++) {
      if (foundUserPromise.landList[i]._id.valueOf() == landID) {
        indexLand = i;
        for (let j = 0; j < foundUserPromise.landList[i].lotList.length; j++) {
          if (foundUserPromise.landList[i].lotList[j]._id.valueOf() == lotID) {
            indexLot = j;
            break;
          }
        }
        break;
      }
    }

    if (indexLand != null || indexLot != null) {
      foundUserPromise.landList[indexLand].lotList.splice(indexLot, 1);
      await userDB.findByIdAndUpdate(userID, foundUserPromise).catch( (err) => {
        throw new Error(err);
      });
      return true;
    } else {
      return false;
    }
  }

  async addEquipmentToUser(id: string, landID: string, lotID: string, equipment: Equipment): Promise<Equipment> {
    const equipmentModel: IEquipmentModel = EquipmentMapper.domain2Model(equipment);

    const foundUserPromise: IUserModel = await userDB.findById(id).catch((err) => {
      throw new Error(err);
    });

    const land: ILandModel = foundUserPromise.landList.find((land) => {
      return land._id.valueOf() === landID;
    });

    const lot: ILotModel = land.lotList.find((lot) => {
      return lot._id.valueOf() === lotID;
    });

    lot.equipmentList.push(equipmentModel);

    await userDB.findByIdAndUpdate(id, foundUserPromise).catch( (err) => {
      throw new Error(err);
    });

    return EquipmentMapper.model2Domain(equipmentModel);
  }

  async updateUserEquipment(id: string, landID: string, lotID: string, equipment: Equipment): Promise<Equipment> {
    const equipmentModel: IEquipmentModel = EquipmentMapper.domain2Model(equipment);

    const foundUserPromise: IUserModel = await userDB.findById(id).catch((err) => {
      throw new Error(err);
    });

    const land: ILandModel = foundUserPromise.landList.find((land) => {
      return land._id.valueOf() === landID;
    });

    const lot: ILotModel = land.lotList.find((lot) => {
      return lot._id.valueOf() === lotID;
    });

    const equipmentToUpdate: IEquipmentModel = lot.equipmentList.find((equipment) => {
      return equipment._id.valueOf() === equipmentModel.id;
    });

    equipmentToUpdate.name = equipmentModel.name;

    await userDB.findByIdAndUpdate(id, foundUserPromise).catch( (err) => {
      throw new Error(err);
    });

    return equipment;
  }

  async findUserEquipmentById(id: string, landID: string, lotID: string, equipmentID: string): Promise<Equipment> {
    const foundUserPromise: IUserModel = await userDB.findById(id).catch((err) => {
      throw new Error(err);
    });

    if (foundUserPromise.landList.length == 0) {
      throw new Error("No lands found for this user.");
    }

    const land: ILandModel = foundUserPromise.landList.find((land) => {
      return land._id.valueOf() === landID;
    });

    if (land.lotList.length == 0) {
      throw new Error("No lots found for this user.");
    }

    const lot: ILotModel = land.lotList.find((lot) => {
      return lot._id.valueOf() === lotID;
    });

    if (lot.equipmentList.length == 0) {
      throw new Error("No equipments found for this user.");
    }

    const equipment: IEquipmentModel = lot.equipmentList.find((equipment) => {
      return equipment._id.valueOf() === equipmentID;
    });
    return EquipmentMapper.model2Domain(equipment);
  }

  async deleteUserEquipment(userID: string, landID: string, lotID: string, equipmentID: string): Promise<boolean> {
    const foundUserPromise: IUserModel = await userDB.findById(userID).catch((err) => {
      throw new Error(err);
    });

    const land: ILandModel = foundUserPromise.landList.find((land) => {
      return land._id.valueOf() === landID;
    });

    const lot: ILotModel = land.lotList.find((lot) => {
      return lot._id.valueOf() === lotID;
    });

    const equipmentIndex: number = lot.equipmentList.findIndex((equipment) => {
      return equipment._id.valueOf() === equipmentID;
    });

    const result: IEquipmentModel[] = lot.equipmentList.splice(equipmentIndex, 1);

    await userDB.findByIdAndUpdate(userID, foundUserPromise).catch( (err) => {
      throw new Error(err);
    });

    return result.length > 0;
  }
}
