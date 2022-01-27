import { Expenditure } from "../../Domain/User/Expenditure";
import { User } from "../../Domain/User/User";
import { IRepository } from "./IRepository";

export interface IUserRepository extends IRepository {
  getAssociations(): Promise<Array<User>>;

  findByEmail(email: string): Promise<User>;

  deleteUser(id: string): Promise<boolean>;

  addExpenditureToUser(id: String, expenditure: Expenditure): Promise<Expenditure>;

  updateUserExpenditure(id: String, expenditure: Expenditure): Promise<Expenditure>;

  findUserExpenditureById(userID: string, expenditureID: string): Promise<Expenditure>;

  deleteUserExpenditure(userID: string, expenditureID: string): Promise<boolean>;

  updateUsersDonations(donatorID: string, associationID: string, value: number): Promise<boolean>;

  addFunds(user: User, amount: number): Promise<boolean>

  withdrawFunds(user: User, amount: number): Promise<boolean>
}
