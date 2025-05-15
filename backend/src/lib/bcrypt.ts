/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

export class BcryptInstances {
  async hash(input: string): Promise<string> {
    return await bcrypt.hash(input, 12);
  }
  async compare(stringInput: string, hashedInput: string): Promise<boolean> {
    return await bcrypt.compare(stringInput, hashedInput);
  }
}

export const Bcrypt = new BcryptInstances();
