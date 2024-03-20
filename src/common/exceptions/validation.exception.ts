import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  message: string;

  constructor(responce) {
    super(responce, HttpStatus.BAD_REQUEST);
    this.message = responce;
  }
}
