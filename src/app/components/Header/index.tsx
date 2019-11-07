import * as React from 'react';
import { TodoTextInput } from '../TodoTextInput';
import { TodoActions } from 'app/actions/todos';
import * as style from './style.css';
//import { SearchActions } from 'app/actions/search';

export namespace Header {
  export interface Props {
    addTodo: typeof TodoActions.addTodo; 
    //search: typeof SearchActions.search; // added
  }
}

export class Header extends React.Component<Header.Props> {
  constructor(props: Header.Props, context?: any) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
    //this.handleSearch = this.handleSearch.bind(this);
  }

  handleSave(text: string) {
    if (text.length) {
      this.props.addTodo({ text });
    }
  }

  /*
  handleSearch(keyword: string) {
    if(keyword.length) {
      this.props.search({ keyword});
    }
  }*/

  render() {
    return (
      <header >
        <h1>Perfect Party</h1>
      </header>
    );
  }
}
