export class Optional<T> {
  private value: T | null;
  constructor(value: T | null) {
    this.value = value;
  }
  static of<U>(value: U): Optional<U> {
    return new Optional<U>(value);
  }
  static empty<U>(): Optional<U> {
    return new Optional<U>(null);
  }
  isPresent(): boolean {
    return this.value !== null && this.value !== undefined;
  }
  isEmpty(): boolean {
    return !this.isPresent();
  }
  get(): T {
    if (!this.isPresent()) {
      throw new Error('No value present');
    }
    return this.value as T;
  }
  orElse(defaultValue: T): T {
    return this.isPresent() ? (this.value as T) : defaultValue;
  }
  ifAbsent(action: () => void): void {
    if (this.isEmpty()) {
      action();
    }
  }
}
