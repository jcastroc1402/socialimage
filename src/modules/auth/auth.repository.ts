import { Repository, EntityRepository, getConnection } from 'typeorm';
import { User } from '../user/user.entity';
import { SignUpDto } from './dto';
import { RoleRepository } from '../role/role.repository';
import { Role } from '../role/role.entity';
import { RoleType } from '../role/roletype.enum';
import { UserDetails } from '../user/user.details.entity';
import { hash, genSalt } from 'bcryptjs';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async SignUp(signUpDto: SignUpDto) {
    const { username, email, password } = signUpDto;

    const user: User = new User();

    user.username = username;
    user.email = email;
    user.password = password;

    //Obtener repositorio a usar
    const roleRepository: RoleRepository = await getConnection().getRepository(
      Role,
    );

    //Obtener rol por defecto y asignarlo al usuario
    const defaultRole: Role = await roleRepository.findOne({
      where: { name: RoleType.GENERAL },
    });

    user.roles = [defaultRole];

    //Agregar detalles de usuario vacio
    const userDetails: UserDetails = new UserDetails();

    user.details = userDetails;

    //Generar salt de 10 caracteres para el password
    const salt = await genSalt(10);

    //Asignar el hash
    user.password = await hash(password, salt);

    await this.save(user);
  }
}
