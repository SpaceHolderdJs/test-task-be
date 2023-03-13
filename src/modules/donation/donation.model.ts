import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Campaign } from '../campaign/campaign.model';
import { DonationStatus } from './enums/donation-state';

interface DonationCreationAttributes {
  donatorName: string;
  amount: number;
}

@Table({
  tableName: 'donations',
})
export class Donation extends Model<Donation, DonationCreationAttributes> {
  @Default(DataType.UUIDV4)
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'some name',
    description: 'name of donator',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  donatorName: string;

  @ApiProperty({
    example: 160.0,
    description: 'Amount in US dollars',
  })
  @Column({
    type: DataType.FLOAT,
  })
  amount: number;

  @Default(DonationStatus.VALID)
  @ApiProperty({
    example: DonationStatus.VALID,
    description: `project status may be: ${Object.values(DonationStatus)}`,
  })
  @Column({
    type: DataType.ENUM,
    values: Object.values(DonationStatus),
  })
  status: DonationStatus;

  @ApiProperty({
    example: 1,
    description: 'file id with that file is related',
  })
  @ForeignKey(() => Campaign)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  campaignId: string;

  @ApiProperty({
    type: () => Campaign,
    description: 'campaign for that donat',
  })
  @BelongsTo(() => Campaign, 'campaignId')
  campaign: Campaign;
}
