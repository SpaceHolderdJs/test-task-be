import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Campaign } from './campaign.model';
import { DonationModule } from '../donation/donation.module';

@Module({
  providers: [CampaignService],
  controllers: [CampaignController],
  imports: [SequelizeModule.forFeature([Campaign]), DonationModule],
})
export class CampaignModule {}
