import type { Repository } from "typeorm";
import { getRepository } from "typeorm";

import type { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";
import type { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games = this.repository
      .createQueryBuilder()
      .where(`UPPER(title) LIKE CONCAT('%', UPPER('${param}'), '%')`)
      .getMany();

    return games;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const rows = await this.repository.query(
      "SELECT COUNT(*) as count FROM games"
    );

    return rows;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users = (await this.repository
      .createQueryBuilder()
      .relation(Game, "users")
      .of(id)
      .loadMany()) as unknown as User[];

    return users;
  }
}
