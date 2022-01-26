import { Name } from "../Domain/Shared/Name";
import { Association } from "../Domain/User/Association";
import { Donator } from "../Domain/User/Donator";
import { Email } from "../Domain/User/Email";
import { Expenditure } from "../Domain/User/Expenditure";
import { Password } from "../Domain/User/Password";
import { User } from "../Domain/User/User";
import { Username } from "../Domain/User/Username";
import { ExpenditureDTO } from "../DTO/ExpenditureDTO";
import { UserDTO } from "../DTO/UserDTO";
import AssociationModel from "../Model/AssociationModel";
import DonatorModel from "../Model/DonatorModel";
import { IExpenditureModel } from "../Model/ExpenditureModel";
import UserModel, { IUserModel } from "../Model/UserModel";
import { ExpenditureMapper } from "./ExpenditureMapper";

export class UserMapper {
  static json2Dto(body: any): UserDTO {
    return new UserDTO(
      body.id,
      body.string,
      body.password,
      body.email,
      body.role,
      body.country,
      body.donationsSentCounter,
      body.totalCoinDonated,
      body.description,
      body.donationsReceivedCounter,
      body.totalCoinReceived,
      body.expendituresList
    );
  }

  static dto2Domain(userDTO: UserDTO): User {
    const role = userDTO.role;
    let userDomain;
    if (role === "donator") {
      userDomain = new Donator(
        userDTO.id,
        userDTO.country,
        new Name(userDTO.name),
        new Password(userDTO.password),
        new Email(userDTO.email),
        userDTO.role,
        userDTO.donationsSentCounter,
        userDTO.totalCoinDonated
      );
    } else {
      userDomain = new Association(
        userDTO.id,
        userDTO.description,
        new Name(userDTO.description),
        new Password(userDTO.password),
        new Email(userDTO.email),
        userDTO.role,
        userDTO.donationsReceivedCounter,
        userDTO.totalCoinReceived,
        userDTO.expenditureList.map<Expenditure>((expenditure) =>
          ExpenditureMapper.dto2Domain(expenditure)
        )
      );
    }
    return userDomain;
  }

  static domain2Model(user: User): IUserModel {
    const role = user.getRole();
    let userModel;
    if (role === "donator") {
      const donator: Donator = user as Donator;
      userModel = new UserModel({
        id: donator.getID(),
        name: donator.getName().getName(),
        password: donator.getPassword().getPassword(),
        email: donator.getEmail().getEmail(),
        role: donator.getRole(),
        donator: new DonatorModel({
          country: donator.getCountry(),
          donationsSentCounter: donator.getDonationsSentCounter(),
          totalCoinDonated: donator.getTotalCoinDonated(),
        }),
        association: null,
      });
    } else {
      const association: Association = user as Association;
      userModel = new UserModel({
        id: association.getID(),
        name: association.getName().getName(),
        password: association.getPassword().getPassword(),
        email: association.getEmail().getEmail(),
        role: association.getRole(),
        donator: null,
        association: new AssociationModel({
          description: association.getDescription(),
          donationsReceivedCounter: association.getDonationsReceivedCounter(),
          totalCoinReceived: association.getTotalCoinReceived(),
          expenditureList: association
            .getExpenditureList()
            .map<IExpenditureModel>((expanditure) =>
              ExpenditureMapper.domain2Model(expanditure)
            ),
        }),
      });
    }
    return userModel;
  }

  static model2Domain(userModel: IUserModel): User {
    var role = userModel.role;
    var userDomain;
    if (role === "donator") {
      userDomain = new Donator(
        userModel.id,
        userModel.donator.country,
        new Name(userModel.name),
        new Password(userModel.password),
        new Email(userModel.email),
        userModel.role,
        userModel.donator.donationsSentCounter,
        userModel.donator.totalCoinDonated
      );
    } else {
      userDomain = new Association(
        userModel.id,
        userModel.association.description,
        new Name(userModel.name),
        new Password(userModel.password),
        new Email(userModel.email),
        userModel.role,
        userModel.association.donationsReceivedCounter,
        userModel.association.totalCoinReceived,
        userModel.association.expenditureList.map<Expenditure>(
          (expenditureModel) => ExpenditureMapper.model2Domain(expenditureModel)
        )
      );
    }
    return userDomain;
  }

  static domain2Dto(user: User): UserDTO {
    const role = user.getRole();
    let userDTO;
    if (role === "donator") {
      const donator = user as Donator;
      userDTO = new UserDTO(
        donator.getID(),
        donator.getName().getName(),
        donator.getPassword().getPassword(),
        donator.getEmail().getEmail(),
        donator.getRole(),
        donator.getCountry(),
        donator.getDonationsSentCounter(),
        donator.getTotalCoinDonated(),
        null,
        null,
        null,
        null
      );
    } else {
      const association = user as Association;
      userDTO = new UserDTO(
        association.getID(),
        association.getName().getName(),
        association.getPassword().getPassword(),
        association.getEmail().getEmail(),
        association.getRole(),
        null,
        null,
        null,
        association.getDescription(),
        association.getDonationsReceivedCounter(),
        association.getTotalCoinReceived(),
        association
          .getExpenditureList()
          .map<ExpenditureDTO>((expenditure) =>
            ExpenditureMapper.domain2Dto(expenditure)
          )
      );
    }
    return userDTO;
  }
}
