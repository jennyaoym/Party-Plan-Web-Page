import * as React from 'react';
import { Link } from 'react-router-dom';
import * as style from './style.css';

export namespace SideNav {
  export interface Props {
    //addTodo: typeof TodoActions.addTodo; 
    //search: typeof SearchActions.search; // added
  }
}

export class SideNav extends React.Component<SideNav.Props> {
  constructor(props: SideNav.Props, context?: any) {
    super(props, context);
  }

  render() {
    return (
        <div className={style.sidebar}>
          <a><Link to="/"><i className="fa fa-home"></i>Home</Link></a>
          <a><Link to="/supplier">Suppliers</Link></a>
          <a><Link to="/events">Events</Link></a>
          <a><Link to="/clients">Clients</Link></a>
          <a><Link to="/items">Items</Link></a>
          <a><Link to="/venue">Venues</Link></a>
      </div>
    );
  }
}