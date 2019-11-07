import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { omit } from 'app/utils';
import { ItemActions } from 'app/actions';
import { RootState } from 'app/reducers';
import ItemService from '../../../services/ItemService';
import { FoodList, DrinkList, DecorList, EntertainmentList, SideNav} from 'app/components';

export namespace Item {
    export interface Props extends RouteComponentProps<void> {
      items: RootState.ItemState;
      actions: ItemActions;
    }

    export interface State {
      addingfood: boolean;
      editingfood: boolean;
      tempfood: any;
      idfilterfood: string;

      addingdrink: boolean;
      editingdrink: boolean;
      tempdrink: any;
      idfilterdrink: string;
      
      addingdecor: boolean;
      editingdecor: boolean;
      tempdecor: any;
      idfilterdecor: string;

      addingenter: boolean;
      editingenter: boolean;
      tempenter: any;
      idfilterenter: string;

  }
}

const fooddata = [
  {
    ItemID: 0,
    ItemName : "pie", 
    UnitPrice: 3, 
    SupplierID: 77,
    ServingTemp: "20", 
    IsVegetarian: 1,
    SpicyLevel: 0
  }
]

const drinkdata = [
  {
    ItemID: 4,
    ItemName : "water", 
    UnitPrice: 1, 
    SupplierID: 24,
    ServingTemp: "10", 
    AlcoholLevel: 0
  }
]

const decordata = [
  {
    ItemID: 18,
    ItemName : "balloon", 
    UnitPrice: 0.3, 
    SupplierID: 12,
    DecorType: "balloon"
  }
]

const entertainmentdata = [
  {
    ItemID: 9,
    ItemName : "piano", 
    UnitPrice: 30, 
    SupplierID: 2,
    EntertainmentType: "music"
  }
]

@connect(
    (state: RootState, ownProps): Pick<Item.Props, 'items'> => ({
      items: state.itemstate
    }), 

    (dispatch: Dispatch): Pick<Item.Props, 'actions'> => ({
      actions: bindActionCreators(omit(ItemActions, 'Type'), dispatch)
    })
  )


export class Item extends React.Component<Item.Props, Item.State> {
    /*static defaultProps: Partial<Venue.Props> = {
      filter: TodoModel.Filter.SHOW_ALL
    };*/
  
    constructor(props: Item.Props, context?: any) {
      
      super(props, context);
      console.log(this.props);
      this.state = { addingfood: false, addingdrink: false, addingdecor: false, addingenter: false, editingfood: false, editingdrink: false, editingdecor: false, editingenter: false, tempfood: this.props.items.tempfood, tempdrink: this.props.items.tempdrink, tempdecor: this.props.items.tempdecor, tempenter: this.props.items.tempenter, idfilterfood: "" , idfilterdrink: "", idfilterdecor: "" , idfilterenter: ""};
      this.handleOpenAddFood = this.handleOpenAddFood.bind(this);
      this.handleOpenAddDrink = this.handleOpenAddDrink.bind(this);
      this.handleOpenAddDecor = this.handleOpenAddDecor.bind(this);
      this.handleOpenAddEntertainment = this.handleOpenAddEntertainment.bind(this);

      this.handleAddFood = this.handleAddFood.bind(this);
      this.handleAddDrink = this.handleAddDrink.bind(this);
      this.handleAddDecor = this.handleAddDecor.bind(this);
      this.handleAddEntertainment = this.handleAddEntertainment.bind(this);

      this.handleUpdateFood = this.handleUpdateFood.bind(this);
      this.handleUpdateDrink = this.handleUpdateDrink.bind(this);
      this.handleUpdateDecor = this.handleUpdateDecor.bind(this);
      this.handleUpdateEntertainment = this.handleUpdateEntertainment.bind(this);

      this.handleChangeFoodName = this.handleChangeFoodName.bind(this);
      this.handleChangeFoodPrice = this.handleChangeFoodPrice.bind(this);
      this.handleChangeFoodSupplier = this.handleChangeFoodSupplier.bind(this);
      this.handleChangeFoodTemp = this.handleChangeFoodTemp.bind(this);
      this.handleChangeFoodIsVege = this.handleChangeFoodIsVege.bind(this);
      this.handleChangeFoodSpicyLevel = this.handleChangeFoodSpicyLevel.bind(this);
      this.handleChangeDrinkName = this.handleChangeDrinkName.bind(this);
      this.handleChangeDrinkPrice = this.handleChangeDrinkPrice.bind(this);
      this.handleChangeDrinkSupplier = this.handleChangeDrinkSupplier.bind(this);
      this.handleChangeDrinkTemp = this.handleChangeDrinkTemp.bind(this);
      this.handleChangeDrinkAlcoholLevel = this.handleChangeDrinkAlcoholLevel.bind(this);
      this.handleChangeDecorName = this.handleChangeDecorName.bind(this);
      this.handleChangeDecorPrice = this.handleChangeDecorPrice.bind(this);
      this.handleChangeDecorSupplier = this.handleChangeDecorSupplier.bind(this);
      this.handleChangeDecorType = this.handleChangeDecorType.bind(this);
      this.handleChangeEnterName = this.handleChangeEnterName.bind(this);
      this.handleChangeEnterPrice = this.handleChangeEnterPrice.bind(this);
      this.handleChangeEnterSupplier = this.handleChangeEnterSupplier.bind(this);
      this.handleChangeEnterType = this.handleChangeEnterType.bind(this);

      this.handleCancelFood = this.handleCancelFood.bind(this);
      this.handleCancelDrink = this.handleCancelDrink.bind(this);
      this.handleCancelDecor = this.handleCancelDecor.bind(this);
      this.handleCancelEnter = this.handleCancelEnter.bind(this);

      this.handleFilterIdFood = this.handleFilterIdFood.bind(this);
      this.handleFilterIdDrink = this.handleFilterIdDrink.bind(this);
      this.handleFilterIdDecor = this.handleFilterIdDecor.bind(this);
      this.handleFilterIdEnter = this.handleFilterIdEnter.bind(this);

      ItemService.getFoodItems().then((results) => {
        this.props.actions.loadFood(results.data.results);
        //console.log(results);
    });
      ItemService.getDrinkItems().then((results) => {
      this.props.actions.loadDrink(results.data.results);
      //console.log(results);
   });
      ItemService.getDecorItems().then((results) => {
      this.props.actions.loadDecor(results.data.results);
      //console.log(results);
    });
      ItemService.getEntertainmentItem().then((results) => {
      this.props.actions.loadEntertainment(results.data.results);
      //console.log(results);
    });
    }

    getSnapshotBeforeUpdate(prevProps:Item.Props, prevState: Item.State){
      if(this.props.items.tempfood != prevProps.items.tempfood) {
        this.setState({tempfood: this.props.items.tempfood});
        console.log(this.state.tempfood);
      }
      if(this.props.items.tempdrink != prevProps.items.tempdrink) {
        this.setState({tempdrink: this.props.items.tempdrink});
        console.log(this.state.tempdrink);
      }
      if(this.props.items.tempdecor != prevProps.items.tempdecor) {
        this.setState({tempdecor: this.props.items.tempdecor});
        console.log(this.state.tempdecor);
      }
      if(this.props.items.tempenter != prevProps.items.tempenter) {
        this.setState({tempenter: this.props.items.tempenter});
        console.log(this.state.tempenter);
      }
      return prevProps;
    }
  

    handleOpenAddFood(): void {
      this.setState({ addingfood: true , tempfood: {
        ItemID: 0,
        ItemName : "", 
        UnitPrice: 0, 
        SupplierID: 0,
        ServingTemp: "", 
        IsVegetarian: 0,
        SpicyLevel: 0
      }});
    }

    handleOpenAddDrink(): void {
      this.setState({ addingdrink: true , tempdrink: {
        ItemID: 0,
        ItemName : "", 
        UnitPrice: 0, 
        SupplierID: 0,
        ServingTemp: "", 
        AlcoholLevel: 0
      }});
    }

    handleOpenAddDecor(): void {
      this.setState({ addingdecor: true , tempdecor: {
        ItemID: 0,
        ItemName : "", 
        UnitPrice: 0, 
        SupplierID: 0,
        DecorType: ""
      }});
    }

    handleOpenAddEntertainment(): void {
      this.setState({ addingenter: true , tempenter: {
        ItemID: 0,
        ItemName : "", 
        UnitPrice: 0, 
        SupplierID: 0,
        EntertainmentType: ""
      }});
    }


    handleAddFood(){
      this.setState({ addingfood: false});
      ItemService.addFood(this.state.tempfood).then(()=>{
        ItemService.getFoodItems().then((results) => {
            this.props.actions.loadFood(results.data.results);
        });
    })
    }

    handleAddDrink(){
      this.setState({ addingdrink: false});
      ItemService.addDrink(this.state.tempdrink).then(()=>{
        ItemService.getDrinkItems().then((results) => {
            this.props.actions.loadDrink(results.data.results);
        });
    })
    }

    handleAddDecor(){
      this.setState({ addingdecor: false});
      ItemService.addDecorItem(this.state.tempdecor).then(()=>{
        ItemService.getDecorItems().then((results) => {
            this.props.actions.loadDecor(results.data.results);
        });
    })
    }

    handleAddEntertainment(){
      this.setState({ addingenter: false});
      ItemService.addEntertainmentMusicItem(this.state.tempenter).then(()=>{
        ItemService.getEntertainmentItem().then((results) => {
            this.props.actions.loadEntertainment(results.data.results);
        });
    })
    }


    handleUpdateFood(){
      console.log('updating');
      this.setState({editingfood: false});
      ItemService.updateFood(this.state.tempfood).then(()=>{
        ItemService.getFoodItems().then((results) => {
            this.props.actions.loadFood(results.data.results);
        });
    })
    }

    handleUpdateDrink(){
      console.log('updating');
      this.setState({editingdrink: false});
      ItemService.updateDrink(this.state.tempdrink).then(()=>{
        ItemService.getDrinkItems().then((results) => {
            this.props.actions.loadDrink(results.data.results);
        });
    })
    }

    handleUpdateDecor(){
      console.log('updating');
      this.setState({editingdecor: false});
      ItemService.updateDecorItem(this.state.tempdecor).then(()=>{
        ItemService.getDecorItems().then((results) => {
            this.props.actions.loadDecor(results.data.results);
        });
    })
    }

    handleUpdateEntertainment(){
      console.log('updating');
      this.setState({editingenter: false});
      ItemService.updateEntertainmentMusicItem(this.state.tempenter).then(()=>{
        ItemService.getEntertainmentItem().then((results) => {
            this.props.actions.loadEntertainment(results.data.results);
        });
    })
    }

    handleChangeFoodName(event: any) {
      const newfood = Object.assign({}, this.state.tempfood);
      newfood.ItemName = event.target.value;
      this.setState({tempfood: newfood});
    }

    handleChangeFoodPrice(event: any) {
      const newfood = Object.assign({}, this.state.tempfood);
      newfood.UnitPrice = event.target.value;
      this.setState({tempfood: newfood});
    }

    handleChangeFoodSupplier(event: any) {
      const newfood = Object.assign({}, this.state.tempfood);
      newfood.SupplierID = event.target.value;
      this.setState({tempfood: newfood});
    }

    handleChangeFoodTemp(event: any) {
      const newfood = Object.assign({}, this.state.tempfood);
      newfood.ServingTemp = event.target.value;
      this.setState({tempfood: newfood});
    }

    handleChangeFoodIsVege(event: any) {
      const newfood = Object.assign({}, this.state.tempfood);
      newfood.IsVegetarian = event.target.value;
      this.setState({tempfood: newfood});
    }

    handleChangeFoodSpicyLevel(event: any) {
      const newfood = Object.assign({}, this.state.tempfood);
      newfood.SpicyLevel = event.target.value;
      this.setState({tempfood: newfood});
    }


    handleChangeDrinkName(event: any) {
      const newdrink = Object.assign({}, this.state.tempdrink);
      newdrink.ItemName = event.target.value;
      this.setState({tempdrink: newdrink});
    }

    handleChangeDrinkPrice(event: any) {
      const newdrink = Object.assign({}, this.state.tempdrink);
      newdrink.UnitPrice = event.target.value;
      this.setState({tempdrink: newdrink});
    }

    handleChangeDrinkSupplier(event: any) {
      const newdrink = Object.assign({}, this.state.tempdrink);
      newdrink.SupplierID = event.target.value;
      this.setState({tempdrink: newdrink});
    }

    handleChangeDrinkTemp(event: any) {
      const newdrink = Object.assign({}, this.state.tempdrink);
      newdrink.ServingTemp = event.target.value;
      this.setState({tempdrink: newdrink});
    }

    handleChangeDrinkAlcoholLevel(event: any) {
      const newdrink = Object.assign({}, this.state.tempdrink);
      newdrink.AlcoholLevel = event.target.value;
      this.setState({tempdrink: newdrink});
    }

    handleChangeDecorName(event: any) {
      const newdecor = Object.assign({}, this.state.tempdecor);
      newdecor.ItemName = event.target.value;
      this.setState({tempdecor: newdecor});
    }

    handleChangeDecorPrice(event: any) {
      const newdecor = Object.assign({}, this.state.tempdecor);
      newdecor.UnitPrice = event.target.value;
      this.setState({tempdecor: newdecor});
    }

    handleChangeDecorSupplier(event: any) {
      const newdecor = Object.assign({}, this.state.tempdecor);
      newdecor.SupplierID = event.target.value;
      this.setState({tempdecor: newdecor});
    }

    handleChangeDecorType(event: any) {
      const newdecor = Object.assign({}, this.state.tempdecor);
      newdecor.DecorType = event.target.value;
      this.setState({tempdecor: newdecor});
    }

    handleChangeEnterName(event: any) {
      const newenter = Object.assign({}, this.state.tempenter);
      newenter.ItemName = event.target.value;
      this.setState({tempenter: newenter});
    }

    handleChangeEnterPrice(event: any) {
      const newenter = Object.assign({}, this.state.tempenter);
      newenter.UnitPrice = event.target.value;
      this.setState({tempenter: newenter});
    }

    handleChangeEnterSupplier(event: any) {
      const newenter = Object.assign({}, this.state.tempenter);
      newenter.SupplierID = event.target.value;
      this.setState({tempenter: newenter});
    }

    handleChangeEnterType(event: any) {
      const newenter = Object.assign({}, this.state.tempenter);
      newenter.EntertainmentType = event.target.value;
      this.setState({tempenter: newenter});
    }


    handleCancelFood(){
      this.setState({editingfood: false, addingfood: false})
      if(this.props.items.editingfood){
        this.props.actions.cancelEditFood();
      }
    }

    handleCancelDrink(){
      this.setState({editingdrink: false, addingdrink: false})
      if(this.props.items.editingdrink){
        this.props.actions.cancelEditDrink();
      }
    }

    handleCancelDecor(){
      this.setState({editingdecor: false, addingdecor: false})
      if(this.props.items.editingdecor){
        this.props.actions.cancelEditDecor();
      }
    }

    handleCancelEnter(){
      this.setState({editingenter: false, addingenter: false})
      if(this.props.items.editingenter){
        this.props.actions.cancelEditEntertainment();
      }
    }

    handleFilterIdFood(event: any) {
        this.setState({idfilterfood: event.target.value});
    }
    handleFilterIdDrink(event: any) {
      this.setState({idfilterdrink: event.target.value});
   }
   handleFilterIdDecor(event: any) {
    this.setState({idfilterdecor: event.target.value});
   }
   handleFilterIdEnter(event: any) {
    this.setState({idfilterenter: event.target.value});
   }


    render() {
      //const { todos, actions, filter } = this.props;
      //const activeCount = todos.length - todos.filter((todo) => todo.completed).length;
      //const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos;
      //const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);
      let displayfood = fooddata;
      if(this.state.idfilterfood) {
        displayfood = fooddata.filter((items) => {
          return (items.ItemID === parseInt(this.state.idfilterfood, 10));
        })
      }

      let displaydrink = drinkdata;
      if(this.state.idfilterdrink) {
        displaydrink = drinkdata.filter((items) => {
          return (items.ItemID === parseInt(this.state.idfilterdrink, 10));
        })
      }

      let displaydecor = decordata;
      if(this.state.idfilterdecor) {
        displaydecor = decordata.filter((items) => {
          return (items.ItemID === parseInt(this.state.idfilterdecor, 10));
        })
      }

      let displayentertainment = entertainmentdata;
      if(this.state.idfilterenter) {
        displayentertainment = entertainmentdata.filter((items) => {
          return (items.ItemID === parseInt(this.state.idfilterenter, 10));
        })
      }
      
      let foodelement;
      let drinkelement;
      let decorelement;
      let enterelement;
      if(this.state.addingfood) {
        foodelement = (
          <form>
            <label>
            <b>Food Name:</b>
              <input type="text1" value={this.state.tempfood.ItemName} onChange={this.handleChangeFoodName} />
            </label>
            <label>
            <b>Unit Price:</b>
              <input type="text1" value={this.state.tempfood.UnitPrice} onChange={this.handleChangeFoodPrice} />
            </label>
            <label>
            <b>SupplierID:</b>
              <input type="text1" value={this.state.tempfood.SupplierID} onChange={this.handleChangeFoodSupplier} />
            </label>
            <label>
            <b>Serving Temperature:</b>
              <input type="text1" value={this.state.tempfood.ServingTemp} onChange={this.handleChangeFoodTemp} />
            </label>
            <label>
            <b>IsVegetarian:</b>
              <input type="text1" value={this.state.tempfood.IsVegetarian} onChange={this.handleChangeFoodIsVege} />
            </label>
            <label>
            <b>Spicy Level:</b>
              <input type="text1" value={this.state.tempfood.SpicyLevel} onChange={this.handleChangeFoodSpicyLevel} />
            </label>
            <input type="button" value="Add" onClick={this.handleAddFood}/>
            <input type="button" value="Cancel" onClick={this.handleCancelFood} />
          </form>
        );
      } else if (this.state.addingdrink) {
        drinkelement = (
          <form>
            <label>
              <b>Drink Name:</b>
              <input type="text1" value={this.state.tempdrink.ItemName} onChange={this.handleChangeDrinkName} />
            </label>
            <label>
            <b>Unit Price:</b>
              <input type="text1" value={this.state.tempdrink.UnitPrice} onChange={this.handleChangeDrinkPrice} />
            </label>
            <label>
            <b>SupplierID:</b>
              <input type="text1" value={this.state.tempdrink.SupplierID} onChange={this.handleChangeDrinkSupplier} />
            </label>
            <label>
            <b>Serving Temperature:</b>
              <input type="text1" value={this.state.tempdrink.ServingTemp} onChange={this.handleChangeDrinkTemp} />
            </label>
            <label>
            <b>Alcohol Level:</b>
              <input type="text1" value={this.state.tempdrink.AlcoholLevel} onChange={this.handleChangeDrinkAlcoholLevel} />
            </label>
            <input type="button" value="Add" onClick={this.handleAddDrink}/>
            <input type="button" value="Cancel" onClick={this.handleCancelDrink} />
          </form>
        );

      } else if (this.state.addingdecor) {
        decorelement = (
          <form>
            <label>
              <b>Decor Name:</b>
              <input type="text1" value={this.state.tempdecor.ItemName} onChange={this.handleChangeDecorName} />
            </label>
            <label>
            <b>Unit Price:</b>
              <input type="text1" value={this.state.tempdecor.UnitPrice} onChange={this.handleChangeDecorPrice} />
            </label>
            <label>
            <b>SupplierID:</b>
              <input type="text1" value={this.state.tempdecor.SupplierID} onChange={this.handleChangeDecorSupplier} />
            </label>
            <label>
            <b>Decor Type:</b>
              <input type="text1" value={this.state.tempdecor.DecorType} onChange={this.handleChangeDecorType} />
            </label>
            <input type="button" value="Add" onClick={this.handleAddDecor}/>
            <input type="button" value="Cancel" onClick={this.handleCancelDecor} />
          </form>
        );

      } else if (this.state.addingenter) {
        enterelement = (
          <form>
            <label>
              <b>Entertainment Name:</b>
              <input type="text1" value={this.state.tempenter.ItemName} onChange={this.handleChangeEnterName} />
            </label>
            <label>
            <b>Unit Price:</b>
              <input type="text1" value={this.state.tempenter.UnitPrice} onChange={this.handleChangeEnterPrice} />
            </label>
            <label>
            <b>SupplierID:</b>
              <input type="text1" value={this.state.tempenter.SupplierID} onChange={this.handleChangeEnterSupplier} />
            </label>
            <label>
            <b>Entertainment Type:</b>
              <input type="text1" value={this.state.tempenter.EntertainmentType} onChange={this.handleChangeEnterType} />
            </label>
            <input type="button" value="Add" onClick={this.handleAddEntertainment}/>
            <input type="button" value="Cancel" onClick={this.handleCancelEnter} />
          </form>
        );

      } else if (this.props.items.editingfood) {
        foodelement = (
        <form onSubmit={this.handleUpdateFood}>
            <label>
              <b>Food Name:</b>
              <input type="text1" value={this.state.tempfood.ItemName} onChange={this.handleChangeFoodName} />
            </label>
            <label>
            <b>Unit Price:</b>
              <input type="text1" value={this.state.tempfood.UnitPrice} onChange={this.handleChangeFoodPrice} />
            </label>
            <label>
            <b>SupplierID:</b>
              <input type="text1" value={this.state.tempfood.SupplierID} onChange={this.handleChangeFoodSupplier} />
            </label>
            <label>
            <b>Serving Temperature:</b>
              <input type="text1" value={this.state.tempfood.ServingTemp} onChange={this.handleChangeFoodTemp} />
            </label>
            <label>
            <b>IsVegetarian:</b>
              <input type="text1" value={this.state.tempfood.IsVegetarian} onChange={this.handleChangeFoodIsVege} />
            </label>
            <label>
            <b>Spicy Level:</b>
              <input type="text1" value={this.state.tempfood.SpicyLevel} onChange={this.handleChangeFoodSpicyLevel} />
            </label>
            <input type="submit" value="Submit" />
            <input type="button" value="Cancel" onClick={this.handleCancelFood}/>
          </form>);
      } else if (this.props.items.editingdrink) {
        drinkelement = (
        <form onSubmit={this.handleUpdateDrink}>
            <label>
            <b>Drink Name:</b>
              <input type="text1" value={this.state.tempdrink.ItemName} onChange={this.handleChangeDrinkName} />
            </label>
            <label>
            <b>Unit Price:</b>
              <input type="text1" value={this.state.tempdrink.UnitPrice} onChange={this.handleChangeDrinkPrice} />
            </label>
            <label>
            <b>SupplierID:</b>
              <input type="text1" value={this.state.tempdrink.SupplierID} onChange={this.handleChangeDrinkSupplier} />
            </label>
            <label>
            <b>Serving Temperature:</b>
              <input type="text1" value={this.state.tempdrink.ServingTemp} onChange={this.handleChangeDrinkTemp} />
            </label>
            <label>
            <b>Alcohol Level:</b>
              <input type="text1" value={this.state.tempdrink.AlcoholLevel} onChange={this.handleChangeDrinkAlcoholLevel} />
            </label>
            <input type="submit" value="Submit" />
            <input type="button" value="Cancel" onClick={this.handleCancelDrink}/>
          </form>);
      } else if (this.props.items.editingdecor) {
        decorelement = (
        <form onSubmit={this.handleUpdateDecor}>
            <label>
            <b>Decor Name:</b>
              <input type="text1" value={this.state.tempdecor.ItemName} onChange={this.handleChangeDecorName} />
            </label>
            <label>
            <b>Unit Price:</b>
              <input type="text1" value={this.state.tempdecor.UnitPrice} onChange={this.handleChangeDecorPrice} />
            </label>
            <label>
            <b>SupplierID:</b>
              <input type="text1" value={this.state.tempdecor.SupplierID} onChange={this.handleChangeDecorSupplier} />
            </label>
            <label>
            <b>Decor Type:</b>
              <input type="text1" value={this.state.tempdecor.DecorType} onChange={this.handleChangeDecorType} />
            </label>
            <input type="submit" value="Submit" />
            <input type="button" value="Cancel" onClick={this.handleCancelDecor}/>
          </form>);
      } else if (this.props.items.editingenter) {
        enterelement = (
        <form onSubmit={this.handleUpdateEntertainment}>
            <label>
            <b>Entertainment Name:</b>
              <input type="text1" value={this.state.tempenter.ItemName} onChange={this.handleChangeEnterName} />
            </label>
            <label>
            <b>Unit Price:</b>
              <input type="text1" value={this.state.tempenter.UnitPrice} onChange={this.handleChangeEnterPrice} />
            </label>
            <label>
            <b>SupplierID:</b>
              <input type="text1" value={this.state.tempenter.SupplierID} onChange={this.handleChangeEnterSupplier} />
            </label>
            <label>
            <b>Entertainment Type:</b>
              <input type="text1" value={this.state.tempenter.EntertainmentType} onChange={this.handleChangeEnterType} />
            </label>
            <input type="submit" value="Submit" />
            <input type="button" value="Cancel" onClick={this.handleCancelEnter}/>
          </form>);
      }
  
      return (
        <div>
          <h1>Manage Items</h1>
          <SideNav/>
          <h2>Food</h2>
          <div className={style.wrap}>
          <div className={style.search}>
                        <input type="text" className={style.searchTerm} placeholder="Filter by id" onChange={this.handleFilterIdFood}/>
                        <button type="submit1" className={style.searchButton}><i className="fa fa-search"></i></button>
                        <i className="fa fa-plus-square" style={{fontSize: '30px', position: 'relative', paddingLeft: '7px', paddingTop: '3px'}} onClick={this.handleOpenAddFood}></i>
                    </div>
                </div>
          {foodelement}
          <FoodList
            food={displayfood}
            editFood={this.props.actions.editFood}
            loadFood={this.props.actions.loadFood}
            />

          <h2>Drink</h2>
          <div className={style.wrap}>
          <div className={style.search}>
                        <input type="text" className={style.searchTerm} placeholder="Filter by id" onChange={this.handleFilterIdDrink}/>
                        <button type="submit1" className={style.searchButton}><i className="fa fa-search"></i></button>
                        <i className="fa fa-plus-square" style={{fontSize: '30px', position: 'relative', paddingLeft: '7px', paddingTop: '3px'}} onClick={this.handleOpenAddDrink}></i>
                    </div>
                </div>
          {drinkelement}
          <DrinkList
            drink={displaydrink}
            editDrink={this.props.actions.editDrink}
            loadDrink={this.props.actions.loadDrink}
            />

          <h2>Decor</h2>
          <div className={style.wrap}>
          <div className={style.search}>
                        <input type="text" className={style.searchTerm} placeholder="Filter by id" onChange={this.handleFilterIdDecor}/>
                        <button type="submit1" className={style.searchButton}><i className="fa fa-search"></i></button>
                        <i className="fa fa-plus-square" style={{fontSize: '30px', position: 'relative', paddingLeft: '7px', paddingTop: '3px'}} onClick={this.handleOpenAddDecor}></i>
                    </div>
                </div>
          {decorelement}
          <DecorList
            decor={displaydecor}
            editDecor={this.props.actions.editDecor}
            loadDecor={this.props.actions.loadDecor}
            />

          <h2>Entertainment</h2>
          <div className={style.wrap}>
          <div className={style.search}>
                        <input type="text" className={style.searchTerm} placeholder="Filter by id" onChange={this.handleFilterIdEnter}/>
                        <button type="submit1" className={style.searchButton}><i className="fa fa-search"></i></button>
                        <i className="fa fa-plus-square" style={{fontSize: '30px', position: 'relative', paddingLeft: '7px', paddingTop: '3px'}} onClick={this.handleOpenAddEntertainment}></i>
                    </div>
                </div>
          {enterelement}
          <EntertainmentList
            entertainment={displayentertainment}
            editEntertainment={this.props.actions.editEntertainment}
            loadEntertainment={this.props.actions.loadEntertainment}
            />
        </div>
        
      );
    }
  }

