import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Campaign } from './campaign.model';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel(Campaign) private campaignRepository: typeof Campaign,
  ) {}

  async createCampaign(dto: CreateCampaignDto) {
    return this.campaignRepository.create(dto, { include: { all: true } });
  }

  async getAllCampaigns() {
    return this.campaignRepository.findAll({ include: { all: true } });
  }
}
