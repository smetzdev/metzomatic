import { Controller, Get, Header, Param } from '@nestjs/common';
import { TogglService } from './toggl.service';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('toggl')
@ApiTags('Toggl')
export class TogglController {
  constructor(private readonly togglService: TogglService) {}

  @Get('reports/last-month/:clientId')
  @Header('Content-Type', 'application/pdf')
  @ApiOperation({ summary: 'Get last month report in PDF format' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the PDF report',
    content: {
      'application/pdf': {},
    },
  })
  getLastMonthReport(@Param('clientId') clientId: string) {
    return this.togglService.getLastMonthReport(+clientId);
  }

  @Get('reports/current-month/:clientId')
  @Header('Content-Type', 'application/pdf')
  @ApiOperation({ summary: 'Get current month report in PDF format' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the PDF report',
    content: {
      'application/pdf': {},
    },
  })
  getCurrentMonthReport(@Param('clientId') clientId: string) {
    return this.togglService.getCurrentMonthReport(+clientId);
  }
}
