import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('products')
export default class Product {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  user_id?: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
