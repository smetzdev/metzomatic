import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('toggl', () => {
    it('/reports/current-month/:clientId (GET) should work', () => {
      return request(app.getHttpServer())
        .get('/toggl/reports/current-month/12345')
        .expect(200);
    });

    it('/reports/last-month/:clientId (GET) should work', () => {
      return request(app.getHttpServer())
        .get('/toggl/reports/last-month/12345')
        .expect(200);
    });
  });
});
