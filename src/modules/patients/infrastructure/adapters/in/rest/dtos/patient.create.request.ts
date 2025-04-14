import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Firstname of the patient',
    example: 'John',
    minLength: 2,
    maxLength: 32,
  })
  @IsString({ message: 'Firstname must be a string' })
  @IsNotEmpty({ message: 'Firstname is required' })
  @Length(2, 32, { message: 'Firstname must be between 2 and 32 characters' })
  readonly firstname: string;
  @ApiProperty({
    description: 'Lastname of the patient',
    example: 'Doe',
    minLength: 2,
    maxLength: 32,
  })
  @IsString({ message: 'Lastname must be a string' })
  @IsNotEmpty({ message: 'Lastname is required' })
  @Length(2, 32, { message: 'Lastname must be between 2 and 32 characters' })
  readonly lastname: string;
  @ApiProperty({
    description: 'Email address of the patient',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  readonly email: string;
  @ApiProperty({
    description:
      'Birthday of the patient (must be a date later than the minimum date)',
    example: '2000-01-01',
    format: 'date',
  })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsNotEmpty({ message: 'Birthday is required' })
  @MinDate(PATIENT_MIN_BIRTHDAY_DATE, {
    message: `Birthday must be later than ${PATIENT_MIN_BIRTHDAY_DATE}`,
  })
  readonly birthday: Date;
}
