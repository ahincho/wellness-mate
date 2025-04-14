import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@config/app/app.config.module';
import { TypeOrmConfigService } from '@config/typeorm/type.orm.config.service';
import { TypeOrmConfigModule } from '@config/typeorm/type.orm.config.module';
import { AiModule } from '@shared/ai/infrastructure/configurations/ai.module';
import { PatientModule } from '@patients/infrastructure/configurations/patient.module';
import { DiagnosisModule } from '@diagnoses/infrastructure/configurations/diagnosis.module';
import { UserModule } from '@users/infrastructure/configurations/user.module';
import { AuthModule } from '@auth/configurations/auth.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      useExisting: TypeOrmConfigService,
      imports: [TypeOrmConfigModule],
    }),
    AiModule,
    PatientModule,
    DiagnosisModule,
    UserModule,
    AuthModule,
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class AppModule {}
