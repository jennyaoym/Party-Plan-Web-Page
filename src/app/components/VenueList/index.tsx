import * as React from 'react';
//import * as classNames from 'classnames';
//import * as style from './style.css';
import { VenueModel } from 'app/models';
import { VenueActions } from 'app/actions';
//import { connect } from 'react-redux';
//import { RootState } from 'app/reducers';
//import { TodoTextInput } from '../TodoTextInput';
import { VenueItem } from '../VenueItem';


//change on save to onsearch

export namespace VenueList {
    export interface Props {
        venues: VenueModel[];
        //result: SearchResultModel;
        //displayDetails: typeof SearchResultActions.display;
        editVenue: typeof VenueActions.editVenue;
        loadVenue: typeof VenueActions.loadVenue;
    }

    export interface State {
        editing: boolean;
    }
}

/*@connect(
    (state: RootState, ownProps): Pick<VenueList.Props, 'venues'> => {
      return { venues: state.venues.venues};
    }
  )*/

export class VenueList extends React.Component<VenueList.Props, VenueList.State> {
    constructor(props: VenueList.Props, context?: any) {
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
            this.props.deleteVenue(id);
        } else {
            this.props.editVenue({ id, text });
        }
        this.setState({ editing: false });
    }*/

    render() {
        //console.log(this.props.venues);

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
                            <th>VenueID</th>
                            <th>Location Name</th>
                            <th>Address</th>
                            <th>Capacity</th>
                            <th>Venue Type</th>
                            <th>Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {this.props.venues.map((venue) => (
                            <VenueItem
                                venue={venue}
                                loadVenue={this.props.loadVenue}
                                editVenue={this.props.editVenue}
                            />
                        ))}
                    </table>
                </div>
            </div>
        );

    }
}