import type { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../dtos";
import type { User } from "../entities/User";

export interface IUsersRepository {
  findUserWithGamesById(data: IFindUserWithGamesDTO): Promise<User>;
  findAllUsersOrderedByFirstName(): Promise<User[]>;
  findUserByFullName(data: IFindUserByFullNameDTO): Promise<User[] | undefined>;
}
