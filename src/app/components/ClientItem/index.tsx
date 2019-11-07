import * as React from 'react';
//import * as classNames from 'classnames';
//import * as style from './style.css';
import { PrivateClientModel } from 'app/models';
import { CorporateClientModel } from 'app/models';
import { ClientActions } from 'app/actions';
//import { TodoTextInput } from '../TodoTextInput';
import ClientService from '../../../services/ClientService';


//change on save to onsearch

export namespace PrivateClientItem {
    export interface Props {
        privateClient: PrivateClientModel;
        disableedit: boolean;
        loadPrivateClient: typeof ClientActions.loadPrivateClient;
        editPrivateClient: typeof ClientActions.editPrivateClient;
        showhideclientdetails: typeof ClientActions.showhideClientDetail;
        selectclient: typeof ClientActions.selectClient;
    }
}

export namespace CorporateClientItem {
    export interface Props {
        corporateClient: CorporateClientModel;
        disableedit: boolean;
        loadCorporateClient: typeof ClientActions.loadCorporateClient;
        editCorporateClient: typeof ClientActions.editCorporateClient;
        showhideclientdetails: typeof ClientActions.showhideClientDetail;
        selectclient: typeof ClientActions.selectClient;
    }
}


export class PrivateClientItem extends React.Component<PrivateClientItem.Props> {
    constructor(props: PrivateClientItem.Props, context?: any) {
        super(props, context);

        this.handleUpdatePrivateClient = this.handleUpdatePrivateClient.bind(this);
        this.handleDeletePrivateClient = this.handleDeletePrivateClient.bind(this);
        this.handleViewPClient = this.handleViewPClient.bind(this);
    }
    

    handleViewPClient(){
        this.props.selectclient({
            client: this.props.privateClient,
            type: "Private"
        })
        this.props.showhideclientdetails(true);
    }

    handleDeletePrivateClient() {
        ClientService.deletePrivateClient(this.props.privateClient.ClientID).then(()=>{
            ClientService.getPrivateClients().then((results) => {
                this.props.loadPrivateClient(results.data.results);
            });
        })
    }

    handleUpdatePrivateClient(){
        if(this.props.disableedit) return;
        this.props.editPrivateClient(this.props.privateClient);
    }

    render() {
        return (
            <tr>
                <td><i className="fa fa-eye" onClick={this.handleViewPClient}></i></td>
                <td>{this.props.privateClient.ClientID}</td>
                <td>{this.props.privateClient.ClientName}</td>
                <td>{this.props.privateClient.Phone}</td>
                <td>{this.props.privateClient.Email}</td>
                <td>{this.props.privateClient.ContactMethod}</td>
                <td><i className="fa fa-trash-o" onClick={this.handleDeletePrivateClient}></i></td>
                <td><i className="fa fa-pencil" onClick={this.handleUpdatePrivateClient}></i></td>
            </tr>
            
        );

    }
}

    export class CorporateClientItem extends React.Component<CorporateClientItem.Props> {
        constructor(props: CorporateClientItem.Props, context?: any) {
            super(props, context);
    
            this.handleUpdateCorporateClient = this.handleUpdateCorporateClient.bind(this);
            this.handleDeleteCorporateClient = this.handleDeleteCorporateClient.bind(this);
            this.handleViewCClient = this.handleViewCClient.bind(this);
        }
        
    
        handleViewCClient(){
            this.props.selectclient({
                client: this.props.corporateClient,
                type: "Corporate"
            })
            this.props.showhideclientdetails(true);
        }
    
        handleDeleteCorporateClient() {
            ClientService.deleteCorporateClient(this.props.corporateClient.ClientID).then(()=>{
                ClientService.getCorporateClients().then((results) => {
                    this.props.loadCorporateClient(results.data.results);
                });
            })
        }
    
        handleUpdateCorporateClient(){
            if(this.props.disableedit) return;
            this.props.editCorporateClient(this.props.corporateClient);
        }


    render() {
        return (
            <tr>
                <td><i className="fa fa-eye" onClick={this.handleViewCClient}></i></td>
                <td>{this.props.corporateClient.ClientID}</td>
                <td>{this.props.corporateClient.CompanyName}</td>
                <td>{this.props.corporateClient.ContactPerson}</td>
                <td>{this.props.corporateClient.Phone}</td>
                <td>{this.props.corporateClient.Email}</td>
                <td>{this.props.corporateClient.ContactMethod}</td>
                <td><i className="fa fa-trash-o" onClick={this.handleDeleteCorporateClient}></i></td>
                <td><i className="fa fa-pencil" onClick={this.handleUpdateCorporateClient}></i></td>
            </tr>
            
        );

    }
}