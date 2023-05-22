import {
  Directive,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Product } from '../interfaces/item.interface';

export enum Availability {
  WORN_OUT,
  IN_STOCK,
  SOLD,
}

registerEnumType(Availability, {
  name: 'Availability',
});

@ObjectType({
  implements: () => [Product],
})
export class ItemEntity implements Product {
  @Field(() => ID)
  _id: string;

  @Field()
  @Directive('@upper')
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field((type) => Availability)
  availability: Availability;
}
