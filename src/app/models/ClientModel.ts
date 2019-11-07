export interface PrivateClientModel {
    ClientID: number,
    ClientName: string,
    Phone: string,
    Email: string,
    ContactMethod: string,
    AccountNum:string, 
    AccountType: string, 
    AccountName: string, 
    BillingAddr: string

}

export interface CorporateClientModel {
    ClientID: number,
    CompanyName: string,
    ContactPerson: string,
    Phone: string,
    Email: string,
    ContactMethod: string,
    AccountNum: string, 
    AccountType: string, 
    AccountName: string, 
    BillingAddr: string
}