import { Container, injectable } from "inversify";
import { TYPES } from "../InversifyConfig/types";
import { DonationDTO } from "../DTO/DonationDTO";
import { Donation } from "../Domain/Donation/Donation";
import { DonationMapper } from "../Mapper/DonationMapper";
import { IDonationRepository } from "../Repository/InterfacesRepository/IDonationRepository";
import { IUserRepository } from "../Repository/InterfacesRepository/IUserRepository";
import { Web3Service } from "../Web3/Web3Service";
import { User } from "../Domain/User/User";
import { Donator } from "../Domain/User/Donator";
import { Association } from "../Domain/User/Association";

export class DonationService {
  private donationRepository: IDonationRepository;
  private userRepository: IUserRepository;
  private web3Service: Web3Service;

  constructor(container: Container) {
    this.donationRepository = container.get<IDonationRepository>(
      TYPES.DonationRepository
    );
    this.userRepository = container.get<IUserRepository>(TYPES.UserRepository);
    this.web3Service = new Web3Service();
  }

  async donate(donationDTO: DonationDTO): Promise<DonationDTO> {
    const donation: Donation = DonationMapper.dto2Domain(donationDTO);
    let donator: User = await this.userRepository.findById(
      donation.getDonatorID()
    );
    let association: User = await this.userRepository.findById(
      donation.getAssociationId()
    );
    let txHash: string = await this.web3Service.sendTransactionFromUser(
      donator.getPublicAddress(),
      association.getPublicAddress(),
      donator.getPassword().getPassword(),
      donation.getValue().toString()
    );
    donation.setTransactionId(txHash);
    donation.setDate(new Date());
    const donationResponse: Donation = await this.donationRepository.save(
      donation
    );
    await this.userRepository.updateUsersDonations(
      donation.getDonatorID(),
      donation.getAssociationId(),
      donation.getValue()
    );
    const donationResponseDTO: DonationDTO =
      DonationMapper.domain2Dto(donationResponse);
    return donationResponseDTO;
  }

  async getDonationByID(id: string): Promise<DonationDTO> {
    const donationResponse: Donation = await this.donationRepository.findById(
      id
    );
    const donationResponseDTO: DonationDTO =
      DonationMapper.domain2Dto(donationResponse);
    return donationResponseDTO;
  }

  async getDonationsByDonatorID(id: string): Promise<Array<DonationDTO>> {
    const donationsResponse: Array<Donation> =
      await this.donationRepository.getDonationsByDonatorID(id);
    const donationsResponseDTO: Array<DonationDTO> =
      donationsResponse.map<DonationDTO>((donation) =>
        DonationMapper.domain2Dto(donation)
      );
    return donationsResponseDTO;
  }

  async getDonationsByAssociationID(id: string): Promise<Array<DonationDTO>> {
    const donationsResponse: Array<Donation> =
      await this.donationRepository.getDonationsByAssociationID(id);
    const donationsResponseDTO: Array<DonationDTO> =
      donationsResponse.map<DonationDTO>((donation) =>
        DonationMapper.domain2Dto(donation)
      );
    return donationsResponseDTO;
  }

  async deleteDonation(id: string): Promise<boolean> {
    return this.donationRepository.deleteDonation(id);
  }
}
