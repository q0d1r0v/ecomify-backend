// imports
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ModuleOfCategory } from './modules/categories/categories.module';

// modules
import { AuthMiddleware } from './modules/middleware/auth';

// use modules
@Module({
  imports: [ModuleOfCategory],
})

// export App Module and use middleware
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api');
  }
}
