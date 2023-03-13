import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Donation } from './donation.model';
import { Campaign } from '../campaign/campaign.model';

@Module({
  providers: [DonationService],
  controllers: [DonationController],
  imports: [SequelizeModule.forFeature([Donation, Campaign])],
})
export class DonationModule {}
