import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { omit } from 'app/utils';
import { EventActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { EventModel ,VenueModel, SupplierModel} from 'app/models';
import EventService from '../../../services/EventService';
import { SideNav, EventDetail} from 'app/components';

export namespace Events {
    export interface Props extends RouteComponentProps<void> {
      events: RootState.EventState;
      suppliers: SupplierModel[];
      venues: VenueModel[]
      actions: EventActions;
    }

    export interface State {
      idfilter: string;
  }
}
const data = [{
    EventID: 33, 
    Date : '2018-09-04' ,
    InviteeNum: 10,
    Budget: 600,
    VenueID: 3,
    VenueName: "university",
    ClientID: 12,
    ClientName: "lisa",
    EventType: "Birthday",
    EmpID: 2,
    ManagerName: "Sasa",
    OrderValue: 350,
    Orders: [
      {
        ItemID: 4,
        ItemName: "Popcorn",
        ClientID: 12,
        EventID: 33,
        SupplierName: "FreshJuice",
        UnitPrice: 24,
        Quantity: 2,
        TotalPrice: 48
      }
    ]
}];



@connect(
    (state: RootState, ownProps): Pick<Events.Props, 'events'| 'suppliers'|'venues'> => ({
      events: state.eventstate,
      suppliers: state.suppliers.suppliers,
      venues: state.venuestate.venues
    }),
    (dispatch: Dispatch): Pick<Events.Props, 'actions'> => ({
      actions: bindActionCreators(omit(EventActions, 'Type'), dispatch)
    })
  )

export class Events extends React.Component<Events.Props, Events.State> {
    /*static defaultProps: Partial<Supplier.Props> = {
      filter: TodoModel.Filter.SHOW_ALL
    };*/
  
    constructor(props: Events.Props, context?: any) {
      super(props, context);
      this.state = {idfilter: ""};
      this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
      this.handleViewEvent = this.handleViewEvent.bind(this);
      this.handleFilterId = this.handleFilterId.bind(this);
      //console.log(this.props.suppliers);

      //EventService.getEvents().then((results) =>{
        this.props.actions.loadEvent(data);//results.data.results);
      //})
    }

  
    /*handleFilterChange(filter: TodoModel.Filter): void {
      this.props.history.push(`#${filter}`);
    }*/

    handleDeleteEvent(id: number) {
      EventService.deleteEvent(id).then(()=>{
        EventService.getEvents().then((results)=>{
          this.props.actions.loadEvent(results.data.results)
        })
      })
    }

    handleViewEvent(id: number) {
      console.log(id);
      this.props.actions.viewEvent(id);
      this.props.actions.showhideDetails(true);
    }

    handleFilterId(event: any){
      this.setState({idfilter: event.target.value});
    }
  
    render() {

      let displayevents = this.props.events.events;
      if(this.state.idfilter) {
        displayevents = this.props.events.events.filter((event) => {
          return (event.EventID === parseInt(this.state.idfilter, 10));
        })
      }

      let element;
      if(this.props.events.showhidedetails) {
        element = (
          <EventDetail
            event= {this.props.events.selectedevent}
            suppliers= {this.props.suppliers}
            venues= {this.props.venues}
            loadEvents={this.props.actions.loadEvent}
            loadOrders={this.props.actions.loadOrders}
            showhideDetails={this.props.actions.showhideDetails}
          />
        );
      } else {
        element = (
          <div>
            <div className={style.wrap}>
            <div className={style.search}>
            <input type="text" className={style.searchTerm} placeholder="Filter by ID" onChange={this.handleFilterId}/>
            <button type="submit" className={style.searchButton}><i className="fa fa-search"></i></button>
            </div>
            </div>
          <div className="table">
              <table>
                  <tr>
                      <th>EventID</th>
                      <th>ClientID</th>
                      <th>Client Name</th>
                      <th>Date</th>
                      <th>Venue Name</th>
                      <th>Budget</th>
                      <th>Event Type</th>
                      <th>Number of Attendee</th>
                      <th>Order Value</th>
                      <th>Manager Name</th>
                      <th></th>
                      <th></th>
                  </tr>
                  {displayevents.map((event) => (
                    <tr>
                      <th>{event.EventID}</th>
                      <th>{event.ClientID}</th>
                      <th>{event.ClientName}</th>
                      <th>{event.Date}</th>
                      <th>{event.VenueName}</th>
                      <th>{event.Budget}</th>
                      <th>{event.EventType}</th>
                      <th>{event.InviteeNum}</th>
                      <th>{event.OrderValue}</th>
                      <th>{event.ManagerName}</th>
                      <th><i className="fa fa-trash-o" onClick={(e) => this.handleDeleteEvent(event.EventID)}></i></th>
                      <th><i className="fa fa-eye" onClick={(e) => this.handleViewEvent(event.EventID)}></i></th>
                </tr>
                  ))}
              </table>
          </div>
      </div>);
      }
  
      return (
        <div>
          <h1>Manage Events</h1>
          <SideNav/>
          {element}
        </div>
      );
    }
  }

