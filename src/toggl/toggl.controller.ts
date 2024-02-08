import { Controller, Get, Header, Param, ParseIntPipe } from '@nestjs/common';
import { TogglService } from './toggl.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('toggl')
@ApiTags('Toggl')
export class TogglController {
  constructor(private readonly togglService: TogglService) {}

  @Get('reports/last-month/:clientId')
  @Header('Content-Type', 'application/pdf')
  getLastMonthReport(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.togglService.getLastMonthReport(clientId);
  }

  @Get('reports/current-month/:clientId')
  @Header('Content-Type', 'application/pdf')
  getCurrentMonthReport(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.togglService.getCurrentMonthReport(clientId);
  }
}
