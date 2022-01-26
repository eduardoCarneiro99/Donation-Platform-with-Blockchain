import { ValueObject } from "../Shared/ValueObject";

const regex =
  /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;

export class Email extends ValueObject {
  private email: string;

  constructor(email: string) {
    if (!regex.test(email)) {
      throw new Error("Invalid Email");
    }
    super();
    this.email = email;
  }

  public getEmail(): string {
    return this.email;
  }
}
