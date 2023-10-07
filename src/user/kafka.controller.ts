import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class KafkaController {
  @MessagePattern('curso-nestjs')
  consumeCurso(@Payload() message) {
    console.log(message);
  }
}
