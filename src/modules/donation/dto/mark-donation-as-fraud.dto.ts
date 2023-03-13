import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString } from 'class-validator';

export class MarkDonationAsFraudDto {
  @ApiProperty({ example: 'some name', description: 'some name' })
  @IsString({ message: 'must be a string value' })
  readonly donatorName: string;
}
