import { ApiProperty } from '@nestjs/swagger';
import { PageRequest } from '@common/dtos/page.request';
import { ChatProvider } from '@shared/ai/domain/enums/chat.provider';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator';

const chatProviders = Object.values(ChatProvider).join(', ');

export class DiagnosisCreateRequest extends PageRequest {
  @ApiProperty({
    description: 'Id of the patient associated with the diagnosis',
    example: 101,
    minimum: 0,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  readonly patientId: number;
  @ApiProperty({
    description: `Chat provider used to generate the diagnosis. Allowed values: ${chatProviders}`,
    enum: ChatProvider,
    example: ChatProvider.OPEN_AI,
  })
  @IsEnum(ChatProvider, {
    message: `Chat provider must be one of the following: ${chatProviders}`,
  })
  @IsNotEmpty({ message: 'Chat provider is required' })
  readonly chatProvider: ChatProvider;
}
