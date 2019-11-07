import * as React from 'react';
//import * as classNames from 'classnames';
//import * as style from './style.css';
import { EventModel, VenueModel} from 'app/models';
import { ClientActions } from 'app/actions';
import EventService from '../../../services/EventService'


//change on save to onsearch

export namespace ClientDetail {
    export interface Props {
        client: any;
        type: string;
        venues: VenueModel[];
        showhideDetails: typeof ClientActions.showhideClientDetail;
    }

    export interface State {
        adding: boolean;
        tempevent: any;
        listofmanagers: any;
        listofvenues: VenueModel[];
        listofevents: any;
    }
}

const manager = [
    {
      EmpID:2,
      ManagerName: "Sasa"
    },
    {
      EmpID:5,
      ManagerName: "Jim"
    }
  ]

export class ClientDetail extends React.Component<ClientDetail.Props, ClientDetail.State> {
    constructor(props: ClientDetail.Props, context?: any) {
        super(props, context);
        this.state = {
            adding: false,
            tempevent: {
                EventID: 0,
                ClientID: this.props.client.ClientID,
                Date:"",
                InviteeNum: 0,
                Budget: 0.00,
                VenueID: 0,
                EventType: "",
                EmpID: 0,
            },
            listofmanagers: manager,
            listofvenues: this.props.venues,
            listofevents:[]
        };
        this.handleAddEvent = this.handleAddEvent.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeInviteeNum = this.handleChangeInviteeNum.bind(this);
        this.handleChangeBudget = this.handleChangeBudget.bind(this);
        this.handleChangeVenue= this.handleChangeVenue.bind(this);
        this.handleChangeEventType = this.handleChangeEventType.bind(this);
        this.handleChangeManager = this.handleChangeManager.bind(this);
        this.handleSubmitAddEvent = this.handleSubmitAddEvent.bind(this);
        this.handleCancelEvent = this.handleCancelEvent.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
        this.validatefield = this.validatefield.bind(this);
        EventService.getManagers().then((results)=>{
            if(results.data.success) this.setState({listofmanagers: results.data.results});
        })
    
    }


    handleGoBack(){
        this.setState({
            adding: false,
            tempevent: {
                EventID: 0,
                ClientID: this.props.client.ClientID,
                Date:"",
                InviteeNum: 0,
                Budget: 0.00,
                VenueID: 0,
                EventType: "",
                EmpID: 0,
            },
            listofmanagers: manager,
            listofvenues: this.props.venues,
            listofevents:[]
        });
        this.props.showhideDetails(false);
    }

    handleAddEvent(){
        this.setState({adding: true});
    }

    handleChangeDate(event:any){
        const date = event.target.value
        this.setState(preState => ({
            tempevent:{
                ...preState.tempevent,
                Date: date

            }
        }))
    }

    handleChangeInviteeNum(event: any){
        const num = event.target.value;
        this.setState(preState => ({
            tempevent:{
                ...preState.tempevent,
                InviteeNum: num

            }
        }))
    }

    handleChangeBudget(event: any){
        const num = event.target.value;
        this.setState(preState => ({
            tempevent:{
                ...preState.tempevent,
                Budget: num

            }
        }))
    }

    handleChangeVenue(event: any){
        const vid = event.target.value;
        this.setState(preState => ({
            tempevent:{
                ...preState.tempevent,
                VenueID: vid

            }
        }))
    }

    handleChangeEventType(event: any){
        const type = event.target.value;
        this.setState(preState => ({
            tempevent:{
                ...preState.tempevent,
                EventType: type

            }
        }))
    }

    handleChangeManager(event: any){
        const emid = event.target.value;
        this.setState(preState => ({
            tempevent:{
                ...preState.tempevent,
                EmpID: emid

            }
        }))
    }

    handleSubmitAddEvent(){ //api call
        this.setState({adding: false});
        EventService.addEvent(this.state.tempevent);
    }

    handleCancelEvent(){
        this.setState({adding: false, tempevent: {
            EventID: 0,
            ClientID: this.props.client.ClientID,
            Date:"",
            InviteeNum: 0,
            Budget: 0.00,
            VenueID: 0,
            EventType: "",
            EmpID: 0,
        } });
    }

    validatefield(){
        return (this.state.tempevent.Date === "" ||
                this.state.tempevent.InviteeNum === 0 ||
                this.state.tempevent.Budget === 0 ||
                this.state.tempevent.VenueID === 0 ||
                this.state.tempevent.EmpID === 0);
    }
    render(){
        let info;
        if(this.props.type === "Private") {
            info = (
                <li><label>ClientName: <strong>{this.props.client.ClientName}</strong></label></li>
            );
        }else {
            info =(<div><li><label>Company Name: <strong>{this.props.client.CompanyName}</strong></label></li>
                   <li><label>Contact Person: <strong>{this.props.client.ContactPerson}</strong></label></li></div>);
        }
        return (
            <div>
                <i className="fa fa-chevron-circle-left" onClick={this.handleGoBack}></i>
                <h2>Client Information</h2>
                <hr />
                <ul>
                    <li>ClientID: <strong>{this.props.client.ClientID}</strong></li>
                    <li>Client Type: <strong>{this.props.type}</strong></li>
                    {info}
                    <li><label>Contact Method: <strong>{this.props.client.ContactMethod}</strong></label></li>
                    <li><label>Phone Number: <strong>{this.props.client.Phone}</strong></label></li>
                    <li><label>Email Address: <strong>{this.props.client.Email}</strong></label></li>
                </ul>
                <h2>Billing Information</h2>
                <hr />
                <ul>
                    <li><label>Account Number: <strong>{this.props.client.AccountNum}</strong></label></li>
                    <li><label>Account Type: <strong>{this.props.client.AccountType}</strong></label></li>
                    <li><label>Account Name: <strong>{this.props.client.AccountName}</strong></label></li>
                    <li><label>Billing Address: <strong>{this.props.client.BillingAddr}</strong></label></li>
                </ul>
                <hr />
                <h2>Place an Event Order</h2>
                <div hidden={this.state.adding} className="plusicon">
                <i className="fa fa-plus-square" style={{fontSize: '30px', position: 'relative', paddingLeft: '7px', paddingTop: '3px'}} onClick={this.handleAddEvent}></i>
                </div>
                <div hidden={!this.state.adding}>
                    <label>
                        Event Date:
                        <input type="date" value={this.state.tempevent.Date} onChange={this.handleChangeDate} required/>
                    </label>
                    <label>
                        Invitee Number:
                        <input type="number" value={this.state.tempevent.InviteeNum} onChange={this.handleChangeInviteeNum} required/>
                    </label>
                    <label>
                        Budget:
                        <input type="number" value={this.state.tempevent.Budget} onChange={this.handleChangeBudget} required/>
                    </label>
                    <label>
                        Venue Name:
                        <select onChange={this.handleChangeVenue}>
                            {this.state.listofvenues.map((venue)=> {
                                return (<option value={venue.VenueID} selected={this.state.tempevent.VenueID===venue.VenueID}>{venue.LocationName} </option>);
                            })}
                        </select>
                    </label>
                    <label>
                        Event Type:
                        <input type="text" value={this.state.tempevent.EventType} onChange={this.handleChangeEventType}/>
                    </label>
                    <label>
                        Manager Name:
                        <select onChange={this.handleChangeManager}>
                            {this.state.listofmanagers.map((manager: {EmpID: number,  ManagerName: string})=> {
                                return (<option value={manager.EmpID} selected={this.state.tempevent.EmpID===manager.EmpID}>{manager.ManagerName}</option>);
                            })}
                        </select>
                    </label>
                    <input type="button" value="Add Event" onClick={this.handleSubmitAddEvent} disabled={this.validatefield()}/>
                    <input type="button" value="Cancel" onClick={this.handleCancelEvent}/>
                </div>
            </div>
        );

    }
}