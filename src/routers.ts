import express, { Request, Response } from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';
import environment from './config/environment';

const routes = express.Router();
const pointsController = new PointsController();
const itemController = new ItemsController();
const upload = multer(multerConfig);

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: "Hello world" })
});

routes.get('/items', itemController.create);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);


routes.post(
  '/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required()
    })
  },
    {
      abortEarly: false
    }),
  pointsController.create);


routes.get('/test', (req, res) => {
  res.json({ url: `${environment.api_url}/uploads/baterias.svg` })
})

export default routes;