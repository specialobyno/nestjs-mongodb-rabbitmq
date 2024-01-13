import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IncomingMessage, ServerResponse } from 'http';
import passport from 'passport';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import { Server } from 'http';

export function initializeMiddlewares(
  app:
    | NestExpressApplication<
        Server<typeof IncomingMessage, typeof ServerResponse>
      >
    | INestApplication,
) {
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
}
