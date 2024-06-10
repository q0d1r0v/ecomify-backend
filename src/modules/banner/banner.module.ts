// imports
import { Module } from '@nestjs/common';
import { BannerOfController } from './banner.controller';
import { ServiceOfBanner } from './banner.service';

// use module
@Module({
  controllers: [BannerOfController],
  providers: [ServiceOfBanner],
})

// export banner module class
export class BannerModule {}
