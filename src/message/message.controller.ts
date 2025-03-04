import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '@prisma/client';
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
@Controller('messages')
  export class MessageController {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    const message = await this.messageService.create(createMessageDto);
    // this.server.emit('newMessage', message);
    return message;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return this.messageService.findByUser(userId);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
//   @Roles(Role.USER) 
  async remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}