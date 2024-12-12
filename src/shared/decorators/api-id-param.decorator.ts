import { ApiParam } from '@nestjs/swagger';

export const ApiIdParam = () =>
  ApiParam({
    name: 'id',
    description: 'Идентификатор',
    type: Number,
  });
