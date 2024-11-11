import { randomUUID } from "node:crypto";

export class Org {
  public id!: string;
  public name!: string;
  public address!: string;
  public neighborhood!: string;
  public city!: string;
  public whatsapp!: string;
  public password_hash!: string;
  public salt!: string;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
