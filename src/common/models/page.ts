export class Page {
  number: number;
  size: number;
  constructor(partial?: Partial<Page>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
