import { Name } from "../Shared/Name";
import { Email } from "./Email";
import { Password } from "./Password";
import { User } from "./User";

export class Donator extends User {
  private country: string;

  private donationsCounter: number;

  private totalCoinDonated: number;

  constructor(
    id: string,
    country: string,
    name: Name,
    password: Password,
    email: Email,
    role: string,
    counter: number,
    totalCoinDonated: number
  ) {
    super(id, name, password, email, role);
    this.country = country;
    this.donationsCounter = counter;
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

  public getDonationsCounter(): number {
    return this.donationsCounter;
  }

  public getTotalCoinDonated(): number {
    return this.totalCoinDonated;
  }
}
