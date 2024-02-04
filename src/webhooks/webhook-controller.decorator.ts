// custom-controller.decorator.ts
import { Controller } from '@nestjs/common';

/**
 * Default NestJS Controller decorator but with
 * a /webhooks prefixed before the path argument.
 *
 * @see https://docs.nestjs.com/controllers#controllers
 */
export function WebhookController(path: string): ClassDecorator {
  const prefix = 'webhooks'; // Define your prefix here
  return Controller(`${prefix}/${path}`);
}
