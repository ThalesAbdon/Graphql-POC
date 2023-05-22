import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class Product {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;
}
