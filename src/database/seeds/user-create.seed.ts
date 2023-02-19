import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { UserRoles } from '../../modules/user/enums/user.enum';
import { User } from '../../modules/user/user.entity';

export class UserCreateSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await getManager().query('TRUNCATE users');
    await factory(User)().create({
      name: 'Management API',
      email: process.env.MANAGEMENT_API_NAME,
      password: process.env.MANAGEMENT_API_PW,
      role: UserRoles.ADMIN,
    });
    // await factory(User)().createMany(20);
  }
}
