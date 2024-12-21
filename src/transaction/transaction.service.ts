import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { createDto, editDto } from './dto';

@Injectable()
export class TransactionService {
     constructor(private databaseService: DatabaseService) { }
        
        
            //.............create transaction.......................
        
        
            async createTransaction(dto: createDto) {
        
        
                const transaction = await this.databaseService.transaction.create({
                    data: {
                        student_id :dto.student_id,
                        course_id:dto.course_id,
                        amount : dto.amount,
                        status :dto.status
        
                    },
                });
        
                return 'Insertion success';
        
            }
        
        
        
        
            //..........................get transaction......................
        
            async getTransacion() {
                return this.databaseService.transaction.findMany();
              }
        
        
        
              //..........................Get transaction by id.....................................
            
        
              async getTransactionById(id: number) {
                return this.databaseService.transaction.findUnique({ where: { id } });
              }
        
        
        
              //....................update transaction by id.............................
        
              async editTransaction(userId : number ,dto: editDto) {
        
        
                const transaction = await this.databaseService.transaction.update({
                    where :{
                        id : userId, 
                    },
                    data: {
                        student_id :dto.student_id,
                        course_id:dto.course_id,
                        amount : dto.amount,
                        status :dto.status
        
                    },
                });
        
                return 'Data Update success';
        
            }
        
        
        
        
            //................................delete transaction by id..................................
        
            async deleteTransaction(id: number) {
                return this.databaseService.transaction.delete({
                 
                     where:
                      { 
                        id,
                        
                     } 
                     
                    });
                   
              }
}
