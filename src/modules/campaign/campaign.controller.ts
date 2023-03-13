import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Campaign } from './campaign.model';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@ApiTags('campaigns')
@Controller('campaign')
export class CampaignController {
  constructor(private campaignService: CampaignService) {}

  @Post()
  create(@Body() dto: CreateCampaignDto) {
    return this.campaignService.createCampaign(dto);
  }

  @ApiOperation({ summary: 'get all campaigns' })
  @ApiResponse({ status: HttpStatus.OK, type: [Campaign] })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllRoles() {
    return this.campaignService.getAllCampaigns();
  }
}
