// imports
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ModuleOfCategory } from './modules/categories/categories.module';
import { AuthModule } from './modules/auth/auth.module';

// modules
import { AuthMiddleware } from './modules/middleware/auth';

// use modules
@Module({
  imports: [ModuleOfCategory, AuthModule],
})

// export App Module and use middleware
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api');
  }
}
