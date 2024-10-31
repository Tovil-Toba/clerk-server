import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

export class DeleteResultDto implements DeleteResult {
  affected?: number | null;
  raw: any;
}
