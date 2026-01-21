import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum, IsObject, IsDateString } from 'class-validator';
import { PatientStatus } from '../../domain/entities/patient.entity';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  ra: string | number;

  @IsNumber()
  age: number;

  @IsDateString()
  birthDate: string;

  @IsEnum(PatientStatus)
  @IsOptional()
  status?: PatientStatus;

  @IsString()
  @IsNotEmpty()
  protocol: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
