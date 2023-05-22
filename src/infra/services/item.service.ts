import { NotFoundException } from '@nestjs/common';
import { Availability, ItemEntity } from '@src/core/entity/item.entity';
import { CreateItemInput } from '@src/core/validators/create-item.validator';
import { UpdateItemInput } from '@src/core/validators/update-item.validator';
import { v4 } from 'uuid';

export class ItemService {
  private items: ItemEntity[] = [];
  async createItem(input: CreateItemInput): Promise<ItemEntity> {
    const id = v4();
    this.items.push({
      ...input,
      _id: id,
      createdAt: new Date(),
      updatedAt: new Date(),
      availability: Availability.IN_STOCK,
    });
    return this.items.find((item) => item._id === id);
  }

  async listItems(): Promise<ItemEntity[]> {
    return this.items;
  }

  async itemGetById(id: string): Promise<ItemEntity> {
    const item = this.items.find((item) => item._id === id);
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  async updateItem(input: UpdateItemInput): Promise<ItemEntity> {
    const itemIndex = this.items.findIndex((item) => item._id === input._id);
    if (itemIndex === -1) {
      throw new NotFoundException('I not found');
    }

    const updateItem: ItemEntity = {
      _id: input._id,
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
      availability: Availability.IN_STOCK,
    };

    const datas: ItemEntity[] = this.items.map((item) => {
      if (item._id === input._id) {
        item.name = input.name;
        item.description = input.description;
        item.price = input.price;
        item.updatedAt = new Date();
      }
      return item;
    });
    this.items = datas;
    return updateItem;
  }

  async deleteItem(id: string): Promise<string> {
    const itemIndex = this.items.findIndex((item) => item._id === id);
    if (itemIndex === -1) {
      throw new NotFoundException('Item not found');
    }
    const datas: ItemEntity[] = this.items.filter((item) => item._id != id);
    this.items = datas;
    return 'item deleted';
  }
}
