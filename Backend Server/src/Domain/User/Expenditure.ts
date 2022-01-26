import { Entity } from "../Shared/Entity";

export class Expenditure extends Entity {
  public value: number;
  public justification: string;
  public date: Date;
  public transactionId: string;

  constructor(id: string, value: number, justification: string, date: Date, transactionId: string) {
    super(id);
    this.value = value;
    this.justification = justification;
    this.date = date;
    this.transactionId = transactionId;
  }

  public getValue(): number {
    return this.value;
  }

  public getJustification(): string {
    return this.justification;
  }

  public getDate(): Date {
    return this.date;
  }

  public getTransactionId(): string {
    return this.transactionId;
  }
}
