import Api from './Api'

export default {
    getFoodItems() {
        return Api().get('item/food')
    },
    getDrinkItems() {
        return Api().get('item/drink')
    },
    getDecorItems() {
        return Api().get('item/decor')
    },
    getEntertainmentItem() {
        return Api().get('/item/entertainment')
    },
    deleteFood(id: number) {
        return Api().post('item/food/delete', {
            id: id
        })
    },
    deleteDrink(id: number) {
        return Api().post('item/drink/delete', {
            id: id
        })
    },
    deleteDecorItem(id: number) {
        return Api().post('item/decor/delete', {
            id: id
        })
    },
    DeleteEntertainmentMusicItem(id: number) {
        return Api().post('item/entertainment/delete', {
            id: id
        })
    },
    addFood(item: any) {
        console.log(item);
        return Api().post('item/food/add', {
            ItemName: item.ItemName,
            UnitPrice: item.UnitPrice,
            SupplierID: item.SupplierID,
            ServingTemp: item.ServingTemp,
            IsVegetarian: item.IsVegetarian ,
            SpicyLevel: item.SpicyLevel
        })
    },
    addDrink(item: any) {
        console.log(item);
        return Api().post('item/drink/add', {
            ItemName: item.ItemName,
            UnitPrice: item.UnitPrice,
            SupplierID: item.SupplierID,
            ServingTemp: item.ServingTemp,
            AlcoholLevel: item.AlcoholLevel,
        })
    },
    addDecorItem(item: any) {
        console.log(item);
        return Api().post('item/decor/add', item)
    },
    addEntertainmentMusicItem(item: any) {
        console.log(item);
        return Api().post('item/food/add', item)
    },
    updateFood(item: any) {
        console.log(item);
        return Api().post('item/food/update', item)
    },
    updateDrink(item: any) {
        console.log(item);
        return Api().post('item/drink/update', item)
    },
    updateDecorItem(item: any) {
        console.log(item);
        return Api().post('item/decor/update', item)
    },
    updateEntertainmentMusicItem(item: any) {
        console.log(item);
        return Api().post('item/entertainment/update', item)
    }
}