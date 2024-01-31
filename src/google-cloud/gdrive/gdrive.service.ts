import { Injectable } from '@nestjs/common';
import { google, drive_v3 } from 'googleapis';
import { AuthService } from '../auth/auth.service';
import { Readable } from 'stream';

/**
 * Service for interacting with Google Drive API.
 */
@Injectable()
export class GdriveService {
  private readonly drive: drive_v3.Drive;

  constructor(private authService: AuthService) {
    this.drive = google.drive({
      version: 'v3',
      auth: this.authService.oauth2Client,
    });
  }

  /**
   * Uploads a PDF file to Google Drive.
   * @param pdfBuffer The PDF file as a buffer (Files in this application are buffers).
   * @param folderId The ID of the folder where the PDF should be uploaded.
   * @param fileName The filename (without extension) for the uploaded file.
   * @returns The uploaded file's metadata.
   */
  async uploadPdf(pdfBuffer: Buffer, folderId: string, fileName: string) {
    const fileMetadata = {
      name: `${fileName}.pdf`,
      parents: [folderId],
    };

    // Google Drive API expects media as a readable stream
    const media = {
      mimeType: 'application/pdf',
      body: Readable.from(pdfBuffer),
    };

    const response = await this.drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name',
    });

    return response.data;
  }
}
