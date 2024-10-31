import { ObjectLiteral } from 'typeorm';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

export class UpdateResultDto implements UpdateResult {
  affected?: number;
  generatedMaps: ObjectLiteral[];
  raw: any;
}
