import { Land } from "../Domain/Land/Land";
import { Name } from "../Domain/Shared/Name";
import { Email } from "../Domain/User/Email";
import { Password } from "../Domain/User/Password";
import { User } from "../Domain/User/User";
import { Username } from "../Domain/User/Username";
import { LandDTO } from "../DTO/LandDTO";
import { UserDTO } from "../DTO/UserDTO";
import { ILandModel } from "../Model/LandModel";
import UserModel, { IUserModel } from "../Model/UserModel";
import { LandMapper } from "./LandMapper";

export class UserMapper {
  static json2Dto(body: any): UserDTO {
    return new UserDTO(body.id, body.name, body.username, body.password, body.email, body.landList);
  }

  static dto2Domain(userDTO: UserDTO): User {
    var userDomain = new User(
      userDTO.id,
      new Name(userDTO.name),
      new Username(userDTO.username),
      new Password(userDTO.password),
      new Email(userDTO.email),
      userDTO.landList.map<Land>((landDto) => LandMapper.dto2Domain(landDto))
    );
    return userDomain;
  }

  static domain2Model(user: User): IUserModel {
    let userModel = new UserModel({
      id: user.getID(),
      name: user.getName().getName(),
      username: user.getUsername().getUsername(),
      password: user.getPassword().getPassword(),
      email: user.getEmail().getEmail(),
      landList: user.getLandList().map<ILandModel>((land) => LandMapper.domain2Model(land)),
    });
    return userModel;
  }

  static model2Domain(userModel: IUserModel): User {
    var userDomain = new User(
      userModel._id.valueOf(),
      new Name(userModel.name),
      new Username(userModel.username),
      new Password(userModel.password),
      new Email(userModel.email),
      userModel.landList.map<Land>((landModel) => LandMapper.model2Domain(landModel))
    );
    return userDomain;
  }

  static domain2Dto(user: User): UserDTO {
    let userDto = new UserDTO(
      user.getID(),
      user.getName().getName(),
      user.getUsername().getUsername(),
      user.getPassword().getPassword(),
      user.getEmail().getEmail(),
      user.getLandList().map<LandDTO>((land) => LandMapper.domain2Dto(land))
    );
    return userDto;
  }
}
