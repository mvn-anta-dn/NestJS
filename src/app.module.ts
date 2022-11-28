import { GraphQlModule } from './providers/graphQl/provide.module';
import { loggingInterceptor } from './common/interceptors/logging.interceptor';
import { httpErrorFilter } from './common/exceptions/http-error.filter';
import { AuthModule } from './auth/auth.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { IdeasModule } from './models/ideas/ideas.module';
import { CommentsModule } from './models/comments/comments.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { PostgresModule } from './providers/postgres/provider.module';
import LogsMiddleware from './common/middlewares/logs.middleware';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    GraphQlModule,
    UsersModule,
    AuthModule,
    CommentsModule,
    IdeasModule,
    PostgresModule,
    // ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: httpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: loggingInterceptor,
    },
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LogsMiddleware).forRoutes('*');
  // }
}
