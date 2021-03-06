import { IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @MaxLength(50, { message: 'El nombre no es valido' })
  readonly name: string;

  @IsString()
  @MaxLength(100, { message: 'El nombre no es valido' })
  readonly description: string;
}
