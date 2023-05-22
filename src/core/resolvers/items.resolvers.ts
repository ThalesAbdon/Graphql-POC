import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { ItemService } from '@src/infra/services/item.service';
import { ItemEntity } from '../entity/item.entity';
import { CreateItemInput } from '../validators/create-item.validator';
import { UpdateItemInput } from '../validators/update-item.validator';
import { PubSub } from 'graphql-subscriptions';

@Resolver('Item')
export class ItemResolver {
  constructor(
    private readonly itemServices: ItemService,
    private readonly pubSub: PubSub,
  ) {}

  @Mutation(() => ItemEntity)
  async createItem(@Args('input') input: CreateItemInput): Promise<ItemEntity> {
    this.promotionItem(input.price);
    return this.itemServices.createItem(input);
  }

  @Query(() => [ItemEntity])
  async listItems(): Promise<ItemEntity[]> {
    return this.itemServices.listItems();
  }

  @Query(() => ItemEntity)
  async itemGetById(@Args('id') id: string): Promise<ItemEntity> {
    return this.itemServices.itemGetById(id);
  }

  @Mutation(() => String)
  async deleteItem(@Args('id') id: string): Promise<string> {
    return this.itemServices.deleteItem(id);
  }

  @Mutation(() => ItemEntity)
  async updateItem(@Args('input') input: UpdateItemInput): Promise<ItemEntity> {
    return this.itemServices.updateItem(input);
  }

  @Subscription((returns) => String)
  promotionItem(price: number) {
    if (price <= 5) {
      console.log('PRODUTO A PREÇO DE BANANA');
      this.pubSub.asyncIterator('Produto a preço de banana!');
    }
  }
}
