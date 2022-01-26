import { UserDTO } from "../DTO/UserDTO";
import { User } from "../Domain/User/User";
import { UserMapper } from "../Mapper/UserMapper";
import { IUserRepository } from "../Repository/InterfacesRepository/IUserRepository";
import { Container, injectable } from "inversify";
import { TYPES } from "../InversifyConfig/types";
import { Web3Service } from "../Web3/Web3Service";

export class UserService {
  private userRepository: IUserRepository;
  private web3Service: Web3Service;

  constructor(container: Container) {
    this.userRepository = container.get<IUserRepository>(TYPES.UserRepository);
    this.web3Service = new Web3Service();
  }

  /**
   *
   * @param userDTO
   * @returns
   */
  async createUser(userDTO: UserDTO): Promise<UserDTO> {
    const userDomain: User = UserMapper.dto2Domain(userDTO);
    let publicAddress: string = await this.web3Service.createAccount(userDomain.getPassword().getPassword());
    userDomain.setPublicAddress(publicAddress);
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

  async addFunds(id: string, amount: number): Promise<boolean> {
    let user: User = await this.userRepository.findById(id);
    await this.web3Service.sendTransactionFromAdmin(user.getPublicAddress(), amount.toString());
    return await this.userRepository.addFunds(user, amount);
  }

  async withdrawFunds(id: string, amount: number): Promise<boolean> {
    let user: User = await this.userRepository.findById(id);
    await this.web3Service.sendTransactionFromUserToAdmin(user.getPublicAddress(), user.getPassword().getPassword(), amount.toString());
    return await this.userRepository.withdrawFunds(user, amount);
  }
}
