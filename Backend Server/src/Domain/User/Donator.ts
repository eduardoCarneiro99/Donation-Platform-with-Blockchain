import { Name } from "../Shared/Name";
import { Email } from "./Email";
import { Password } from "./Password";
import { User } from "./User";

export class Donator extends User {
  private country: string;

  private donationsSentCounter: number;

  private totalCoinDonated: number;

  constructor(
    id: string,
    country: string,
    name: Name,
    password: Password,
    email: Email,
    role: string,
    publicAddress: string,
    currentEther: number,
    donationsSentCounter: number,
    totalCoinDonated: number
  ) {
    super(id, name, password, email, role, publicAddress, currentEther);
    this.country = country;
    this.donationsSentCounter = donationsSentCounter;
    this.totalCoinDonated = totalCoinDonated;
  }

  public getID(): string {
    return super.getID();
  }

  public getName(): Name {
    return super.getName();
  }

  public getPassword(): Password {
    return super.getPassword();
  }

  public getEmail(): Email {
    return super.getEmail();
  }

  public getCountry(): string {
    return this.country;
  }

  public getDonationsSentCounter(): number {
    return this.donationsSentCounter;
  }

  public getTotalCoinDonated(): number {
    return this.totalCoinDonated;
  }
}
