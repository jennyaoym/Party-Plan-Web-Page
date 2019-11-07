import * as React from 'react';
//import * as classNames from 'classnames';
//import * as style from './style.css';
import { FoodItemModel } from 'app/models';
import { DrinkItemModel } from 'app/models';
import { DecorItemModel } from 'app/models';
import { EntertainmentItemModel } from 'app/models';
import { ItemActions } from 'app/actions';
//import { TodoTextInput } from '../TodoTextInput';
import ItemService from '../../../services/ItemService';


//change on save to onsearch

export namespace FoodItem {
    export interface Props {
        food: FoodItemModel;
        loadFood: typeof ItemActions.loadFood;
        editFood: typeof ItemActions.editFood;
    }
}

export namespace DrinkItem {
    export interface Props {
        drink: DrinkItemModel;
        loadDrink: typeof ItemActions.loadDrink;
        editDrink: typeof ItemActions.editDrink;
    }
}

export namespace DecorItem {
    export interface Props {
        decor: DecorItemModel;
        loadDecor: typeof ItemActions.loadDecor;
        editDecor: typeof ItemActions.editDecor;
    }
}

export namespace EntertainmentItem {
    export interface Props {
        entertainment: EntertainmentItemModel;
        loadEntertainment: typeof ItemActions.loadEntertainment;
        editEntertainment: typeof ItemActions.editEntertainment;
    }
}

// Food
export class FoodItem extends React.Component<FoodItem.Props> {
    constructor(props: FoodItem.Props, context?: any) {
        super(props, context);

        this.handleUpdateFood = this.handleUpdateFood.bind(this);
        this.handleDeleteFood = this.handleDeleteFood.bind(this);
    }
    

    /*handleDoubleClick() {
        this.setState({ editing: true });
    }*/

    handleDeleteFood() {
        ItemService.deleteFood(this.props.food.ItemID).then(()=>{
            ItemService.getFoodItems().then((results) => {
                this.props.loadFood(results.data.results);
            });
        })
    }

    handleUpdateFood(){
        this.props.editFood(this.props.food);
    }

    render() {
        return (
            <tr>
                <td>{this.props.food.ItemID}</td>
                <td>{this.props.food.ItemName}</td>
                <td>{this.props.food.UnitPrice}</td>
                <td>{this.props.food.SupplierID}</td>
                <td>{this.props.food.ServingTemp}</td>
                <td>{this.props.food.IsVegetarian}</td>
                <td>{this.props.food.SpicyLevel}</td>
                <td><i className="fa fa-trash-o" onClick={this.handleDeleteFood}></i></td>
                <td><i className="fa fa-pencil" onClick={this.handleUpdateFood}></i></td>
            </tr>
            
        );

    }
}

// Drink
    export class DrinkItem extends React.Component<DrinkItem.Props> {
        constructor(props: DrinkItem.Props, context?: any) {
            super(props, context);
    
            this.handleUpdateDrink = this.handleUpdateDrink.bind(this);
            this.handleDeleteDrink = this.handleDeleteDrink.bind(this);
        }
        
    
        /*handleDoubleClick() {
            this.setState({ editing: true });
        }*/
    
        handleDeleteDrink() {
            ItemService.deleteDrink(this.props.drink.ItemID).then(()=>{
                ItemService.getDrinkItems().then((results) => {
                    this.props.loadDrink(results.data.results);
                });
            })
        }
    
        handleUpdateDrink(){
            this.props.editDrink(this.props.drink);
        }

    render() {
        return (
            <tr>
                <td>{this.props.drink.ItemID}</td>
                <td>{this.props.drink.ItemName}</td>
                <td>{this.props.drink.UnitPrice}</td>
                <td>{this.props.drink.SupplierID}</td>
                <td>{this.props.drink.ServingTemp}</td>
                <td>{this.props.drink.AlcoholLevel}</td>
                <td><i className="fa fa-trash-o" onClick={this.handleDeleteDrink}></i></td>
                <td><i className="fa fa-pencil" onClick={this.handleUpdateDrink}></i></td>
            </tr>
            
        );

    }
}

// Decor
export class DecorItem extends React.Component<DecorItem.Props> {
    constructor(props: DecorItem.Props, context?: any) {
        super(props, context);

        this.handleUpdateDecor = this.handleUpdateDecor.bind(this);
        this.handleDeleteDecor = this.handleDeleteDecor.bind(this);
    }
    

    /*handleDoubleClick() {
        this.setState({ editing: true });
    }*/

    handleDeleteDecor() {
        ItemService.deleteDecorItem(this.props.decor.ItemID).then(()=>{
            ItemService.getDecorItems().then((results) => {
                this.props.loadDecor(results.data.results);
            });
        })
    }

    handleUpdateDecor(){
        this.props.editDecor(this.props.decor);
    }

render() {
    return (
        <tr>
            <td>{this.props.decor.ItemID}</td>
            <td>{this.props.decor.ItemName}</td>
            <td>{this.props.decor.UnitPrice}</td>
            <td>{this.props.decor.SupplierID}</td>
            <td>{this.props.decor.DecorType}</td>
            <td><i className="fa fa-trash-o" onClick={this.handleDeleteDecor}></i></td>
            <td><i className="fa fa-pencil" onClick={this.handleUpdateDecor}></i></td>
        </tr>
        
    );

}
}

// Entertainment
export class EntertainmentItem extends React.Component<EntertainmentItem.Props> {
    constructor(props: EntertainmentItem.Props, context?: any) {
        super(props, context);

        this.handleUpdateEntertainment = this.handleUpdateEntertainment.bind(this);
        this.handleDeleteEntertainment = this.handleDeleteEntertainment.bind(this);
    }
    

    /*handleDoubleClick() {
        this.setState({ editing: true });
    }*/

    handleDeleteEntertainment() {
        ItemService.DeleteEntertainmentMusicItem(this.props.entertainment.ItemID).then(()=>{
            ItemService.getEntertainmentItem().then((results) => {
                this.props.loadEntertainment(results.data.results);
            });
        })
    }

    handleUpdateEntertainment(){
        this.props.editEntertainment(this.props.entertainment);
    }

render() {
    return (
        <tr>
            <td>{this.props.entertainment.ItemID}</td>
            <td>{this.props.entertainment.ItemName}</td>
            <td>{this.props.entertainment.UnitPrice}</td>
            <td>{this.props.entertainment.SupplierID}</td>
            <td>{this.props.entertainment.EntertainmentType}</td>
            <td><i className="fa fa-trash-o" onClick={this.handleDeleteEntertainment}></i></td>
            <td><i className="fa fa-pencil" onClick={this.handleUpdateEntertainment}></i></td>
        </tr>
        
    );

}
}