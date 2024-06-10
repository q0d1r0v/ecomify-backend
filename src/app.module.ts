// imports
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ModuleOfCategory } from './modules/categories/categories.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// modules
import { AuthMiddleware } from './modules/middleware/auth';
import { UserModule } from './modules/user/user.module';
import { FileModule } from './modules/file/file.module';
import { ProductModule } from './modules/products/product.module';
import { BannerModule } from './modules/banner/banner.module';

// use modules
@Module({
  imports: [
    ModuleOfCategory,
    AuthModule,
    UserModule,
    FileModule,
    ProductModule,
    BannerModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../'),
      renderPath: '/uploads',
    }),
  ],
})

// export App Module and use middleware
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('admin');
  }
}
