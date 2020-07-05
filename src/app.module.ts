import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  //Inyectar un objeto de tipo ConfigService
  constructor(private readonly _configService: ConfigService) {
    //Definir puerto cuando inicie la aplicacion
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
