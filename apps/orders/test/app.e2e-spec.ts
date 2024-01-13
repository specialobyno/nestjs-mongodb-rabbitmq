import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { spec, request } from 'pactum';
import { OrdersModule } from './../src/orders.module';
import { initializeMiddlewares } from '@app/common';

describe('OrdersController (e2e)', () => {
  let app: INestApplication;
  const req = spec();
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OrdersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    initializeMiddlewares(app);

    await app.init();
    await app.listen(3000);
    request.setBaseUrl('http://localhost:3000/api');
  });
  afterAll(async () => {
    await app.close();
  });
  it('/ (GET)', () => {
    return req.get('/').expectStatus(200).expectBody('Hello World!');
  });
});
