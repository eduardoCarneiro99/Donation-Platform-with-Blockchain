import { UserDTO } from "../DTO/UserDTO";
import { User } from "../Domain/User/User";
import { UserMapper } from "../Mapper/UserMapper";
import { IUserRepository } from "../Repository/InterfacesRepository/IUserRepository";
import { Container, injectable } from "inversify";
import { TYPES } from "../InversifyConfig/types";

export class UserService {
  private userRepository: IUserRepository;

  constructor(container: Container) {
    this.userRepository = container.get<IUserRepository>(TYPES.UserRepository);
  }

  /**
   *
   * @param userDTO
   * @returns
   */
  async createUser(userDTO: UserDTO): Promise<UserDTO> {
    const userDomain: User = UserMapper.dto2Domain(userDTO);
    const userDomainResponse: User = await this.userRepository.save(userDomain);
    const userResponseDTO: UserDTO = UserMapper.domain2Dto(userDomainResponse);
    return userResponseDTO;
  }

  /**
   *
   * @param id
   * @returns
   */
  async getUserById(id: string): Promise<UserDTO> {
    const userResponseDomain: User = await this.userRepository.findById(id);
    const userResponseDTO: UserDTO = UserMapper.domain2Dto(userResponseDomain);
    return userResponseDTO;
  }

  /**
   *
   * @param id
   * @returns
   */
  async getUserByEmail(email: string): Promise<UserDTO> {
    const userResponseDomain: User = await this.userRepository.findByEmail(email);
    const userResponseDTO: UserDTO = UserMapper.domain2Dto(userResponseDomain);
    return userResponseDTO;
  }

  /**
   *
   * @param userDTO
   * @returns
   */
  async editUser(userDTO: UserDTO): Promise<UserDTO> {
    var userRequestDomain: User = UserMapper.dto2Domain(userDTO);
    const userDomain: User = await this.userRepository.change(userRequestDomain);
    var userResponseDomain: UserDTO = UserMapper.domain2Dto(userDomain);

    return userResponseDomain;
  }

  /**
   * Method that calls the repository to delete an user
   * @param id user's id
   */
  async deleteUser(id: string): Promise<boolean> {
    return await this.userRepository.deleteUser(id);
  }
}
