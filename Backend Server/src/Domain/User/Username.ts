import { ValueObject } from "../Shared/ValueObject";

export class Username extends ValueObject {
  private username: string;

  constructor(username: string) {
    if (username.length <= 0 || username === null) {
      throw new Error("Invalid Username");
    }
    super();
    this.username = username;
  }

  public getUsername(): string {
    return this.username;
  }
}
