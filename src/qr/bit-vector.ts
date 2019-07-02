export class BitVector {

  private static readonly BPU: number = 32;

  private _store: number[] = [];
  public get store(): number[] {
    return this._store.slice();
  }

  private _length: number = 0;
  public get length(): number {
    return this._length;
  }
  public set length(length: number) {
    const storeUnits: number = Math.ceil((length) / BitVector.BPU)
    if (length < this.length) {
      while (this._store.length > storeUnits) {
        this._store.pop();
      }
      const toClean = BitVector.BPU - (length % BitVector.BPU);
      if (toClean) {
        this._store[this._store.length - 1] = this._store[this._store.length - 1] >>> toClean << toClean;
      }
    } else {
      while (this._store.length < storeUnits) {
        this._store.push(0);
      }
    }
    this._length = length;
  }

  private get lastIndex(): number {
    return this.length - 1;
  }

  constructor(origin?: BitVector | any[]) {
    if (origin instanceof BitVector) {
      this._store = origin.store;
      this._length = origin.length;
    } else if (origin instanceof Array) {
      for (const item of origin) {
        this.push(!!item);
      }
    }
    return new Proxy(this, {
      get(target: BitVector, p: string | number | symbol) {
        if (typeof p !== 'symbol' && Number.isInteger(+p) && p >= 0) {
          p = +p;
          if (p > target.lastIndex) {
            return undefined;
          }
          const storeUnit: number = Math.floor((p) / BitVector.BPU);
          const position: number = BitVector.BPU - 1 - (p % BitVector.BPU);
          return !!((target._store[storeUnit] >> position) & 1);
        } else {
          return target[p];
        }
      },
      set(target: BitVector, p: string | number | symbol, value: any, receiver: any) {
        if (typeof p !== 'symbol' && Number.isInteger(+p) && +p >= 0) {
          p = +p;
          if (p > target.lastIndex) {
            target.length = p + 1;
          }
          const storeUnit: number = Math.floor((p) / BitVector.BPU);
          const position: number = BitVector.BPU - 1 - (p % BitVector.BPU);
          if (value) {
            target._store[storeUnit] |= (1 << position);
          } else {
            target._store[storeUnit] &= ~(1 << position);
          }
        } else {
          target[p] = value;
        }
        return true;
      }
    });
  }

  [Symbol.toPrimitive](hint: string) {
    if (hint === 'number') {
      let exponent: number = this.length;
      let value: number = 0;
      for (const b of this) {
        exponent--;
        value += b ? (2 ** exponent) : 0;
      }
      return value;
    } else {
      let bits: string = '';
      for (const b of this) {
        bits += b ? '1' : '0';
      }
      return bits;
    }
  }

  *[Symbol.iterator](): IterableIterator<boolean> {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }

  public push(...values: boolean[]): number {
    for (const value of values) {
      this[this.length] = value;
    }
    return this.length;
  }

  public pop(): boolean {
    const value: boolean = this[this.lastIndex];
    this.length--;
    return value;
  }

  public unshift(...values: boolean[]): number {
    if (values && values.length) {
      for (let i = this.lastIndex; i >= 0; i--) {
        this[i + values.length] = this[i];
      }
      for (let i = 0; i < values.length; i++) {
        this[i] = values[i];
      }
    }
    return this.length;
  }

  public shift(): boolean {
    const value: boolean = this[0];
    for (let i = 0; i < this.length; i++) {
      this[i] = this[i + 1];
    }
    this.length--;
    return value;
  }

  public slice(start?: number, end?: number): BitVector {
    if (start < 0) {
      return new BitVector();
    }
    if (!start) {
      start = 0;
    }
    if (end === undefined || end > this.lastIndex) {
      end = this.lastIndex;
    }
    if (end < 0) {
      end = this.lastIndex + end;
    }
    start = Math.floor(start);
    end = Math.floor(end);
    if (start == 0 && end == this.lastIndex) {
      return new BitVector(this);
    }
    const slice: BitVector = new BitVector();
    for (let i = start; i <= end; i++) {
      slice.push(this[i]);
    }
    return slice;
  }

}
