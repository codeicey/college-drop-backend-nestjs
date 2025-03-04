import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMessageDto) {
    return this.prisma.message.create({ data });
  }

  async findOne(id: string) {
    return this.prisma.message.findUnique({ where: { id } });
  }

  async findByUser(userId: string) {
    return this.prisma.message.findMany({
      where: { OR: [{ senderId: userId }, { receiverId: userId }] },
    });
  }

  async remove(id: string) {
    return this.prisma.message.delete({ where: { id } });
  }
}