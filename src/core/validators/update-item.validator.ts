import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType({
  isAbstract: true,
})
export class UpdateItemInput {
  @Field(() => ID)
  _id: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsNumber()
  price: number;
}
