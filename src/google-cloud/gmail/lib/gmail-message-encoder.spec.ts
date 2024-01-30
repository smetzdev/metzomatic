import { GmailMessageEncoder } from './gmail-message-encoder';

describe('GmailMessageEncoder', () => {
  it('should be defined', () => {
    expect(new GmailMessageEncoder()).toBeDefined();
  });

  it('should encode a message correctly in base64', () => {
    const options = {
      from: 'test@test.de',
      to: 'test@test.de',
      subject: 'Test Subject',
      text: 'Test Message',
    };
    const expectedRawString =
      'RnJvbTogdGVzdEB0ZXN0LmRlDQpUbzogdGVzdEB0ZXN0LmRlDQpTdWJqZWN0OiBUZXN0IFN1YmplY3QNCg0KVGVzdCBNZXNzYWdl';

    const result = GmailMessageEncoder.getBase64Mail(options);

    expect(result).toEqual(expectedRawString);
  });
});
