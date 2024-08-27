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
import { OrderModule } from './modules/orders/orders.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

// use modules
@Module({
  imports: [
    ModuleOfCategory,
    AuthModule,
    UserModule,
    FileModule,
    ProductModule,
    BannerModule,
    OrderModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../uploads'),
      serveRoot: '/uploads',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 1,
        limit: 60,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})

// export App Module and use middleware
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('admin');
  }
}
