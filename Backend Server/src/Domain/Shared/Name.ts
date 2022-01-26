import { ValueObject } from "./ValueObject";

export class Name extends ValueObject {
  private name: string;

  constructor(name: string) {
    if (name.length <= 0 || name === null) {
      throw new Error("Invalid Name");
    }
    super();
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}
