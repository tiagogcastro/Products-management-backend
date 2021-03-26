import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import User from './User';
import Product from './Product';

@Entity('FKproduct_user')
export default class UserProduct {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  product_id: string;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

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
