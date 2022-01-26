import { Donation } from "../../Domain/Donation/Donation";
import { IRepository } from "./IRepository";

export interface IDonationRepository extends IRepository {

    getDonationsByDonatorID(id: string): Promise<Array<Donation>>;

    getDonationsByAssociationID(id: string): Promise<Array<Donation>>;

    deleteDonation(id: string): Promise<boolean>;

}
