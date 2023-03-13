import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Donation } from '../donation/donation.model';
import { CampaignStatus } from './enums/campaign-status';

interface CampaignCreationAttributes {
  name: string;
  description: string;
  goalAmount: number;
}

@Table({
  tableName: 'campaign',
})
export class Campaign extends Model<Campaign, CampaignCreationAttributes> {
  @Default(DataType.UUIDV4)
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({
    example: 'some name',
    description: 'name of campaign',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'this is shit project',
    description: 'description of project ( 16 <= length)',
  })
  @Column({
    type: DataType.TEXT('long'),
  })
  description: string;

  @ApiProperty({
    example: 160.0,
    description:
      'The goal amount in USD how much money the campaign should collect to be successful',
  })
  @Column({
    type: DataType.FLOAT,
  })
  goalAmount: number;

  @Default(CampaignStatus.ACTIVE)
  @ApiProperty({
    example: CampaignStatus.ACTIVE,
    description: `project status may be: ${Object.values(CampaignStatus)}`,
  })
  @Column({
    type: DataType.ENUM,
    values: Object.values(CampaignStatus),
  })
  status: CampaignStatus;

  @ApiProperty({
    type: [Donation],
    description: 'work histories related with that project',
  })
  @HasMany(() => Donation, 'campaignId')
  donations: Array<Donation>;
}
