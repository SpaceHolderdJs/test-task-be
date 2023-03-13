import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, IsNumber, IsUUID } from 'class-validator';

export class CreateDonationDto {
  @ApiProperty({ example: 'some name', description: 'some name' })
  @IsString({ message: 'must be a string value' })
  readonly donatorName: string;
  @IsUUID('4', { message: 'must be a string value' })
  @ApiProperty({
    example: '17c06267-964e-4b5f-a55a-b884452a72fc',
    description: 'id of canpaign that donated',
  })
  readonly campaignId: string;

  @IsNumber({}, { message: 'must be a numeric value' })
  @ApiProperty({ example: 1231.32, description: 'donate amount' })
  readonly amount: number;
}
