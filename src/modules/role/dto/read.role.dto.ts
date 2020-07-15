import { IsString, MaxLength, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadRoleDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'El nombre no es valido' })
  readonly name: string;

  @Expose()
  @IsString()
  @MaxLength(100, { message: 'El nombre no es valido' })
  readonly description: string;
}
