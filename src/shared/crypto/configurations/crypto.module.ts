import { Module } from '@nestjs/common';
import { BCRYPT_PASSWORD_ENCODER } from '@common/constants/crypto.constants';
import { BcryptPasswordEncoder } from '../implementations/bcrypt.password.encoder';

@Module({
  imports: [],
  providers: [
    {
      provide: BCRYPT_PASSWORD_ENCODER,
      useClass: BcryptPasswordEncoder,
    },
  ],
  controllers: [],
  exports: [
    {
      provide: BCRYPT_PASSWORD_ENCODER,
      useClass: BcryptPasswordEncoder,
    },
  ],
})
export class CryptoModule {}
