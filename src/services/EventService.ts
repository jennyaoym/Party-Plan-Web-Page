import Api from './Api'

export default {
    getEvents() {
        return Api().get('event')
    },
    getOrderByEventId(id: number) {
        return Api().post('order', {
            id: id
        })
    },
    getItemsBySupplierId(id: number) {
        return Api().post('itemlist', {
            id: id
        })
    },
    getManagers() {
        return Api().get('manager')
    },
    deleteEvent(id: number) {
        return Api().post('event/delete', {
            id: id
        })
    },
    deleteOrder(order: any) {
        return Api().post('event/delete', order)
    },
    addEvent(event: any) {
        console.log(event);
        return Api().post('event/add', event)
    },
    addOrder(order: any) {
        console.log(order);
        return Api().post('order/add', order)
    },
    updateEvent(event: any) {
        console.log(event);
        return Api().post('event/update', event)
    },
    updateOrder(order: any) {
        console.log(order);
        return Api().post('order/update', order)
    }
}