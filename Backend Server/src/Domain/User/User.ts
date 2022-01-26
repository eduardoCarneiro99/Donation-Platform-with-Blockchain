import { Password } from "./Password";
import { AggregateRoot } from "../Shared/AggregateRoot";
import { Email } from "./Email";
import { Name } from "../Shared/Name";

export class User extends AggregateRoot {
  private password: Password;

  private email: Email;

  private name: Name;

  private role: string;

  constructor(id: string, name: Name, password: Password, email: Email, role: string) {
    super(id);
    this.name = name;
    this.password = password;
    this.email = email;
    this.role = role;
  }

  public getID(): string {
    return super.getID();
  }

  public getName(): Name {
    return this.name;
  }

  public getPassword(): Password {
    return this.password;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getRole(): string {
    return this.role;
  }
}
