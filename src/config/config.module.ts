import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

//Al importar modulo se obtiene una instancia del servicio
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
