import { Request, Response } from 'express';
import { newAccount } from '../Services/PlaidService';

export function addPlaidAccount(request: Request, response: Response) {
    newAccount(request as any, response);
}