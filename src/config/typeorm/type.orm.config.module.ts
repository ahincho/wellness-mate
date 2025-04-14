import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from '@config/database/database.config.module';
import { TypeOrmConfigService } from './type.orm.config.service';
import typeormConfig from './type.orm.config';

@Module({
  imports: [DatabaseConfigModule, ConfigModule.forFeature(typeormConfig)],
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
