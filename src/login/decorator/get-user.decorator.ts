import {
    createParamDecorator, ExecutionContext,} from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const Getstudent = createParamDecorator(
    (
        data:string | undefined ,ctx : ExecutionContext)=>{
            const request : Express.Request =ctx.switchToHttp().getRequest();
            if(data) {
                return request.user[data]; 
            }
            return request.user;
        }
    
)