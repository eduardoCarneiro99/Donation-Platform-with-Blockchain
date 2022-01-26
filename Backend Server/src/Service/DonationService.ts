import { Container, injectable } from "inversify";
import { TYPES } from "../InversifyConfig/types";
import { DonationDTO } from "../DTO/DonationDTO";
import { Donation } from "../Domain/Donation/Donation";
import { DonationMapper } from "../Mapper/DonationMapper";
import { IDonationRepository } from "../Repository/InterfacesRepository/IDonationRepository";
import { IUserRepository } from "../Repository/InterfacesRepository/IUserRepository";

export class DonationService {
  private donationRepository: IDonationRepository;
  private userRepository: IUserRepository;

  constructor(container: Container) {
    this.donationRepository = container.get<IDonationRepository>(TYPES.DonationRepository);
    this.userRepository = container.get<IUserRepository>(TYPES.UserRepository);
  }

  async donate(donationDTO: DonationDTO): Promise<DonationDTO> {
    const donation: Donation = DonationMapper.dto2Domain(donationDTO);
    //TODO: ACTUALLY MAKE THE TRANSACTION
    let donationHash: string = "Hash completamente legit"; //TODO: GET THE HASH FROM THE WEB3 SCRIPT
    donation.setTransactionId(donationHash);
    const donationResponse: Donation = await this.donationRepository.save(donation);
    await this.userRepository.updateUsersDonations(donation.getDonatorID(), donation.getAssociationId(), donation.getValue());
    const donationResponseDTO: DonationDTO = DonationMapper.domain2Dto(donationResponse);
    return donationResponseDTO;
  }

  async getDonationByID(id: string): Promise<DonationDTO> {
    const donationResponse: Donation = await this.donationRepository.findById(id);
    const donationResponseDTO: DonationDTO = DonationMapper.domain2Dto(donationResponse);
    return donationResponseDTO;
  }

  async getDonationsByDonatorID(id: string): Promise<Array<DonationDTO>> {
    const donationsResponse: Array<Donation> = await this.donationRepository.getDonationsByDonatorID(id);
    const donationsResponseDTO: Array<DonationDTO> = donationsResponse.map<DonationDTO>((donation) => DonationMapper.domain2Dto(donation));
    return donationsResponseDTO;
  }

  async getDonationsByAssociationID(id: string): Promise<Array<DonationDTO>> {
    const donationsResponse: Array<Donation> = await this.donationRepository.getDonationsByAssociationID(id);
    const donationsResponseDTO: Array<DonationDTO> = donationsResponse.map<DonationDTO>((donation) => DonationMapper.domain2Dto(donation));
    return donationsResponseDTO;
  }

  async deleteDonation(id: string): Promise<boolean> {
    return this.donationRepository.deleteDonation(id);
  }
}
