import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Campaign } from '../campaign/campaign.model';
import { CampaignStatus } from '../campaign/enums/campaign-status';
import { Donation } from './donation.model';
import { CreateDonationDto } from './dto/create-donation.dto';
import { MarkDonationAsFraudDto } from './dto/mark-donation-as-fraud.dto';
import { DonationStatus } from './enums/donation-state';

@Injectable()
export class DonationService {
  constructor(
    @InjectModel(Donation) private donationRepository: typeof Donation,
    @InjectModel(Campaign) private campaignRepository: typeof Campaign,
  ) {}

  async createDonate(dto: CreateDonationDto) {
    const [donation, campaign] = await Promise.all([
      this.donationRepository.create(dto, { include: { all: true } }),
      this.campaignRepository.findOne({
        where: { id: dto.campaignId },
        include: { all: true },
      }),
    ]);

    if (campaign.goalAmount <= campaign.goalAmount + dto.amount) {
      await campaign.update({ status: CampaignStatus.SUCCESSFUL });
    }

    return donation;
  }

  async getAllDonates() {
    return this.donationRepository.findAll({ include: { all: true } });
  }

  // script for postgres but i prefer use in code

  //   CREATE OR REPLACE FUNCTION MarkDonatorAsFraud(IN donatorNickname varchar)
  // RETURNS void AS
  // $$
  // BEGIN
  //   UPDATE donations SET isFraud = true
  //   WHERE donatorNickname = $1;

  //   UPDATE campaigns SET isFraud = true
  //   WHERE id IN (
  //     SELECT DISTINCT campaignId FROM donations WHERE donatorNickname = $1
  //   );
  // END;
  // $$
  // LANGUAGE 'plpgsql';

  async markDonatorAsFraud(dto: MarkDonationAsFraudDto) {
    const { donatorName } = dto;

    const donations = await Donation.findAll({ where: { donatorName } });
    const campaignIds = donations.map((donation) => donation.campaignId);

    Promise.all([
      Donation.update(
        { status: DonationStatus.FRAUD },
        { where: { donatorName } },
      ),
      Campaign.update(
        { status: CampaignStatus.FRAUD },
        { where: { id: campaignIds } },
      ),
    ]);
  }
}
