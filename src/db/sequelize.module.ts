import { EnviromentNames } from '@/common/enums/enviroment-names';
import { getEnviroment } from '@/common/helpers/evniroment-getter.helper';
import { Campaign } from '@/modules/campaign/campaign.model';
import { Donation } from '@/modules/donation/donation.model';
import { SequelizeModule } from '@nestjs/sequelize';

export const sequelizeModule = SequelizeModule.forRoot({
  dialect: 'postgres',
  host: getEnviroment(EnviromentNames.POSTGRES_HOST),
  port: Number(getEnviroment(EnviromentNames.POSTGRES_PORT)),
  username: getEnviroment(EnviromentNames.POSTGRES_USER),
  password: getEnviroment(EnviromentNames.POSTGRES_PASSWORD),
  database: getEnviroment(EnviromentNames.POSTGRES_DB),
  models: [Campaign, Donation],
  autoLoadModels: true,
  protocol: 'postgres',
  dialectOptions: {
    ssl: true,
    native: true,
  },
});
