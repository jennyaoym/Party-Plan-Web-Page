import * as React from 'react';
//import * as classNames from 'classnames';
//import * as style from './style.css';
import { FoodItemModel, DrinkItemModel, DecorItemModel, EntertainmentItemModel } from 'app/models';
import { ItemActions } from 'app/actions';
//import { connect } from 'react-redux';
//import { RootState } from 'app/reducers';
//import { TodoTextInput } from '../TodoTextInput';
import { FoodItem, DrinkItem, DecorItem, EntertainmentItem } from '../ItemItem';


//change on save to onsearch

export namespace FoodList {
    export interface Props {
        food: FoodItemModel[];
        editFood: typeof ItemActions.editFood;
        loadFood: typeof ItemActions.loadFood;
    }

    export interface State {
        editing: boolean;
    }
}

export namespace DrinkList {
    export interface Props {
        drink: DrinkItemModel[];
        editDrink: typeof ItemActions.editDrink;
        loadDrink: typeof ItemActions.loadDrink;
    }

    export interface State {
        editing: boolean;
    }
}

export namespace DecorList {
    export interface Props {
        decor: DecorItemModel[];
        editDecor: typeof ItemActions.editDecor;
        loadDecor: typeof ItemActions.loadDecor;
    }

    export interface State {
        editing: boolean;
    }
}

export namespace EntertainmentList {
    export interface Props {
        entertainment: EntertainmentItemModel[];
        editEntertainment: typeof ItemActions.editEntertainment;
        loadEntertainment: typeof ItemActions.loadEntertainment;
    }

    export interface State {
        editing: boolean;
    }
}

// Food
export class FoodList extends React.Component<FoodList.Props, FoodList.State> {
    constructor(props: FoodList.Props, context?: any) {
        super(props, context);
        this.state = { editing: false };
    }

    handleDoubleClick() {
        this.setState({ editing: true });
    }

    render() {

        return (
            <div>
                <div className="table">
                    <table>
                        <tr>
                            <th>ItemID</th>
                            <th>Item Name</th>
                            <th>Unit Price</th>
                            <th>SupplierID</th>
                            <th>Serving Temperature</th>
                            <th>IsVegetarian</th>
                            <th>Spicy Level</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {this.props.food.map((food) => (
                            <FoodItem
                                food={food}
                                loadFood={this.props.loadFood}
                                editFood={this.props.editFood}
                            />
                        ))}
                    </table>
                </div>
            </div>
        );

    }
}

// Drink

export class DrinkList extends React.Component<DrinkList.Props, DrinkList.State> {
    constructor(props: DrinkList.Props, context?: any) {
        super(props, context);
        this.state = { editing: false };
    }

    handleDoubleClick() {
        this.setState({ editing: true });
    }

    render() {

        return (
            <div>
                <div className="table">
                    <table>
                        <tr>
                            <th>ItemID</th>
                            <th>Item Name</th>
                            <th>Unit Price</th>
                            <th>SupplierID</th>
                            <th>Serving Temperature</th>
                            <th>Alcohol Level</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {this.props.drink.map((drink) => (
                            <DrinkItem
                                drink={drink}
                                loadDrink={this.props.loadDrink}
                                editDrink={this.props.editDrink}
                            />
                        ))}
                    </table>
                </div>
            </div>
        );

    }
}

// Decor
export class DecorList extends React.Component<DecorList.Props, DecorList.State> {
    constructor(props: DecorList.Props, context?: any) {
        super(props, context);
        this.state = { editing: false };
    }

    handleDoubleClick() {
        this.setState({ editing: true });
    }

    render() {

        return (
            <div>
                <div className="table">
                    <table>
                        <tr>
                            <th>ItemID</th>
                            <th>Item Name</th>
                            <th>Unit Price</th>
                            <th>SupplierID</th>
                            <th>Decor Type</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {this.props.decor.map((decor) => (
                            <DecorItem
                                decor={decor}
                                loadDecor={this.props.loadDecor}
                                editDecor={this.props.editDecor}
                            />
                        ))}
                    </table>
                </div>
            </div>
        );

    }
}

// Entertainment
export class EntertainmentList extends React.Component<EntertainmentList.Props, EntertainmentList.State> {
    constructor(props: EntertainmentList.Props, context?: any) {
        super(props, context);
        this.state = { editing: false };
    }

    handleDoubleClick() {
        this.setState({ editing: true });
    }

    render() {

        return (
            <div>
                <div className="table">
                    <table>
                        <tr>
                            <th>ItemID</th>
                            <th>Item Name</th>
                            <th>Unit Price</th>
                            <th>SupplierID</th>
                            <th>Entertainment Type</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {this.props.entertainment.map((entertainment) => (
                            <EntertainmentItem
                                entertainment={entertainment}
                                loadEntertainment={this.props.loadEntertainment}
                                editEntertainment={this.props.editEntertainment}
                            />
                        ))}
                    </table>
                </div>
            </div>
        );

    }
}