import { ValueObject } from "./ValueObject";

export class Description extends ValueObject {
  private description: string;

  constructor(description: string) {
    if (description === null) {
      throw new Error("Invalid Description");
    }
    super();
    this.description = description;
  }

  public getDescription(): string {
    return this.description;
  }
}
