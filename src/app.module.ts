import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { CompanyCategoriesModule } from './company-categories/company-categories.module';
import { TypeOrmConfigService } from './config/type-orm-config.service';
import { ContactFacePositionsModule } from './contact-face-positions/contact-face-positions.module';
import { ContactFacesModule } from './contact-faces/contact-faces.module';
import { ManagersModule } from './managers/managers.module';

@Module({
  imports: [
    CompaniesModule,
    CompanyCategoriesModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
    }),
    ContactFacePositionsModule,
    ContactFacesModule,
    ManagersModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TypeOrmConfigService],
})
export class AppModule {}
