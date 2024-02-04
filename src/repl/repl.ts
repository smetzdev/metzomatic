import { Logger } from '@nestjs/common';
import { repl } from '@nestjs/core';
import { AppModule } from '../app.module';
import { dummyPdfBuffer } from './mocks/dummyPdf';
import { dummyTodo } from './mocks/things';
import { dummyReviewRequest } from './mocks/github';

// TODO Mix Mocks with env.repl files
async function bootstrap() {
  const logger = new Logger('REPL');
  const replServer = await repl(AppModule);
  replServer.setupHistory('.nestjs_repl_history', (err) => {
    if (err) {
      logger.error(err);
    }
  });

  // Add dummy context to the REPL Context
  replServer.context.dummyFileBuffer = dummyPdfBuffer;
  replServer.context.dummyTodo = dummyTodo;
  replServer.context.dummyReviewRequest = dummyReviewRequest;
}
bootstrap();
