import { User } from "../../Domain/User/User";
import { UserMapper } from "../../Mapper/UserMapper";
import { IUserModel } from "../../Model/UserModel";
import { IUserRepository } from "../InterfacesRepository/IUserRepository";
import userDB from "../../Model/UserModel";
import { injectable } from "inversify";
import { Expenditure } from "../../Domain/User/Expenditure";
import { IExpenditureModel } from "../../Model/ExpenditureModel";
import { ExpenditureMapper } from "../../Mapper/ExpenditureMapper";

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
    const foundUserPromise: IUserModel = await userDB.findOne({ email: emailString });
    if (foundUserPromise == undefined) {
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
    userModelSearch.password = userModel.password;
    userModelSearch.email = userModel.email;

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

  async addExpenditureToUser(id: String, expenditure: Expenditure): Promise<Expenditure> {
    const expenditureModel: IExpenditureModel = ExpenditureMapper.domain2Model(expenditure);
    const foundUserPromise: IUserModel = await userDB.findById(id).catch((err) => {
      throw new Error(err);
    });

    foundUserPromise.association.expenditureList.push(expenditureModel);

    await userDB.findByIdAndUpdate(id, foundUserPromise).catch((err) => {
      throw new Error(err);
    });

    return ExpenditureMapper.model2Domain(expenditureModel);
  }

  async updateUserExpenditure(id: String, expenditure: Expenditure): Promise<Expenditure> {
    const expenditureModel: IExpenditureModel = ExpenditureMapper.domain2Model(expenditure);

    const foundUserPromise: IUserModel = await userDB.findById(id).catch((err) => {
      throw new Error(err);
    });

    for (let element of foundUserPromise.association.expenditureList) {
      if (element._id.valueOf() == expenditureModel.id) {
        element.value = expenditureModel.value;
        element.justification = expenditureModel.justification;
        element.date = expenditureModel.date;
        element.transactionId = expenditureModel.transactionId;
        break;
      }
    }

    await userDB.findByIdAndUpdate(id, foundUserPromise).catch((err) => {
      throw new Error(err);
    });

    return expenditure;
  }

  async findUserExpenditureById(userID: string, expenditureID: string): Promise<Expenditure> {
    const foundUserPromise: IUserModel = await userDB.findById(userID).catch((err) => {
      throw new Error(err);
    });

    for (let element of foundUserPromise.association.expenditureList) {
      if (element._id.valueOf() == expenditureID) {
        return ExpenditureMapper.model2Domain(element);
      }
    }

    return null;
  }

  async deleteUserExpenditure(userID: string, expenditureID: string): Promise<boolean> {
    let index = null;
    const foundUserPromise: IUserModel = await userDB.findById(userID).catch((err) => {
      throw new Error(err);
    });
    for (let i = 0; i < foundUserPromise.association.expenditureList.length; i++) {
      if (foundUserPromise.association.expenditureList[i]._id.valueOf() == expenditureID) {
        index = i;
      }
    }

    if (index != null) {
      foundUserPromise.association.expenditureList.splice(index, 1);
      await userDB.findByIdAndUpdate(userID, foundUserPromise).catch((err) => {
        throw new Error(err);
      });
      return true;
    } else {
      return false;
    }
  }
}
