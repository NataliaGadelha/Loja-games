import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'db_gameverse',
      entities: [], //colocar os nomes das suas entities
      synchronize: true,
    }),
  ],
  //colocar os nomes das suas modules
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
