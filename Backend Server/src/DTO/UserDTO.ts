export class UserDTO {
  public id: string;
  public name: string;
  public username: string;
  public password: string;
  public email: string;
  public role: string;

  constructor(id: string, name: string, username: string, password: string, email: string, role: string) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
  }
}
