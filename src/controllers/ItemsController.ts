import knex from '../database/connections';
import { Request, Response } from 'express';
import environment from '../config/environment';

class ItemsController {
  async create(request: Request, response: Response) {
    const items = await knex('items');

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `${environment.api_url}/uploads/${item.image}`
      }
    })

    return response.json(serializedItems);
  }
};
export default ItemsController;