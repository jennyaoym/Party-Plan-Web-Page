import * as React from 'react';
//import * as classNames from 'classnames';
import * as style from '../../containers/Events/style.css';
import { EventModel, SupplierModel ,VenueModel} from 'app/models';
import { EventActions } from 'app/actions';
import EventService from '../../../services/EventService'


//change on save to onsearch

export namespace EventDetail {
    export interface Props {
        event: EventModel;
        suppliers: SupplierModel[];
        venues: VenueModel[];
        loadEvents: typeof EventActions.loadEvent;
        loadOrders: typeof EventActions.loadOrders;
        showhideDetails: typeof EventActions.showhideDetails;

    }

    export interface State {
        adding: boolean;
        editingevent: boolean;
        editingorder: boolean;
        tempevent: EventModel;
        temporder: any;
        addorder: any;
        listofitems: any;
        typefilter: string;
        selectedsupplier: any;
        listofmanagers: any;
        listofvenues: VenueModel[];
    }
}

const enum ItemType {
    food = "Food",
    drink = "Drink",
    decor = "Decoration/Flower",
    enter = "Entertainment/Music"
}
const itemtypes = [
    ItemType.food,
    ItemType.drink,
    ItemType.decor,
    ItemType.enter
]

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

export class EventDetail extends React.Component<EventDetail.Props, EventDetail.State> {
    constructor(props: EventDetail.Props, context?: any) {
        super(props, context);
        this.state = {
            adding: false,
            editingevent: false,
            editingorder: false,
            tempevent: this.props.event,
            temporder: {
                ClientID: this.props.event.ClientID,
                EventID: this.props.event.EventID,
                ItemID: 0,
                Quantity: 0
            },
            addorder: {
                ClientID: this.props.event.ClientID,
                EventID: this.props.event.EventID,
                ItemID: 0,
                Quantity: 0
            },
            typefilter: "",
            listofitems: [],
            selectedsupplier: {},
            listofmanagers: manager,
            listofvenues: this.props.venues
        };
        
        this.handleUpdateEvent = this.handleUpdateEvent.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeInviteeNum = this.handleChangeInviteeNum.bind(this);
        this.handleChangeBudget = this.handleChangeBudget.bind(this);
        this.handleChangeVenue= this.handleChangeVenue.bind(this);
        this.handleChangeEventType = this.handleChangeEventType.bind(this);
        this.handleChangeManager = this.handleChangeManager.bind(this);
        this.handleSaveEvent = this.handleSaveEvent.bind(this);
        this.handleCancelEvent = this.handleCancelEvent.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleSelectSupplier = this.handleSelectSupplier.bind(this);
        this.handleAddOrder = this.handleAddOrder.bind(this);
        this.handleSelectItem = this.handleSelectItem.bind(this);
        this.handleAddQuantity = this.handleAddQuantity.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
        this.handleDeleteOrder = this.handleDeleteOrder.bind(this);
        this.handleUpdateOrder = this.handleUpdateOrder.bind(this);
        this.handleSaveOrder = this.handleSaveOrder.bind(this);
        this.handleCancelOrder = this.handleCancelOrder.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
        EventService.getManagers().then((results)=>{
            if(results.data.success) this.setState({listofmanagers: results.data.results});
        })
    
    }


    handleGoBack(){
        this.setState({
            adding: false,
            editingevent: false,
            editingorder: false,
            tempevent: this.props.event,
            temporder: {
                ClientID: this.props.event.ClientID,
                EventID: this.props.event.EventID,
                ItemID: 0,
                Quantity: 0
            },
            addorder: {
                ClientID: this.props.event.ClientID,
                EventID: this.props.event.EventID,
                ItemID: 0,
                Quantity: 0
            },
            typefilter: "",
            listofitems: [],
            selectedsupplier: {},
            listofmanagers: manager,
            listofvenues: this.props.venues
        });
        this.props.showhideDetails(false);
    }

    handleUpdateEvent(){
        this.setState({editingevent: true});
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

    handleSaveEvent(){ //api call
        this.setState({editingevent: false});
        EventService.updateEvent(this.state.tempevent).then(()=>{
            EventService.getEvents().then((results)=>{
                this.props.loadEvents(results.data.results);
            })
        });
    }

    handleCancelEvent(){
        this.setState({editingevent: false, tempevent: this.props.event});
    }

    handleChangeType(event:any){
        switch(event.target.value){
            case ItemType.food:
                this.setState({typefilter: "Food"});
                break;
            case ItemType.drink:
                this.setState({typefilter: "Drink"});
                break;
            case ItemType.decor:
                this.setState({typefilter: "Decor"});
                break;
            case ItemType.enter:
                this.setState({typefilter: "Entertainment"});
                break;
        }
    }

    handleSelectSupplier(event: any){
        EventService.getItemsBySupplierId(event.target.value).then((results)=>{
            this.setState({listofitems:results.data.results})
        })
    }

    handleAddOrder(){
        this.setState({adding: true})
    }

    handleSelectItem(event: any){
        this.setState({addorder:
            {ClientID: this.props.event.ClientID,
            EventID: this.props.event.EventID,
            ItemID: event.target.value,
            Quantity: this.state.addorder.Quantity}})
    }

    handleAddQuantity(event: any){
        const qty = event.target.value;
        this.setState(preState => ({
            addorder:{
                ...preState.addorder,
                Quantity: qty
            }
        }))
    }

    handleAdd(){ //api call
        EventService.addOrder(this.state.addorder).then(()=>{
            EventService.getOrderByEventId(this.props.event.EventID).then((results)=>{
                this.props.loadOrders(results.data.results);
            })
        })
        this.handleCancel();
    }

    handleCancel(){
        this.setState({adding: false,addorder: {
            ClientID: this.props.event.ClientID,
            EventID: this.props.event.EventID,
            ItemID: 0,
            Quantity: 0
        }})
    }

    handleChangeQuantity(event: any){
        const qty = event.target.value;
        this.setState(preState => ({
            temporder:{
                ...preState.temporder,
                Quantity: qty
            }
        }))
    }

    handleDeleteOrder(id: number){ //api call
        EventService.deleteOrder(id).then(()=>{
            EventService.getOrderByEventId(this.props.event.EventID).then((results)=>{
                this.props.loadOrders(results.data.results);
            })
        })
    }

    handleUpdateOrder(id: number){
        const item = this.props.event.Orders.find((o) =>{
            return o.ItemID === id;
        });
        this.setState({editingorder: true, temporder:{
            ClientID: this.props.event.ClientID,
            EventID: this.props.event.EventID,
            ItemID: id,
            Quantity: item? item.Quantity: 0
        }})
    }

    handleSaveOrder(){ //all api
        this.setState({editingorder: false});
        EventService.updateOrder(this.state.temporder).then(()=>{
            EventService.getOrderByEventId(this.props.event.EventID).then((results)=>{
                this.props.loadOrders(results.data.results);
            })
        })

    }

    handleCancelOrder(){
        this.setState({editingorder: false, temporder:{
            ClientID: this.props.event.ClientID,
            EventID: this.props.event.EventID,
            ItemID: 0,
            Quantity: 0
        }})
    }

    render() {
        let displaysupplier = this.props.suppliers;
        if(this.state && this.state.typefilter !== "") {
            displaysupplier = displaysupplier.filter((supplier) =>{
                return supplier.SupplierType === this.state.typefilter;
            })
        }
        return (
            <div>
                <i hidden={this.state.editingevent} className="fa fa-chevron-circle-left" onClick={this.handleGoBack}></i>
                <h2>Event Information</h2><i hidden={this.state.editingevent} className="fa fa-pencil" onClick={this.handleUpdateEvent}></i>
                <hr />
                <div className={style.eventform}>
                    <label>
                        <b>EventID:</b>
                        <input type="text1" value={this.props.event.EventID} disabled={true} />
                    </label>
                    <label>
                    <b>Client Name:</b>
                        <input type="text1" value={this.props.event.ClientName} disabled={true} />
                    </label>
                    <label>
                    <b>Event Date:</b>
                        <input type="date" value={this.state.tempevent.Date} onChange={this.handleChangeDate} disabled={!this.state.editingevent} />
                    </label>
                    <label>
                    <b>Invitee Number:</b>
                        <input type="number" value={this.state.tempevent.InviteeNum} onChange={this.handleChangeInviteeNum} disabled={!this.state.editingevent} />
                    </label>
                    <label>
                    <b>Budget:</b>
                        <input type="number" value={this.state.tempevent.Budget} onChange={this.handleChangeBudget} disabled={!this.state.editingevent} />
                    </label>
                    <label>
                    <b>Venue Name:</b>
                    <br/><select onChange={this.handleChangeVenue} disabled={!this.state.editingevent}>
                            {this.state.listofvenues.map((venue)=> {
                                return (<option value={venue.VenueID} selected={this.state.tempevent.VenueID===venue.VenueID}>{venue.LocationName} </option>);
                            })}
                        </select><br/>
                    </label>
                    <label>
                    <b>Event Type:</b>
                        <input type="text1" value={this.state.tempevent.EventType} onChange={this.handleChangeEventType} disabled={!this.state.editingevent} />
                    </label>
                    <label>
                    <b>Manager Name:</b>
                    <br/><select onChange={this.handleChangeManager} disabled={!this.state.editingevent}>
                            {this.state.listofmanagers.map((manager: {EmpID: number,  ManagerName: string})=> {
                                return (<option value={manager.EmpID} selected={this.state.tempevent.EmpID===manager.EmpID}>{manager.ManagerName}</option>);
                            })}
                        </select><br/>
                    </label>
                    <input hidden={!this.state.editingevent} type="button" value="Save Changes" onClick={this.handleSaveEvent}/>
                    <input hidden={!this.state.editingevent} type="button" value="Cancel" onClick={this.handleCancelEvent}/>
                </div>
                <br />
                <h2>OrderDetails</h2><i className="fa fa-plus" onClick={this.handleAddOrder}></i>
                <hr />
                <div hidden={!this.state.adding}>
                <form>
                    <label>
                        Item Type:
                        <select onChange={this.handleChangeType}>
                            {itemtypes.map((type)=> {
                                return (<option value={type}>{type}</option>);
                            })}
                        </select>
                    </label>
                    <label>
                        Supplier Name:
                        <select onChange={this.handleSelectSupplier}>
                            {displaysupplier.map((supplier)=> {
                                return (<option value={supplier.SupplierID} >{supplier.SupplierName}</option>);
                            })}
                        </select>
                    </label>
                    <label>
                        Item Name:
                        <select onChange={this.handleSelectItem}>
                            {this.state.listofitems.map((item:{ItemID: number, ItemName: string, UnitPrice: number})=> {
                                return (<option value={item.ItemID}>{item.ItemName + "/ $" + item.UnitPrice}</option>);
                            })}
                        </select>
                    </label>
                    <label>
                        Quantity: 
                        <input type="number" value={this.state.addorder.Quantity} onChange={this.handleAddQuantity} />
                    </label>
                    <input type="button" value="Add" onClick={this.handleAdd}/>
                    <input type="button" value="Cancel" onClick={this.handleCancel} />
                </form>
                </div>
                <div className="table">
                    <table>
                        <tr>
                            <th>ItemID</th>
                            <th>Item Name</th>
                            <th>Supplier Name</th>
                            <th>UnitPrice</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {this.props.event.Orders.map((order) => {
                            const editing = this.state.editingorder && this.state.temporder.ItemID === order.ItemID;
                            return (<tr>
                                <th>{order.ItemID}</th>
                                <th>{order.ItemName}</th>
                                <th>{order.SupplierName}</th>
                                <th>{order.UnitPrice}</th>
                                <th><input type="number" value={editing? this.state.temporder.Quantity:order.Quantity} onChange={this.handleChangeQuantity} disabled={!editing} /></th>
                                <th>{order.TotalPrice}</th>
                                <th><i className="fa fa-trash-o" onClick={(e) => this.handleDeleteOrder(order.ItemID)}></i></th>
                                <th hidden={editing}><i className="fa fa-pencil" onClick={(e) => this.handleUpdateOrder(order.ItemID)}></i></th>
                                <th hidden={!editing}><input type="button" value="Save" onClick={this.handleSaveOrder} /></th>
                                <th hidden={!editing}><input type="button" value="Cancel" onClick={this.handleCancelOrder} /></th>
                            </tr>
                            );
                        }
                        )}
                    </table>
                </div>
            </div>
        );

    }
}