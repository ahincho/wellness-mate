export class HistoryResponse {
  id: number;
  description: string;
  createdAt: Date;
  constructor(partial?: Partial<HistoryResponse>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
