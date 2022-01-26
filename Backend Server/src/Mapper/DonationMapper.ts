import { Donation } from "../Domain/Donation/Donation";
import { DonationDTO } from "../DTO/DonationDTO";
import DonationModel, { IDonationModel } from "../Model/DonationModel";

export class DonationMapper {
  static json2Dto(body: any): DonationDTO {
    return new DonationDTO(
      body.id,
      body.value,
      body.description,
      body.date,
      body.transactionId,
      body.donatorId,
      body.associationId
    );
  }

  static dto2Domain(donationDTO: DonationDTO): Donation {
    let donation = new Donation(
      donationDTO.id,
      donationDTO.value,
      donationDTO.description,
      new Date(donationDTO.date),
      donationDTO.transactionId,
      donationDTO.donatorId,
      donationDTO.associationId
    );
    return donation;
  }

  static domain2Model(donation: Donation): IDonationModel {
    let donationModel = new DonationModel({
      id: donation.getID(),
      value: donation.getValue(),
      description: donation.getDescription(),
      date: donation.getDate().toDateString(),
      transactionId: donation.getTransactionId(),
      donatorId: donation.getDonatorID(),
      associationId: donation.getAssociationId(),
    });
    return donationModel;
  }

  static model2Domain(donationModel: IDonationModel): Donation {
    let donation = new Donation(
      donationModel.id,
      donationModel.value,
      donationModel.description,
      new Date(donationModel.date),
      donationModel.transactionId,
      donationModel.donatorId,
      donationModel.associationId
    );
    return donation;
  }

  static domain2Dto(donation: Donation): DonationDTO {
    let donationDTO = new DonationDTO(
      donation.getID(),
      donation.getValue(),
      donation.getDescription(),
      donation.getDate().toDateString(),
      donation.getTransactionId(),
      donation.getDonatorID(),
      donation.getAssociationId()
    );
    return donationDTO;
  }
}
