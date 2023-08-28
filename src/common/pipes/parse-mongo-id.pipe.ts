import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, metadata: ArgumentMetadata) {
    if (!isValidObjectId(value)) {
      if (!isNaN(+value))
        throw new BadRequestException(`${value} is not a valid MongoId`);

      throw new BadRequestException(`'${value}' is not a valid MongoId`);
    }

    return value;
  }
}
