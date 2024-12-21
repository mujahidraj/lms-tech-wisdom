import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { createDto, editDto } from './dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transaction:TransactionService) {}
        
          @Post('insert')
          create(@Body()dto:createDto ) {
            return this.transaction.createTransaction(dto);
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
          update(@Param('id') id: string, @Body() dto:editDto) {
            return this.transaction.editTransaction(+id, dto);
          }
        
        
          @Delete(':id')
          remove(@Param('id') id: string) {
            return this.transaction.deleteTransaction(+id);
          }
}
