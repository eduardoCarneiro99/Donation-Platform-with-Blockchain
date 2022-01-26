import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { UserService } from "../Service/UserService";
import { IUserRepository } from "../Repository/InterfacesRepository/IUserRepository";
import { MongoUserRepository } from "../Repository/MongoRepository/MongoUserRepository";

let container = new Container();

container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<IUserRepository>(TYPES.UserRepository).to(MongoUserRepository);

export default container;
