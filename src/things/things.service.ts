import { Injectable } from '@nestjs/common';
import { CreateTodo } from './interfaces/create-todo';
import { GmailService } from '../google-cloud/gmail/gmail.service';
import { ConfigService } from '@nestjs/config';

/**
 * Service for creating todos in CultureCode Things.
 */
@Injectable()
export class ThingsService {
  /** The "AddToThings" Email-Address*/
  private readonly MAIL_TO = this.configService.get<string>('THINGS_EMAIL');

  constructor(
    private readonly gmailService: GmailService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Creates a new todo.
   * @param createTodoDto - The data for creating a todo.
   * @returns A promise that resolves to the result of sending the email.
   */
  async createTodo(createTodoDto: CreateTodo) {
    const { title, notes } = createTodoDto;

    const messageDto = {
      to: this.MAIL_TO,
      subject: title,
      text: notes,
    };

    return this.gmailService.sendMail(messageDto);
  }
}
