import { UserDTO } from "../DTO/UserDTO";
import { User } from "../Domain/User/User";
import { UserMapper } from "../Mapper/UserMapper";
import { IUserRepository } from "../Repository/InterfacesRepository/IUserRepository";
import { LandDTO } from "../DTO/LandDTO";
import { LandMapper } from "../Mapper/LandMapper";
import { Land } from "../Domain/Land/Land";
import { LotDTO } from "../DTO/LotDTO";
import { LotMapper } from "../Mapper/LotMapper";
import { Lot } from "../Domain/Land/Lot";
import { EquipmentMapper } from "../Mapper/EquipmentMapper";
import { Equipment } from "../Domain/Land/Equipment";
import { EquipmentDTO } from "../DTO/EquipmentDTO";
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

  async addLandByUserID(id: string, landDTO: LandDTO): Promise<LandDTO> {
    const land: Land = LandMapper.dto2Domain(landDTO);
    const landResponse: Land = await this.userRepository.addLandToUser(id, land);
    const landResponseDTO: LandDTO = LandMapper.domain2Dto(landResponse);
    return landResponseDTO;
  }

  async updateUserLandByID(id: string, landDTO: LandDTO): Promise<LandDTO> {
    const land: Land = LandMapper.dto2Domain(landDTO);
    const landResponse: Land = await this.userRepository.updateUserLand(id, land);
    const landResponseDTO: LandDTO = LandMapper.domain2Dto(landResponse);
    return landResponseDTO;
  }

  async getUserLandByID(userID: string, landID: string): Promise<LandDTO> {
    const landResponseDomain: Land = await this.userRepository.findUserLandById(userID, landID);
    const landResponseDTO: LandDTO = LandMapper.domain2Dto(landResponseDomain);
    return landResponseDTO;
  }

  async deleteUserLand(userID: string, landID: string): Promise<boolean> {
    return await this.userRepository.deleteUserLand(userID, landID);
  }

  async addLotByUserIDLandID(id: string, landID: string, lotDTO: LotDTO): Promise<LotDTO> {
    const lot: Lot = LotMapper.dto2Domain(lotDTO);
    const lotResponse: Lot = await this.userRepository.addLotToUser(id, landID, lot);
    const lotResponseDTO: LotDTO = LotMapper.domain2Dto(lotResponse);
    return lotResponseDTO;
  }

  async updateUserLotByUserIDLandID(id: string, landID: string, lotDTO: LotDTO): Promise<LotDTO> {
    const lot: Lot = LotMapper.dto2Domain(lotDTO);
    const lotResponse: Lot = await this.userRepository.updateUserLot(id, landID, lot);
    const lotResponseDTO: LotDTO = LotMapper.domain2Dto(lotResponse);
    return lotResponseDTO;
  }

  async getUserLotByUserIDLandID(userID: string, landID: string, lotID: string): Promise<LotDTO> {
    const lotResponseDomain: Lot = await this.userRepository.findUserLotById(userID, landID, lotID);
    const lotResponseDTO: LotDTO = LotMapper.domain2Dto(lotResponseDomain);
    return lotResponseDTO;
  }

  async deleteUserLot(userID: string, landID: string, lotID: string): Promise<boolean> {
    return await this.userRepository.deleteUserLot(userID, landID, lotID);
  }

  async addEquipmentByUserIDLandIDLotID(
    id: string,
    landID: string,
    lotID: string,
    equipmentDTO: EquipmentDTO
  ): Promise<EquipmentDTO> {
    const equipment: Equipment = EquipmentMapper.dto2Domain(equipmentDTO);
    const equipmentResponse: Equipment = await this.userRepository.addEquipmentToUser(id, landID, lotID, equipment);
    const equipmentResponseDTO: EquipmentDTO = EquipmentMapper.domain2Dto(equipmentResponse);
    return equipmentResponseDTO;
  }

  async updateEquipmentByUserIDLandIDLotID(
    id: string,
    landID: string,
    lotID: string,
    equipmentDTO: EquipmentDTO
  ): Promise<EquipmentDTO> {
    const equipment: Equipment = EquipmentMapper.dto2Domain(equipmentDTO);
    const equipmentResponse: Equipment = await this.userRepository.updateUserEquipment(id, landID, lotID, equipment);
    const equipmentResponseDTO: EquipmentDTO = EquipmentMapper.domain2Dto(equipmentResponse);
    return equipmentResponseDTO;
  }

  async getEquipmentByUserIDLandIDLotIDEquipmentID(
    userID: string,
    landID: string,
    lotID: string,
    equipmentID: string
  ): Promise<EquipmentDTO> {
    const equipmentResponseDomain: Equipment = await this.userRepository.findUserEquipmentById(
      userID,
      landID,
      lotID,
      equipmentID
    );
    const equipmentResponseDTO: EquipmentDTO = EquipmentMapper.domain2Dto(equipmentResponseDomain);
    return equipmentResponseDTO;
  }

  async deleteEquipment(userID: string, landID: string, lotID: string, equipmentID: string): Promise<boolean> {
    return await this.userRepository.deleteUserEquipment(userID, landID, lotID, equipmentID);
  }
}
