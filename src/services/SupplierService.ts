import Api from './Api'

export default {
    getSuppliers() {
        return Api().get('supplier')
    },
    deleteSupplier(supplierid: number) {
        return Api().post('supplier/delete', {
            id: supplierid
        })
    },
    addSupplier(newsupplier: any) {
        console.log(newsupplier);
        return Api().post('supplier/add', {
            supplierName: newsupplier.SupplierName,
            supplierType: newsupplier.SupplierType,
            contactNum: newsupplier.ContactNum,
            email: newsupplier.EmailAddr
        })
    },
    updateSupplier(supplier: any) {
        console.log(supplier);
        return Api().post('supplier/update', {
            id: supplier.SupplierID,
            supplierName: supplier.SupplierName,
            supplierType: supplier.SupplierType,
            contactNum: supplier.ContactNum,
            email: supplier.EmailAddr
        })
    }
}
