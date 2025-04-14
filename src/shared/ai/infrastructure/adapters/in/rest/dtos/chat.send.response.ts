export class ChatSendResponse {
  response: string;
  constructor(partial?: Partial<ChatSendResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
