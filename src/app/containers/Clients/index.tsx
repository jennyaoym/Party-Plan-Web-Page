import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { omit } from 'app/utils';
import { ClientActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { VenueModel } from 'app/models';
import { CorporateClientModel } from 'app/models';
import ClientService from '../../../services/ClientService';
import { PrivateClientList, CorporateClientList, SideNav, ClientDetail} from 'app/components';

export namespace Client {
    export interface Props extends RouteComponentProps<void> {
      clients: RootState.ClientState;
      venues: VenueModel[];
      actions: ClientActions;
    }

    export interface State {
      addingpclient: boolean;
      editingpclient: boolean;
      temppclient: any;
      idfilterpclient: string;
      addingcclient: boolean;
      editingcclient: boolean;
      tempcclient: any;
      idfiltercclient: string;
      selectedclient: any;

  }
}

const privatedata = [
  {
    ClientID: 0,
    ClientName: "John White",
    Phone: "1234567890",
    Email: "fiojii@idol.com",
    ContactMethod: "phone",
    AccountNum: "482084722", 
    AccountType: "Saving", 
    AccountName: "John White", 
    BillingAddr: "300 King St W, Toronto, ON, CA, N1Y6T7"
  }
]

const corporatedata = [
  {
    ClientID: 0,
    CompanyName: "ABC",
    ContactPerson: "Amy",
    Phone: "1287367789",
    Email: "djasjok@dioeik.com",
    ContactMethod: "email",
    AccountNum: "2345657432", 
    AccountType: "Checking", 
    AccountName: "ABCGlobal", 
    BillingAddr: "73 Main St, Waterloo, ON, CA, N3L9T1"
  }
]

@connect(
    (state: RootState, ownProps): Pick<Client.Props, 'clients'|'venues'> => ({
      clients: state.clientstate,
      venues: state.venuestate.venues
    }), 

    (dispatch: Dispatch): Pick<Client.Props, 'actions'> => ({
      actions: bindActionCreators(omit(ClientActions, 'Type'), dispatch)
    })
  )


export class Client extends React.Component<Client.Props, Client.State> {
    /*static defaultProps: Partial<Venue.Props> = {
      filter: TodoModel.Filter.SHOW_ALL
    };*/
  
    constructor(props: Client.Props, context?: any) {
      
      super(props, context);
      console.log(this.props);
      this.state = { addingpclient: false, 
                      addingcclient: false, 
                      editingpclient: false, 
                      editingcclient: false, 
                      temppclient: this.props.clients.temppclient, 
                      tempcclient: this.props.clients.tempcclient, 
                      idfilterpclient: "" , 
                      idfiltercclient: "",
                      selectedclient: {}};
      this.handleOpenAddPrivateClient = this.handleOpenAddPrivateClient.bind(this);
      this.handleOpenAddCorporateClient = this.handleOpenAddCorporateClient.bind(this);
      this.handleAddPrivateClient = this.handleAddPrivateClient.bind(this);
      this.handleAddCorporateClient = this.handleAddCorporateClient.bind(this);
      this.handleUpdatePrivateClient = this.handleUpdatePrivateClient.bind(this);
      this.handleUpdateCorporateClient = this.handleUpdateCorporateClient.bind(this);
      this.handleChangeClientName = this.handleChangeClientName.bind(this);
      this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
      this.handleChangePrivatePhone = this.handleChangePrivatePhone.bind(this);
      this.handleChangeCorporatePhone = this.handleChangeCorporatePhone.bind(this);
      this.handleChangePrivateEmail = this.handleChangePrivateEmail.bind(this);
      this.handleChangeCorporateEmail = this.handleChangeCorporateEmail.bind(this);
      this.handleChangePrivateContactMethod = this.handleChangePrivateContactMethod.bind(this);
      this.handleChangeCorporateContactMethod = this.handleChangeCorporateContactMethod.bind(this);
      this.handleChangeCorporateContactPerson = this.handleChangeCorporateContactPerson.bind(this);
      this.handleCancelPrivateClient = this.handleCancelPrivateClient.bind(this);
      this.handleCancelCorporateClient = this.handleCancelCorporateClient.bind(this);
      this.handleFilterIdPrivateClient = this.handleFilterIdPrivateClient.bind(this);
      this.handleFilterIdCorporateClient = this.handleFilterIdCorporateClient.bind(this);

      ClientService.getPrivateClients().then((results) => {
        this.props.actions.loadPrivateClient(results.data.results);
        //console.log(results);
    });
    ClientService.getCorporateClients().then((results) => {
      this.props.actions.loadCorporateClient(results.data.results);
      //console.log(results);
   });
      
      //this.handleClearCompleted = this.handleClearCompleted.bind(this);
      //this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    getSnapshotBeforeUpdate(prevProps:Client.Props, prevState: Client.State){
      if(this.props.clients.temppclient != prevProps.clients.temppclient) {
        this.setState({temppclient: this.props.clients.temppclient});
        console.log(this.state.temppclient);
      }
      if(this.props.clients.tempcclient != prevProps.clients.tempcclient) {
        this.setState({tempcclient: this.props.clients.tempcclient});
        console.log(this.state.tempcclient);
      }
      return prevProps;
    }
  
    handleOpenAddPrivateClient(): void {
      this.setState({ addingpclient: true , temppclient: {
        ClientID: 0,
        ClientName: "",
        Phone: "",
        Email: "",
        ContactMethod: ""
      }});
    }

    handleOpenAddCorporateClient(): void {
      this.setState({ addingcclient: true , tempcclient: {
        ClientID: 0,
        CompanyName: "",
        ContactPerson: "",
        Phone: "",
        Email: "",
        ContactMethod: ""
      }});
    }

    handleAddPrivateClient(){
      this.setState({ addingpclient: false});
      ClientService.addPrivateClient(this.state.temppclient).then(()=>{
        ClientService.getPrivateClients().then((results) => {
            this.props.actions.loadPrivateClient(results.data.results);
        });
    })
    }

    handleAddCorporateClient(){
      this.setState({ addingcclient: false});
      ClientService.addCorporateClient(this.state.tempcclient).then(()=>{
        ClientService.getCorporateClients().then((results) => {
            this.props.actions.loadCorporateClient(results.data.results);
        });
    })
    }

    handleUpdatePrivateClient(){
      console.log('updating');
      this.setState({editingpclient: false});
      ClientService.updatePrivateClient(this.state.temppclient).then(()=>{
        ClientService.getPrivateClients().then((results) => {
            this.props.actions.loadPrivateClient(results.data.results);
        });
    })
    }

    handleUpdateCorporateClient(){
      console.log('updating');
      this.setState({editingcclient: false});
      ClientService.updateCorporateClient(this.state.tempcclient).then(()=>{
        ClientService.getCorporateClients().then((results) => {
            this.props.actions.loadCorporateClient(results.data.results);
        });
    })
    }

    handleChangeClientName(event: any) {
      const newprivateclient = Object.assign({}, this.state.temppclient);
      newprivateclient.ClientName = event.target.value;
      this.setState({temppclient: newprivateclient});
    }

    handleChangeCompanyName(event: any) {
      const newcorporateclient = Object.assign({}, this.state.tempcclient);
      newcorporateclient.CompanyName = event.target.value;
      this.setState({temppclient: newcorporateclient});
    }

    handleChangePrivatePhone(event: any) {
      const newprivateclient = Object.assign({}, this.state.temppclient);
      newprivateclient.Phone = event.target.value;
      this.setState({temppclient: newprivateclient});
    }

    handleChangeCorporatePhone(event: any) {
      const newcorporateclient = Object.assign({}, this.state.tempcclient);
      newcorporateclient.Phone = event.target.value;
      this.setState({tempcclient: newcorporateclient});
    }

    handleChangePrivateEmail(event: any) {
      const newprivateclient = Object.assign({}, this.state.temppclient);
      newprivateclient.Email = event.target.value;
      this.setState({temppclient: newprivateclient});
    }

    handleChangeCorporateEmail(event: any) {
      const newcorporateclient = Object.assign({}, this.state.tempcclient);
      newcorporateclient.Email = event.target.value;
      this.setState({tempcclient: newcorporateclient});
    }

    handleChangePrivateContactMethod(event: any) {
      const newprivateclient = Object.assign({}, this.state.temppclient);
      newprivateclient.ContactMethod = event.target.value;
      this.setState({temppclient: newprivateclient});
    }

    handleChangeCorporateContactMethod(event: any) {
      const newcorporateclient = Object.assign({}, this.state.tempcclient);
      newcorporateclient.ContactMethod = event.target.value;
      this.setState({tempcclient: newcorporateclient});
    }

    handleChangeCorporateContactPerson(event: any) {
      const newcorporateclient = Object.assign({}, this.state.tempcclient);
      newcorporateclient.ContactPerson = event.target.value;
      this.setState({tempcclient: newcorporateclient});
    }

    handleCancelPrivateClient(){
      this.setState({editingpclient: false, addingpclient: false})
      if(this.props.clients.editingpclient){
        this.props.actions.cancelEditPrivateClient();
      }
    }

    handleCancelCorporateClient(){
      this.setState({editingcclient: false, addingcclient: false})
      if(this.props.clients.editingcclient){
        this.props.actions.cancelEditCorporateClient();
      }
    }

    handleFilterIdPrivateClient(event: any) {
        this.setState({idfilterpclient: event.target.value});
    }

    handleFilterIdCorporateClient(event: any) {
      this.setState({idfiltercclient: event.target.value});
  }

    
  
    /*handleFilterChange(filter: TodoModel.Filter): void {
      this.props.history.push(`#${filter}`);
    }*/
  
    render() {
      //const { todos, actions, filter } = this.props;
      //const activeCount = todos.length - todos.filter((todo) => todo.completed).length;
      //const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos;
      //const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);
      let displayprivateclient = privatedata;
      if(this.state.idfilterpclient) {
        displayprivateclient = privatedata.filter((client) => {
          return (client.ClientID === parseInt(this.state.idfilterpclient, 10));
        })
      }

      let displaycorporateclient = corporatedata;
      if(this.state.idfiltercclient) {
        displaycorporateclient = corporatedata.filter((client) => {
          return (client.ClientID === parseInt(this.state.idfiltercclient, 10));
        })
      }    
      let pelement;
      let celement;
      if(this.state.addingpclient) {
        pelement = (
          <form>
            <label>
            <b>Client Name:</b>
              <input type="text1" value={this.state.temppclient.ClientName} onChange={this.handleChangeClientName} />
            </label>
            <label>
            <b>Phone:</b>
              <input type="text1" value={this.state.temppclient.Phone} onChange={this.handleChangePrivatePhone} />
            </label>
            <label>
            <b>Email:</b>
              <input type="text1" value={this.state.temppclient.Email} onChange={this.handleChangePrivateEmail} />
            </label>
            <label>
            <b>Contact Method:</b>
              <input type="text1" value={this.state.temppclient.ContactMethod} onChange={this.handleChangePrivateContactMethod} />
            </label>
            <input type="button" value="Add" onClick={this.handleAddPrivateClient}/>
            <input type="button" value="Cancel" onClick={this.handleCancelPrivateClient} />
          </form>
        );
      } else if (this.state.addingcclient) {
        celement = (
          <form>
            <label>
            <b>Company Name:</b>
              <input type="text1" value={this.state.tempcclient.VenueName} onChange={this.handleChangeCompanyName} />
            </label>
            <label>
            <b>Contact Person:</b>
              <input type="text1" value={this.state.tempcclient.ContactPerson} onChange={this.handleChangeCorporateContactPerson} />
            </label>
            <label>
            <b>Phone:</b>
              <input type="text1" value={this.state.tempcclient.Phone} onChange={this.handleChangeCorporatePhone} />
            </label>
            <label>
            <b>Email:</b>
              <input type="text1" value={this.state.tempcclient.Email} onChange={this.handleChangeCorporateEmail} />
            </label>
            <label>
            <b>Contact Method:</b>
              <input type="text1" value={this.state.tempcclient.ContactMethod} onChange={this.handleChangeCorporateContactMethod} />
            </label>
            <input type="button" value="Add" onClick={this.handleAddCorporateClient}/>
            <input type="button" value="Cancel" onClick={this.handleCancelCorporateClient} />
          </form>
        );

      } else if (this.props.clients.editingpclient) {
        pelement = (
        <form onSubmit={this.handleUpdatePrivateClient}>
            <label>
            <b>Client Name:</b>
              <input type="text1" value={this.state.temppclient.ClientName} onChange={this.handleChangeClientName} />
            </label>
            <label>
            <b>Phone:</b>
              <input type="text1" value={this.state.temppclient.Phone} onChange={this.handleChangePrivatePhone} />
            </label>
            <label>
            <b>Email:</b>
              <input type="text1" value={this.state.temppclient.Email} onChange={this.handleChangePrivateEmail} />
            </label>
            <label>
            <b>Contact Method:</b>
              <input type="text1" value={this.state.temppclient.ContactMethod} onChange={this.handleChangePrivateContactMethod} />
            </label>
            <input type="submit" value="Submit" />
            <input type="button" value="Cancel" onClick={this.handleCancelPrivateClient}/>
          </form>);
      } else if (this.props.clients.editingcclient) {
        celement = (
        <form onSubmit={this.handleUpdateCorporateClient}>
            <label>
            <b>Company Name:</b>
              <input type="text1" value={this.state.tempcclient.VenueName} onChange={this.handleChangeCompanyName} />
            </label>
            <label>
            <b>Contact Person:</b>
              <input type="text1" value={this.state.tempcclient.ContactPerson} onChange={this.handleChangeCorporateContactPerson} />
            </label>
            <label>
            <b>Phone:</b>
              <input type="text1" value={this.state.tempcclient.Phone} onChange={this.handleChangeCorporatePhone} />
            </label>
            <label>
            <b>Email:</b>
              <input type="text1" value={this.state.tempcclient.Email} onChange={this.handleChangeCorporateEmail} />
            </label>
            <label>
            <b>Contact Method:</b>
              <input type="text1" value={this.state.tempcclient.ContactMethod} onChange={this.handleChangeCorporateContactMethod} />
            </label>
            <input type="submit" value="Submit" />
            <input type="button" value="Cancel" onClick={this.handleCancelCorporateClient}/>
          </form>);
      }
  
      return (
        <div>
          <h1>Manage Clients</h1>
          <SideNav/>
          <div hidden={this.props.clients.showclientdetails}>
          <h2>Private Client</h2>
          <div className={style.wrap}>
          <div className={style.search}>
                        <input type="text" className={style.searchTerm} placeholder="Filter by id" onChange={this.handleFilterIdPrivateClient}/>
                        <button type="submit1" className={style.searchButton}><i className="fa fa-search"></i></button>
                        <i className="fa fa-plus-square" style={{fontSize: '30px', position: 'relative', paddingLeft: '7px', paddingTop: '3px'}} onClick={this.handleOpenAddPrivateClient}></i>
                    </div>
                </div>
          {pelement}
          <PrivateClientList
            privateClients={displayprivateclient}
            disableedit={this.state.addingpclient}
            editPrivateClient={this.props.actions.editPrivateClient}
            loadPrivateClient={this.props.actions.loadPrivateClient}
            showhideclientdetails={this.props.actions.showhideClientDetail}
            selectclient={this.props.actions.selectClient}
            />

            <h2>Corporate Client</h2>
            <div className={style.wrap}>
            <div className={style.search}>
                        <input type="text" className={style.searchTerm} placeholder="Filter by id" onChange={this.handleFilterIdCorporateClient}/>
                        <button type="submit1" className={style.searchButton}><i className="fa fa-search"></i></button>
                        <i className="fa fa-plus-square" style={{fontSize: '30px', position: 'relative', paddingLeft: '7px', paddingTop: '3px'}} onClick={this.handleOpenAddCorporateClient}></i>
                    </div>
                </div>
          {celement}
          <CorporateClientList
            corporateClients={displaycorporateclient}
            disableedit={this.state.addingcclient}
            editCorporateClient={this.props.actions.editCorporateClient}
            loadCorporateClient={this.props.actions.loadCorporateClient}
            showhideclientdetails={this.props.actions.showhideClientDetail}
            selectclient={this.props.actions.selectClient}
            />
          </div>
          <div hidden={!this.props.clients.showclientdetails}>
            <ClientDetail 
            client={this.props.clients.selectedclient}
            type={this.props.clients.selectedclienttype}
            venues={this.props.venues}
            showhideDetails={this.props.actions.showhideClientDetail}
            />
          </div>

        </div>
        
        
      );
    }
  }

