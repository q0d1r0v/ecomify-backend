// imports
import {
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ServiceOfFile } from './file.service';
import { CreateFileDto } from '../../validations/file/file';
import { ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { File } from 'buffer';

// use controller
@Controller('/')

// export controller class
export class FileController {
  constructor(private readonly fileService: ServiceOfFile) {}

  @Post('/admin/api/upload-file')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', null, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads');
        },
        filename: (req, file, cb) => {
          const unique_name =
            Date.now() + '-' + Math.round(Math.random() * 1e9);

          cb(null, unique_name + '-' + file.originalname);
        },
      }),
    }),
  )
  @ApiQuery({ name: 'files', required: true, type: File })
  @ApiQuery({ name: 'category_id', required: false, type: Number })
  @ApiQuery({ name: 'product_id', required: false, type: Number })
  createFile(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }),
    )
    files: Array<Express.Multer.File>,
    @Body() body: CreateFileDto,
  ) {
    return this.fileService.createFile(files, body);
  }
}
