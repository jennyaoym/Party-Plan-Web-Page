import Api from './Api'

export default {
    getPrivateClients() {
        return Api().get('client/private')
    },
    getCorporateClients() {
        return Api().get('client/corporate')
    },
    getManagers() {
        return Api().get('manager')
    },
    getEventsByClientId(id: number) {
        return Api().post('client/events', {
            id: id
        })
    },
    deletePrivateClient(id: number) {
        return Api().post('client/private/delete', {
            id: id
        })
    },
    deleteCorporateClient(id: number) {
        return Api().post('client/corporate/delete', {
            id: id
        })
    },
    addPrivateClient(client: any) {
        console.log(client);
        return Api().post('client/private/add', client)
    },
    addCorporateClient(client: any) {
        console.log(client);
        return Api().post('client/corporate/add', client)
    },
    updatePrivateClient(client: any) {
        console.log(client);
        return Api().post('client/private/update', client)
    },
    updateCorporateClient(client: any) {
        console.log(client);
        return Api().post('client/corporate/update', client)
    }
}
