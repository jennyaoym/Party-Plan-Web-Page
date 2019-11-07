export interface FoodItemModel {
    ItemID: number; 
    ItemName : string; 
    UnitPrice: number; 
    SupplierID: number; 
    ServingTemp: string; 
    IsVegetarian: number; 
    SpicyLevel: number;
    
}

export interface DrinkItemModel {
    ItemID: number; 
    ItemName: string; 
    UnitPrice: number; 
    SupplierID: number; 
    ServingTemp: string; 
    AlcoholLevel: number;
}

export interface DecorItemModel {
    ItemID: number; 
    ItemName: string; 
    UnitPrice: number; 
    SupplierID: number; 
    DecorType: string;
    
}

export interface EntertainmentItemModel {
    ItemID: number; 
    ItemName: string; 
    UnitPrice: number; 
    SupplierID: number; 
    EntertainmentType: string;
    
}