import * as React from 'react';
//import * as classNames from 'classnames';
//import * as style from './style.css';
import { SupplierModel } from 'app/models';
import { SupplierActions } from 'app/actions';
//import { TodoTextInput } from '../TodoTextInput';
import SupplierService from '../../../services/SupplierService';


//change on save to onsearch

export namespace SupplierItem {
    export interface Props {
        supplier: SupplierModel;
        loadSupplier: typeof SupplierActions.loadSupplier;
        editSupplier: typeof SupplierActions.editSupplier;
    }
}

export class SupplierItem extends React.Component<SupplierItem.Props> {
    constructor(props: SupplierItem.Props, context?: any) {
        super(props, context);

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDeleteSupplier = this.handleDeleteSupplier.bind(this);
    }
    

    /*handleDoubleClick() {
        this.setState({ editing: true });
    }*/

    handleDeleteSupplier() {
        SupplierService.deleteSupplier(this.props.supplier.SupplierID).then(()=>{
            SupplierService.getSuppliers().then((results) => {
                this.props.loadSupplier(results.data.results);
            });
        })
    }

    handleUpdate(){
        this.props.editSupplier(this.props.supplier);
    }


    /*handleUpdateSubmit() {
        this.setState({ editing: false });
        SupplierService.updateSupplier({
            id: this.props.supplier.SupplierID,
            supplierName: this.state.temp.SupplierName,
            supplierType: this.state.temp.SupplierType,
            contactNum: this.state.temp.ContactNum,
            email: this.state.temp.EmailAddr
        }).then(()=>{
            SupplierService.getSuppliers().then((results) => {
                this.props.loadSupplier(results.data.results);
            });
        })
        
    }*/

    render() {
        return (
            <tr>
                <td>{this.props.supplier.SupplierID}</td>
                <td>{this.props.supplier.SupplierName}</td>
                <td>{this.props.supplier.SupplierType}</td>
                <td>{this.props.supplier.ContactNum}</td>
                <td>{this.props.supplier.EmailAddr}</td>
                <td><i className="fa fa-trash-o" onClick={this.handleDeleteSupplier}></i></td>
                <td><i className="fa fa-pencil" onClick={this.handleUpdate}></i></td>
            </tr>
            
        );

    }
}