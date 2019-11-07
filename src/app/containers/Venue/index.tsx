import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { omit } from 'app/utils';
import { VenueActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { VenueModel } from 'app/models';
import VenueService from '../../../services/VenueService';
import { VenueList, SideNav} from 'app/components';

export namespace Venue {
    export interface Props extends RouteComponentProps<void> {
      venues: RootState.VenueState;
      actions: VenueActions;
    }

    export interface State {
      adding: boolean;
      editing: boolean;
      temp: any;
      idfilter: string;
  }
}

const data = [
  {
    VenueID: 473,
    LocationName: "High Park",
    Address: "387 University Dr.",
    Capacity: 200,
    VenueType: "park",
    Price: 800
  }
]

@connect(
    (state: RootState, ownProps): Pick<Venue.Props, 'venues'> => ({
      venues: state.venuestate
    }),
    (dispatch: Dispatch): Pick<Venue.Props, 'actions'> => ({
      actions: bindActionCreators(omit(VenueActions, 'Type'), dispatch)
    })
  )

export class Venue extends React.Component<Venue.Props, Venue.State> {
    /*static defaultProps: Partial<Venue.Props> = {
      filter: TodoModel.Filter.SHOW_ALL
    };*/
  
    constructor(props: Venue.Props, context?: any) {
      
      super(props, context);
      console.log(this.props);
      this.state = { adding: false, editing: false, temp: this.props.venues.temp, idfilter: "" };
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeType = this.handleChangeType.bind(this);
      this.handleChangeAddr = this.handleChangeAddr.bind(this);
      this.handleChangeCapacity = this.handleChangeCapacity.bind(this);
      this.handleChangePrice = this.handleChangePrice.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleOpenAdd = this.handleOpenAdd.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleFilterId = this.handleFilterId.bind(this);
      VenueService.getVenues().then((results) => {
        this.props.actions.loadVenue(results.data.results);
        //console.log(results);
    });
      
      //this.handleClearCompleted = this.handleClearCompleted.bind(this);
      //this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    getSnapshotBeforeUpdate(prevProps:Venue.Props, prevState: Venue.State){
      if(this.props.venues.temp != prevProps.venues.temp) {
        this.setState({temp: this.props.venues.temp});
        console.log(this.state.temp);
      }
      return prevProps;
    }
  
    handleOpenAdd(): void {
      this.setState({ adding: true , temp: {
        VenueID: 0,
        LocationName: "",
        Address: "",
        Capacity: 0,
        VenueType: "",
        Price: 0
      }});
    }

    handleAdd(){
      this.setState({ adding: false});
      VenueService.addVenue(this.state.temp).then(()=>{
        VenueService.getVenues().then((results) => {
            this.props.actions.loadVenue(results.data.results);
        });
    })
    }

    handleUpdate(){
      console.log('updating');
      this.setState({editing: false});
      VenueService.updateVenue(this.state.temp).then(()=>{
        VenueService.getVenues().then((results) => {
            this.props.actions.loadVenue(results.data.results);
        });
    })
    }

    handleChangeName(event: any) {
      const newvenue = Object.assign({}, this.state.temp);
      newvenue.VenueName = event.target.value;
      this.setState({temp: newvenue});
    }

    handleChangeType(event: any) {
      const newvenue = Object.assign({}, this.state.temp);
      newvenue.VenueType = event.target.value;
      this.setState({temp: newvenue});
    }

    handleChangeAddr(event: any) {
      const newvenue = Object.assign({}, this.state.temp);
      newvenue.Address = event.target.value;
      this.setState({temp: newvenue});
    }

    handleChangeCapacity(event: any) {
      const newvenue = Object.assign({}, this.state.temp);
      newvenue.Capacity = event.target.value;
      this.setState({temp: newvenue});
    }

    handleChangePrice(event: any) {
      const newvenue = Object.assign({}, this.state.temp);
      newvenue.Price = event.target.value;
      this.setState({temp: newvenue});
    }

    handleCancel(){
      this.setState({editing: false, adding: false})
      if(this.props.venues.editing){
        this.props.actions.cancelEdit();
      }
    }

    handleFilterId(event: any) {
        this.setState({idfilter: event.target.value});
    }

    
  
    /*handleFilterChange(filter: TodoModel.Filter): void {
      this.props.history.push(`#${filter}`);
    }*/
  
    render() {
      //const { todos, actions, filter } = this.props;
      //const activeCount = todos.length - todos.filter((todo) => todo.completed).length;
      //const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos;
      //const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);
      let displayvenues = data;
      if(this.state.idfilter) {
        displayvenues = data.filter((venue) => {
          return (venue.VenueID === parseInt(this.state.idfilter, 10));
        })
      }
      
      

      let element;
      if(this.state.adding) {
        element = (
          <form>
            <label>
              <b>Venue Name:</b>
              <input type="text1" value={this.state.temp.VenueName} onChange={this.handleChangeName} />
            </label>
            <label>
            <b>Address:</b>
              <input type="text1" value={this.state.temp.Address} onChange={this.handleChangeAddr} />
            </label>
            <label>
            <b>Capacity:</b>
              <input type="text1" value={this.state.temp.Capacity} onChange={this.handleChangeCapacity} />
            </label>
            <label>
            <b>Venue Type:</b>
              <input type="text1" value={this.state.temp.VenueType} onChange={this.handleChangeType} />
            </label>
            <label>
            <b>Price:</b>
              <input type="text1" value={this.state.temp.Price} onChange={this.handleChangePrice} />
            </label>
            <input type="button" value="Add" onClick={this.handleAdd}/>
            <input type="button" value="Cancel" onClick={this.handleCancel} />
          </form>
        );
      } else if (this.props.venues.editing) {
        element = (
        <form onSubmit={this.handleUpdate}>
            <label>
            <b>Venue Name:</b>
              <input type="text1" value={this.state.temp.VenueName} onChange={this.handleChangeName} />
            </label>
            <label>
            <b>Address:</b>
              <input type="text1" value={this.state.temp.Address} onChange={this.handleChangeAddr} />
            </label>
            <label>
            <b>Capacity:</b>
              <input type="text1" value={this.state.temp.Capacity} onChange={this.handleChangeCapacity} />
            </label>
            <label>
            <b>Venue Type:</b>
              <input type="text1" value={this.state.temp.VenueType} onChange={this.handleChangeType} />
            </label>
            <label>
            <b>Price:</b>
              <input type="text1" value={this.state.temp.Price} onChange={this.handleChangePrice} />
            </label>
            <input type="submit" value="Submit" />
            <input type="button" value="Cancel" onClick={this.handleCancel}/>
          </form>);
      }
  
      return (
        <div>
          <h1>Manage Venues</h1>
          <SideNav/>
          <div className={style.wrap}>
          <div className={style.search}>
                        <input type="text" className={style.searchTerm} placeholder="Filter by id" onChange={this.handleFilterId}/>
                        <button type="submit1" className={style.searchButton}><i className="fa fa-search"></i></button>
                        <i className="fa fa-plus-square" style={{fontSize: '30px', position: 'relative', paddingLeft: '7px', paddingTop: '3px'}} onClick={this.handleOpenAdd}></i>
                    </div>
                </div>
          {element}
          <VenueList
            venues={displayvenues}
            editVenue={this.props.actions.editVenue}
            loadVenue={this.props.actions.loadVenue}
            />
        </div>
      );
    }
  }

