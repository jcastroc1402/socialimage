import * as fs from 'fs';
import { parse } from 'dotenv';

//Definir la configuracion de entorno
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnviroment = process.env.NODE_ENV !== 'production';

    //Definir puerto especifico en caso de ser desarrolo
    //Definir puerto provisto por el proveedor de host en caso de ser produccion

    if (isDevelopmentEnviroment) {
      const envFilePath = __dirname + '/../../.env';
      const existsPath = fs.existsSync(envFilePath);

      if (!existsPath) {
        console.log('.env no existe');
        process.exit(0);
      }

      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
      };
    }
  }

  //Obtener key especifico del .env
  get(key: string): string {
    return this.envConfig[key];
  }
}
