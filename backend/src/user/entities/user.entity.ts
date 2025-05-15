/* eslint-disable prettier/prettier */
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'User id' })
  id: string;

  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => String, { description: 'User email' })
  email: string;

  @Field(() => String, { description: 'User password' })
  password: string;

  @Field(() => Date)
  createdAt: string;

  @Field(() => Date)
  updatedAt: string;
}
