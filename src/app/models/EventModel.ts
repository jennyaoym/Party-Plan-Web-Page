
export interface EventModel {
    EventID: number; 
    Date : string; 
    InviteeNum: number; 
    Budget: number; 
    VenueID: number;
    VenueName: string;
    ClientID: number;
    ClientName: string;
    EventType: string;
    EmpID: number;
    ManagerName: string;
    OrderValue: number;
    Orders: OrderModel[];
}

export interface OrderModel{
    ItemID: number;
    ItemName: string; 
    ClientID: number; 
    EventID: number;
    SupplierName: string 
    UnitPrice: number;
    Quantity: number;
    TotalPrice: number;
}
