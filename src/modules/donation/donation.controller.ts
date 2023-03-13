import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Donation } from './donation.model';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { MarkDonationAsFraudDto } from './dto/mark-donation-as-fraud.dto';

@ApiTags('donations')
@Controller('donation')
export class DonationController {
  constructor(private donationService: DonationService) {}

  @Post()
  create(@Body() dto: CreateDonationDto) {
    return this.donationService.createDonate(dto);
  }

  @Post('/mark-donation-as-fraud')
  markDonatorAsFraud(@Body() dto: MarkDonationAsFraudDto) {
    return this.donationService.markDonatorAsFraud(dto);
  }

  @ApiOperation({ summary: 'get all donations' })
  @ApiResponse({ status: HttpStatus.OK, type: [Donation] })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllRoles() {
    return this.donationService.getAllDonates();
  }
}
