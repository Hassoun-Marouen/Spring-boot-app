export interface AccountDetails {
    accountId:            string;
    balance:              number;
    currentPage:          number;
    totalPages:           number;
    pageSize:             number;
    accountOperationDTOS: AccountOperation[];
  }
  
  export interface AccountOperation {
    id:            number;
    operationDate: Date;
    amount:        number;
    type:          string;
    description:   string;
  }
  export interface CustomerAccount {
    
      type: string,
      id: string,
      balance: number,
      createdAt: Date,
      status: null,
      customerDTO: {
        id: number,
        name: string,
        email: string
      }
      
    
  }