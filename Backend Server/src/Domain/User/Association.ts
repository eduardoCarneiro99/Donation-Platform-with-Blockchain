import { Name } from "../Shared/Name";
import { Email } from "./Email";
import { Password } from "./Password";
import { User } from "./User";
import { Expenditure } from "./Expenditure";

export class Association extends User {
  private description: string;

  private donationsReceivedCounter: number;

  private totalCoinReceived: number;

  public expendituresList: Array<Expenditure>;

  constructor(
    id: string,
    description: string,
    name: Name,
    password: Password,
    email: Email,
    role: string,
    publicAddress: string,
    currentEther: number,
    donationsReceivedCounter: number,
    totalCoinReceived: number,
    expendituresList: Array<Expenditure>
  ) {
    super(id, name, password, email, role, publicAddress, currentEther);
    this.description = description;
    this.donationsReceivedCounter = donationsReceivedCounter;
    this.totalCoinReceived = totalCoinReceived;
    this.expendituresList = expendituresList;
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

  public getDescription(): string {
    return this.description;
  }

  public getDonationsReceivedCounter(): number {
    return this.donationsReceivedCounter;
  }

  public getTotalCoinReceived(): number {
    return this.totalCoinReceived;
  }

  public getExpenditureList(): Array<Expenditure> {
    return this.expendituresList;
  }
}
