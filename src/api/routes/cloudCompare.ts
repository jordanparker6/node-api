import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { LoggerType } from '../../loaders/logger';
import CloudCompareService from '../../services/cloudCompare';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { IWorkLoad, ISKU, ICosts } from '../../interfaces';

const route = Router();


export default (app: Router) => {
  app.use('/cloudCompare', route);


  // API REQUEST - GET INSTANCE NAMES
  route.post(
    '/getInstanceNames',
    celebrate({
      body: Joi.object({
        meterCat: Joi.string().required(),
        os: Joi.string().required(),
        licenceModelAWS: Joi.string().required(),
        licenceModelAzure: Joi.string().required(),
        serverTenancy: Joi.string().required(),
        resType: Joi.string().required(),
        family: Joi.string().required(),
        vCPU: Joi.string().required(),
        vRAM: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get<LoggerType>('logger');
      logger.debug('Calling getInstanceNames endpoint with body: %o', req.body)
      try {
        const cloudCompareServiceInstance = Container.get(CloudCompareService);
        const result = await cloudCompareServiceInstance.getInstanceNames(req.body as IWorkLoad);
        return res.status(201).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // API REQUEST - GET SKUs
  route.post(
    '/getSKU',
    celebrate({
      body: Joi.object({
        meterCat: Joi.string().required(),
        os: Joi.string().required().required(),
        licenceModelAWS: Joi.string().required(),
        licenceModelAzure: Joi.string().required(),
        serverTenancy: Joi.string().required(),
        resType: Joi.string().required(),
        AWSInstanceName: Joi.string().required(),
        AzureInstanceName: Joi.string().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get<LoggerType>('logger');
      logger.debug('Calling getSKU endpoint with body: %o', req.body)
      try {
        const cloudCompareServiceInstance = Container.get(CloudCompareService);
        const result = await cloudCompareServiceInstance.getSKU(req.body as ISKU);
        return res.status(201).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // API REQUEST - GET COSTS
  route.post(
    '/getCosts',
    celebrate({
      body: Joi.object({
        AWSSKU: Joi.string().required(),
        AzureSKU: Joi.string().required().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get<LoggerType>('logger');
      logger.debug('Calling getCosts endpoint with body: %o', req.body)
      try {
        const cloudCompareServiceInstance = Container.get(CloudCompareService);
        const result = await cloudCompareServiceInstance.getCosts(req.body as ICosts);
        return res.status(201).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // API REQUEST - TEST
  route.post(
    '/test',
    // middlewares.decodeFirebaseIdToken,
    // middlewares.isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get<LoggerType>('logger');
      logger.debug('Calling test endpoint with body: %o', req.body)
      try {
        const cloudCompareServiceInstance = Container.get(CloudCompareService);
        const result = await cloudCompareServiceInstance.test();
        return res.status(201).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

};