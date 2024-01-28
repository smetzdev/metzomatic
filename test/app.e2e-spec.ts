import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { GmailService } from './../src/gmail/gmail.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let gmailService: GmailService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(GmailService)
      .useValue({
        sendMail: jest.fn(),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    gmailService = moduleFixture.get<GmailService>(GmailService);
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

  describe('gmail', () => {
    it('/send (POST) should work with correct body', async () => {
      const requestBody = {
        to: 'test@test.com',
        subject: 'Test Subject',
        text: 'Test Body',
      };
      const expectedResponseText = 'Email sent successfully';

      const response = await request(app.getHttpServer())
        .post('/gmail/send')
        .send(requestBody)
        .expect(201);

      expect(gmailService.sendMail).toHaveBeenCalledWith(requestBody);

      expect(response.text).toEqual(expectedResponseText);
    });

    it('/send (POST) should not work with malformed body', async () => {
      // With a wrong email
      const requestBody = {
        to: 'wrongemail.com',
        subject: 'Test Subject',
        text: 'Test Body',
      };
      const expectedBody = {
        message: ['to must be an email'],
        error: 'Bad Request',
        statusCode: 400,
      };

      const response = await request(app.getHttpServer())
        .post('/gmail/send')
        .send(requestBody)
        .expect(400);

      expect(response.body).toEqual(expectedBody);
    });
  });
});
