import { Entity } from "../Shared/Entity";

export class Donation extends Entity {
  public value: number;
  public description: string;
  public date: Date;
  public transactionId: string;
  public donatorId: string;
  public associationId: string;

  constructor(
    id: string,
    value: number,
    description: string,
    date: Date,
    transactionId: string,
    donatorId: string,
    associationId: string
  ) {
    super(id);
    this.value = value;
    this.description = description;
    this.date = date;
    this.transactionId = transactionId;
    this.donatorId = donatorId;
    this.associationId = associationId;
  }

  public getValue(): number {
    return this.value;
  }

  public getDescription(): string {
    return this.description;
  }

  public getDate(): Date {
    return this.date;
  }

  public getTransactionId(): string {
    return this.transactionId;
  }

  public getDonatorID(): string {
    return this.donatorId;
  }

  public getAssociationId(): string {
    return this.associationId;
  }
}
