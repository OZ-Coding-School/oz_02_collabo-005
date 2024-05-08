import { apiRoutes } from 'src/api/apiRoutes';
import { client } from 'src/api/axios';
import { Restaurant } from './type';

export const getRestaurantList = () => {
  return client.get<Restaurant>(`${apiRoutes.restaurantList}`);
};
