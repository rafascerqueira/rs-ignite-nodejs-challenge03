import { randomUUID } from "node:crypto";

export class Pet {
  public id!: string;
  public name!: string;
  public age!: string;
  public size!: string;
  public weight!: string;
  public species!: string;
  public description!: string;
  public org_id!: string;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
