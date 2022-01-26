import { StringLiteralLike } from "typescript";
import { ExpenditureDTO } from "./ExpenditureDTO";

export class UserDTO {
  public id: string;
  public name: string;
  public password: string;
  public email: string;
  public role: string;
  public country: string;
  public donationsSentCounter: number;
  public totalCoinDonated: number;
  public description: string;
  public donationsReceivedCounter: number;
  public totalCoinReceived: number
  public expenditureList: Array<ExpenditureDTO>;

  constructor(id: string, name: string, password: string, email: string, role: string, country: string, donationsSentCounter: number, totalCoinDonated: number, description: string, donationsReceivedCounter:number, totalCoinReceived: number, expenditureList: Array<ExpenditureDTO>) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.role = role;
    this.country = country;
    this.donationsSentCounter = donationsSentCounter;
    this.totalCoinDonated = totalCoinDonated;
    this.description = description;
    this.donationsReceivedCounter = donationsReceivedCounter;
    this.totalCoinReceived = totalCoinReceived;
    this.expenditureList = expenditureList;
  }
}
