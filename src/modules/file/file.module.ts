// imports
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { ServiceOfFile } from './file.service';

// use module
@Module({
  controllers: [FileController],
  providers: [ServiceOfFile],
})

// export file module class
export class FileModule {}
