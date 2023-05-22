import { Module } from '@nestjs/common';
import { ItemResolver } from '@src/core/resolvers/items.resolvers';
import { ItemService } from '@src/infra/services/item.service';
import { PubSub } from 'graphql-subscriptions';

@Module({
  providers: [ItemService, ItemResolver, PubSub],
})
export class ItemModule {}
