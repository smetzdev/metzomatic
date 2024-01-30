interface GetBase64Options {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export class GmailMessageEncoder {
  /**
   * Encodes a Gmail message into base64url format.
   * @param options - The options for the Gmail message.
   * @returns The base64url encoded message.
   */
  public static getBase64Mail(options: GetBase64Options) {
    const { from, to, subject, text } = options;

    const emailLines = [
      `From: ${from}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      '',
      text,
    ];
    const email = emailLines.join('\r\n').trim();
    const encodedMessage = Buffer.from(email)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    return encodedMessage;
  }
}
