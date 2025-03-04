import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  create(dto: CreatePaymentDto) {
    return this.paymentRepository.create({ ...dto, status: 'PENDING' });
  }

  findAll() {
    return this.paymentRepository.findAll();
  }

  async findOne(id: string) {
    const payment = await this.paymentRepository.findOne(id);
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async update(id: string, dto: UpdatePaymentDto) {
    await this.findOne(id); // Ensure it exists
    return this.paymentRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id); // Ensure it exists
    return this.paymentRepository.remove(id);
  }
}