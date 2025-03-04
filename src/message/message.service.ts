import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  create(createMessageDto: CreateMessageDto) {
    return this.messageRepository.create(createMessageDto);
  }

  findOne(id: string) {
    return this.messageRepository.findOne(id);
  }

  findByUser(userId: string) {
    return this.messageRepository.findByUser(userId);
  }

  remove(id: string) {
    return this.messageRepository.remove(id);
  }
}