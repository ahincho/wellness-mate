import { PATIENT_MIN_BIRTHDAY_DATE } from '@common/constants/patients.constants';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  Length,
  IsNotEmpty,
  MinDate,
} from 'class-validator';

export class PatientCreateRequest {
  @IsString()
  @IsNotEmpty()
  @Length(2, 32)
  readonly firstname: string;
  @IsString()
  @IsNotEmpty()
  @Length(2, 32)
  readonly lastname: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsNotEmpty()
  @MinDate(PATIENT_MIN_BIRTHDAY_DATE)
  readonly birthday: Date;
}
