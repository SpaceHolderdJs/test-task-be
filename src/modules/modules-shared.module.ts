import { Module } from '@nestjs/common';
import { CampaignModule } from '@/modules/campaign/campaign.module';
import { DonationModule } from './donation/donation.module';

@Module({
  imports: [CampaignModule, DonationModule],
})
export class ModulesSharedModule {}
