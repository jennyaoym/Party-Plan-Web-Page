import * as React from 'react';
//import * as classNames from 'classnames';
//import * as style from './style.css';
import { SupplierModel } from 'app/models';
import { SupplierActions } from 'app/actions';
//import { connect } from 'react-redux';
//import { RootState } from 'app/reducers';
//import { TodoTextInput } from '../TodoTextInput';
import { SupplierItem } from '../SupplierItem';


//change on save to onsearch

export namespace SupplierList {
    export interface Props {
        suppliers: SupplierModel[];
        //result: SearchResultModel;
        //displayDetails: typeof SearchResultActions.display;
        editSupplier: typeof SupplierActions.editSupplier;
        loadSupplier: typeof SupplierActions.loadSupplier;
    }

    export interface State {
        editing: boolean;
    }
}

/*@connect(
    (state: RootState, ownProps): Pick<SupplierList.Props, 'suppliers'> => {
      return { suppliers: state.suppliers.suppliers};
    }
  )*/

export class SupplierList extends React.Component<SupplierList.Props, SupplierList.State> {
    constructor(props: SupplierList.Props, context?: any) {
        super(props, context);
        this.state = { editing: false };
    }

    handleDoubleClick() {
        this.setState({ editing: true });
    }
    /*
      handleClick() {
        this.props.displayDetails({title, content});
      }*/

    /*handleSubmit(id: number, text: string) {
        if (text.length === 0) {
            this.props.deleteSupplier(id);
        } else {
            this.props.editSupplier({ id, text });
        }
        this.setState({ editing: false });
    }*/

    render() {
        //console.log(this.props.suppliers);

        //const { todo, completeTodo, deleteTodo } = this.props;

        /*let element;
        if (this.state.editing) {
            element = (
                <TodoTextInput
                    text={todo.text}
                    editing={this.state.editing}
                    onSave={(text) => todo.id && this.handleSave(todo.id, text)}
                />
            );
        } else {
            element = (
                <div className={style.view}>
                    <input
                        className={style.toggle}
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => todo.id && completeTodo(todo.id)}
                    />
                    <label onDoubleClick={() => this.handleDoubleClick()}>{todo.text}</label>
                    <button
                        className={style.destroy}
                        onClick={() => {
                            if (todo.id) deleteTodo(todo.id);
                        }}
                    />
                </div>
            );
        }

        // TODO: compose
        const classes = classNames({
            [style.completed]: todo.completed,
            [style.editing]: this.state.editing,
            [style.normal]: !this.state.editing
        });*/
        //</div><li className={classes}>{element}</li>;

        return (
            <div>
                <div className="table">
                    <table>
                        <tr>
                            <th>SupplierID</th>
                            <th>Supplier Name</th>
                            <th>Supplier Type</th>
                            <th>Contact Number</th>
                            <th>Email Address</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {this.props.suppliers.map((supplier) => (
                            <SupplierItem
                                supplier={supplier}
                                loadSupplier={this.props.loadSupplier}
                                editSupplier={this.props.editSupplier}
                            />
                        ))}
                    </table>
                </div>
            </div>
        );

    }
}