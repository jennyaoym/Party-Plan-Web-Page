import * as React from 'react';
//import * as classNames from 'classnames';
//import * as style from './style.css';
import { VenueModel } from 'app/models';
import { VenueActions } from 'app/actions';
//import { TodoTextInput } from '../TodoTextInput';
import VenueService from '../../../services/VenueService';


//change on save to onsearch

export namespace VenueItem {
    export interface Props {
        venue: VenueModel;
        loadVenue: typeof VenueActions.loadVenue;
        editVenue: typeof VenueActions.editVenue;
    }
}

export class VenueItem extends React.Component<VenueItem.Props> {
    constructor(props: VenueItem.Props, context?: any) {
        super(props, context);

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDeleteVenue = this.handleDeleteVenue.bind(this);
    }
    

    /*handleDoubleClick() {
        this.setState({ editing: true });
    }*/

    handleDeleteVenue() {
        VenueService.deleteVenue(this.props.venue.VenueID).then(()=>{
            VenueService.getVenues().then((results) => {
                this.props.loadVenue(results.data.results);
            });
        })
    }

    handleUpdate(){
        this.props.editVenue(this.props.venue);
    }


    /*handleUpdateSubmit() {
        this.setState({ editing: false });
        VenueService.updateVenue({
            id: this.props.venue.VenueID,
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
                <td>{this.props.venue.VenueID}</td>
                <td>{this.props.venue.LocationName}</td>
                <td>{this.props.venue.Address}</td>
                <td>{this.props.venue.Capacity}</td>
                <td>{this.props.venue.VenueType}</td>
                <td>{this.props.venue.Price}</td>
                <td><i className="fa fa-trash-o" onClick={this.handleDeleteVenue}></i></td>
                <td><i className="fa fa-pencil" onClick={this.handleUpdate}></i></td>
            </tr>
            
        );

    }
}