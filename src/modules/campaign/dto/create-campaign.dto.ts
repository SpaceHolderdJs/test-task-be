import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, IsNumber } from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({ example: 'some name', description: 'some name' })
  @IsString({ message: 'must be a string value' })
  readonly name: string;
  @IsString({ message: 'must be a string value' })
  @ApiProperty({ example: 'some description', description: 'some description' })
  readonly description: string;

  @IsNumber({}, { message: 'must be a numeric value' })
  @ApiProperty({ example: 123.2, description: 'goal amount' })
  readonly goalAmount: number;
}
