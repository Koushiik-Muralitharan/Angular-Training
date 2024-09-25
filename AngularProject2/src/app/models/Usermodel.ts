import { transactionDetails } from "./Transactionmodel";
import { goalDetails } from "./goalsmodal";

export interface userdetails{
    id:string;
    name:string;
    email:string;
    pno:string;
    password:string;
    transactions: transactionDetails[];
    goals: goalDetails[]
    
  }