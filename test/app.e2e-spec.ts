import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { GithubService } from '../src/webhooks/github/github.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: GithubService,
          useValue: {
            handleReviewRequest: jest
              .fn()
              .mockResolvedValue('Review request handled succesfully!'),
          },
        },
      ],
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

  describe('webhooks', () => {
    it('/webhooks/github/review-request (POST) should work', () => {
      return request(app.getHttpServer())
        .post('/webhooks/github/review-request')
        .send({
          pull_request: {
            title: 'Dummy PR',
            html_url: 'https://semtz.dev',
            user: {
              login: 'smetzdev',
            },
          },
        })
        .expect(201)
        .expect('Review request handled succesfully!');
    });
  });
});
