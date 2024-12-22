import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { createDto, editDto } from './dto';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('transaction')
@UseGuards(AuthGuard('jwt')) // Ensure only authenticated users can access

export class TransactionController {
    constructor(private readonly transaction:TransactionService) {}
        
          @Post('insert')
          create(@Body()dto:createDto, @Req() req: Request) {
            const userId = req.user['id'];
            return this.transaction.createTransaction(dto,userId);
          }
        
          @Get('all-transaction')
          findAll() {
            return this.transaction.getTransacion();
          }
        
          @Get(':id')
          findOne(@Param('id') id: string) {
            return this.transaction.getTransactionById(+id);
          }
        
          @Patch(':id')
          update(@Param('id') id: string, @Body() dto:editDto,@Req() req: Request) {
            const student_id = req.user['id'];
            return this.transaction.editTransaction(+id, dto,student_id);
          }
        
        
          @Delete(':id')
          remove(@Param('id') id: string) {
            return this.transaction.deleteTransaction(+id);
          }
}
