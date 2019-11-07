import * as React from 'react';
//import * as classNames from 'classnames';
//import * as style from './style.css';
import { PrivateClientModel } from 'app/models';
import { CorporateClientModel } from 'app/models';
import { ClientActions } from 'app/actions';
//import { connect } from 'react-redux';
//import { RootState } from 'app/reducers';
//import { TodoTextInput } from '../TodoTextInput';
import { PrivateClientItem } from '../ClientItem';
import { CorporateClientItem } from '../ClientItem';


//change on save to onsearch

export namespace PrivateClientList {
    export interface Props {
        privateClients: PrivateClientModel[];
        disableedit: boolean;
        editPrivateClient: typeof ClientActions.editPrivateClient;
        loadPrivateClient: typeof ClientActions.loadPrivateClient;
        showhideclientdetails: typeof ClientActions.showhideClientDetail;
        selectclient: typeof ClientActions.selectClient;
    }

    export interface State {
        editing: boolean;
    }
}

export namespace CorporateClientList {
    export interface Props {
        corporateClients: CorporateClientModel[];
        disableedit: boolean;
        editCorporateClient: typeof ClientActions.editCorporateClient;
        loadCorporateClient: typeof ClientActions.loadCorporateClient;
        showhideclientdetails: typeof ClientActions.showhideClientDetail;
        selectclient: typeof ClientActions.selectClient;
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

export class PrivateClientList extends React.Component<PrivateClientList.Props, PrivateClientList.State> {
    constructor(props: PrivateClientList.Props, context?: any) {
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
                            <th></th>
                            <th>ClientID</th>
                            <th>Client Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Contact Method</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {this.props.privateClients.map((privateClient) => (
                            <PrivateClientItem
                                privateClient={privateClient}
                                disableedit={this.props.disableedit}
                                loadPrivateClient={this.props.loadPrivateClient}
                                editPrivateClient={this.props.editPrivateClient}
                                showhideclientdetails={this.props.showhideclientdetails}
                                selectclient={this.props.selectclient}
                            />
                        ))}
                    </table>
                </div>
            </div>
        );

    }
}

export class CorporateClientList extends React.Component<CorporateClientList.Props, CorporateClientList.State> {
    constructor(props: CorporateClientList.Props, context?: any) {
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
                            <th></th>
                            <th>ClientID</th>
                            <th>Company Name</th>
                            <th>Contact Person</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Contact Method</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {this.props.corporateClients.map((corporateClient) => (
                            <CorporateClientItem
                                corporateClient={corporateClient}
                                disableedit={this.props.disableedit}
                                loadCorporateClient={this.props.loadCorporateClient}
                                editCorporateClient={this.props.editCorporateClient}
                                showhideclientdetails={this.props.showhideclientdetails}
                                selectclient={this.props.selectclient}
                            />
                        ))}
                    </table>
                </div>
            </div>
        );

    }
}