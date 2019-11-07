import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { omit } from 'app/utils';
import { SupplierActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { SupplierModel } from 'app/models';
import SupplierService from '../../../services/SupplierService';
import { SupplierList, SideNav} from 'app/components';
import { relative } from 'path';

export namespace Supplier {
    export interface Props extends RouteComponentProps<void> {
      suppliers: RootState.SupplierState;
      actions: SupplierActions;
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
    SupplierID: 3,
    SupplierName: "sjdhsj",
    SupplierType: "food",
    ContactNum: "32874693",
    EmailAddr: "akjfdsj@jdhfbd"
  }
]

@connect(
    (state: RootState, ownProps): Pick<Supplier.Props, 'suppliers'> => ({
      suppliers: state.suppliers
    }),
    (dispatch: Dispatch): Pick<Supplier.Props, 'actions'> => ({
      actions: bindActionCreators(omit(SupplierActions, 'Type'), dispatch)
    })
  )

export class Supplier extends React.Component<Supplier.Props, Supplier.State> {
    /*static defaultProps: Partial<Supplier.Props> = {
      filter: TodoModel.Filter.SHOW_ALL
    };*/
  
    constructor(props: Supplier.Props, context?: any) {
      super(props, context);
      this.state = { adding: false, editing: false, temp: this.props.suppliers.temp, idfilter: "" };
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeType = this.handleChangeType.bind(this);
      this.handleChangeNum = this.handleChangeNum.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleOpenAdd = this.handleOpenAdd.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleFilterId = this.handleFilterId.bind(this);
      this.handleChangeSupplier = this.handleChangeSupplier.bind(this);
      SupplierService.getSuppliers().then((results) => {
        this.props.actions.loadSupplier(results.data.results);
        //console.log(results);
    });
      
      //this.handleClearCompleted = this.handleClearCompleted.bind(this);
      //this.handleFilterChange = this.handleFilterChange.bind(this);
    }
    handleChangeSupplier(event: any){
      console.log(event.target.value);
    }

    getSnapshotBeforeUpdate(prevProps:Supplier.Props, prevState: Supplier.State){
      if(this.props.suppliers.temp != prevProps.suppliers.temp) {
        this.setState({temp: this.props.suppliers.temp});
        console.log(this.state.temp);
      }
      return prevProps;
    }
  
    handleOpenAdd(): void {
      this.setState({ adding: true , temp: {
        SupplierID: 0,
        SupplierName: "",
        SupplierType: "",
        ContactNum: "",
        EmailAddr: ""
      }});
    }

    handleAdd(){
      this.setState({ adding: false});
      SupplierService.addSupplier(this.state.temp).then(()=>{
        SupplierService.getSuppliers().then((results) => {
            this.props.actions.loadSupplier(results.data.results);
        });
    })
    }

    handleUpdate(){
      console.log('updating');
      this.setState({editing: false});
      SupplierService.updateSupplier(this.state.temp).then(()=>{
        SupplierService.getSuppliers().then((results) => {
            this.props.actions.loadSupplier(results.data.results);
        });
    })
    }

    handleChangeName(event: any) {
      const newsupplier = Object.assign({}, this.state.temp);
      newsupplier.SupplierName = event.target.value;
      this.setState({temp: newsupplier});
    }

    handleChangeType(event: any) {
      const newsupplier = Object.assign({}, this.state.temp);
      newsupplier.SupplierType = event.target.value;
      this.setState({temp: newsupplier});
    }

    handleChangeNum(event: any) {
      const newsupplier = Object.assign({}, this.state.temp);
      newsupplier.ContactNum = event.target.value;
      this.setState({temp: newsupplier});
    }

    handleChangeEmail(event: any) {
      const newsupplier = Object.assign({}, this.state.temp);
      newsupplier.EmailAddr = event.target.value;
      this.setState({temp: newsupplier});
    }

    handleCancel(){
      this.setState({editing: false, adding: false})
      if(this.props.suppliers.editing){
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
      let displaysuppliers = this.props.suppliers.suppliers;
      if(this.state.idfilter) {
        displaysuppliers = this.props.suppliers.suppliers.filter((supplier) => {
          return (supplier.SupplierID === parseInt(this.state.idfilter, 10));
        })
      }
      
      

      let element;
      if(this.state.adding) {
        element = (
          <form>
            <label>
            <b>Supplier Name:</b>
              <input type="text1" value={this.state.temp.SupplierName} onChange={this.handleChangeName} />
            </label>
            <label>
            <b>Supplier Type:</b>
              <input type="text1" value={this.state.temp.SupplierType} onChange={this.handleChangeType} />
            </label>
            <label>
            <b>Contact Number:</b>
              <input type="text1" value={this.state.temp.ContactNum} onChange={this.handleChangeNum} />
            </label>
            <label>
            <b>Email Address:</b>
              <input type="text1" value={this.state.temp.EmailAddr} onChange={this.handleChangeEmail} />
            </label>
            <input type="button" value="Add" onClick={this.handleAdd}/>
            <input type="button" value="Cancel" onClick={this.handleCancel} />
          </form>
        );
      } else if (this.props.suppliers.editing) {
        element = (
        <form onSubmit={this.handleUpdate}>
            <label>
            <b>Supplier Name:</b>
              <input type="text1" value={this.state.temp.SupplierName} onChange={this.handleChangeName} />
            </label>
            <label>
            <b>Supplier Type:</b>
              <input type="text1" value={this.state.temp.SupplierType} onChange={this.handleChangeType} />
            </label>
            <label>
            <b>Contact Number:</b>
              <input type="text1" value={this.state.temp.ContactNum} onChange={this.handleChangeNum} />
            </label>
            <label>
            <b>Email Address:</b>
              <input type="text1" value={this.state.temp.EmailAddr} onChange={this.handleChangeEmail} />
            </label>
            <input type="submit" value="Submit" />
            <input type="button" value="Cancel" onClick={this.handleCancel}/>
          </form>);
      }
  
      return (
        <div>
          <h1>Manage Suppliers</h1>
          <SideNav/>
          <div className={style.wrap}>
                    <div className={style.search}>
                        <input type="text" className={style.searchTerm} placeholder="Filter by id" onChange={this.handleFilterId}/>
                        <button type="submit1" className={style.searchButton}><i className="fa fa-search"></i></button>
                        <i className="fa fa-plus-square" style={{fontSize: '30px', position: 'relative', paddingLeft: '7px', paddingTop: '3px'}} onClick={this.handleOpenAdd}></i>
                    </div>
                </div>
          {element}
          <SupplierList
            suppliers={displaysuppliers}
            editSupplier={this.props.actions.editSupplier}
            loadSupplier={this.props.actions.loadSupplier}
            />
        </div>
      );
    }
  }

