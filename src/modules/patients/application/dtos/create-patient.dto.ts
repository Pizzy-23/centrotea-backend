import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsObject,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PatientStatus } from '../../domain/entities/patient.entity';
import { SWAGGER_DOCS } from '../../../../shared/domain/constants/swagger';

export class CreatePatientDto {
  @ApiProperty({
    description: 'Patient full name',
    example: SWAGGER_DOCS.EXAMPLES.PATIENT.NAME,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Patient Academic Registry (RA)',
    example: SWAGGER_DOCS.EXAMPLES.PATIENT.RA,
  })
  @IsNotEmpty()
  ra: string | number;

  @ApiProperty({
    description: 'Patient age',
    example: SWAGGER_DOCS.EXAMPLES.PATIENT.AGE,
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    description: 'Patient birth date',
    example: SWAGGER_DOCS.EXAMPLES.PATIENT.BIRTH_DATE,
  })
  @IsDateString()
  birthDate: string;

  @ApiPropertyOptional({
    description: 'Patient status in the system',
    enum: PatientStatus,
    example: PatientStatus.ACTIVE,
  })
  @IsEnum(PatientStatus)
  @IsOptional()
  status?: PatientStatus;

  @ApiProperty({
    description: 'Patient care protocol',
    example: SWAGGER_DOCS.EXAMPLES.PATIENT.PROTOCOL,
  })
  @IsString()
  @IsNotEmpty()
  protocol: string;

  @ApiPropertyOptional({
    description: 'Additional patient metadata (encrypted)',
    example: SWAGGER_DOCS.EXAMPLES.PATIENT.METADATA,
  })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
