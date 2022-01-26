import { ValueObject } from "../Shared/ValueObject";

export class Password extends ValueObject {
  private password: string;

  constructor(password: string) {
    super();
    if (password.length < 8 || password === null) {
      throw new Error("Invalid Password");
    }
    this.password = password;
  }

  public getPassword(): string {
    return this.password;
  }
}
