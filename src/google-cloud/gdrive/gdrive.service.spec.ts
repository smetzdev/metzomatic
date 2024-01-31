import { Test, TestingModule } from '@nestjs/testing';
import { GdriveService } from './gdrive.service';
import { AuthService } from '../auth/auth.service';
import { Readable } from 'stream';

describe('GdriveService', () => {
  let service: GdriveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GdriveService,
        {
          provide: AuthService,
          useValue: {
            oauth2Client: {},
          },
        },
      ],
    }).compile();

    service = module.get<GdriveService>(GdriveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload a PDF file to Google Drive with the correct arguments', async () => {
    const pdfBuffer = Buffer.from('test');
    const folderId = 'folderId';
    const fileName = 'fileName';
    const expectedParams = {
      requestBody: {
        name: `${fileName}.pdf`,
        parents: [folderId],
      },
      media: {
        mimeType: 'application/pdf',
        body: expect.any(Readable),
      },
      fields: 'id, name',
    };

    const mockGoogleUploadFunction = jest
      .fn()
      .mockResolvedValue({ data: 'test as pdf' });
    service['drive'].files.create = mockGoogleUploadFunction;

    await service.uploadPdf(pdfBuffer, folderId, fileName);

    expect(mockGoogleUploadFunction).toHaveBeenCalledWith(expectedParams);
  });
});
