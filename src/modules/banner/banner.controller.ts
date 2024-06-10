// imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ServiceOfBanner } from './banner.service';
import { DeleteBannerDto } from 'src/validations/banner/banner';

// use controller
@Controller('/')

// export banner controller class
export class BannerOfController {
  constructor(private readonly controllerOfService: ServiceOfBanner) {}

  @Get('/api/get-banners')
  getBanners() {
    return this.controllerOfService.getBanners();
  }

  @Delete('/admin/api/delete-banner')
  deleteBanner(@Query() query: DeleteBannerDto) {
    return this.controllerOfService.deleteBanner(query);
  }
}
