import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    RoleModule,
    AuthModule,
    SharedModule,
  ],
})
export class AppModule {
  static port: number | string;

  //Inyectar un objeto de tipo ConfigService
  constructor(private readonly _configService: ConfigService) {
    //Definir puerto cuando inicie la aplicacion
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
