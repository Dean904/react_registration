import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ProviderList extends Component {

  constructor(props) {
    super(props);
    this.state = {providers: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/providers')
      .then(response => response.json())
      .then(data => this.setState({providers: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/provider/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedproviders = [...this.state.providers].filter(i => i.id !== id);
      this.setState({providers: updatedproviders});
    });
  }

  render() {
    const {providers, isLoading} = this.state;
	
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const providerList = providers.map(provider => {
      const address = `${provider.businessAddress || ''}`;
      const name = `${provider.firstName || ''} ${provider.lastName || ''}`;
      return <tr key={provider.npiNumber}>
	    <td>{provider.npiNumber}</td>
		<td style={{whiteSpace: 'nowrap'}}>{name}</td>
        <td>{address}</td>
		<td>{provider.telephoneNumber}</td>
		<td>{provider.emailAddress}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/providers/" + provider.npiNumber}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(provider.npiNumber)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/providers/new">Add Provider</Button>
          </div>
          <h3>Healthcare Providers</h3>
          <Table className="mt-7">
            <thead>
            <tr>
              <th width="10%">NPI Number</th>
              <th width="15%">Name</th>
              <th width="15%">Address</th>
			  <th width="10%">Telephone #</th>
			  <th width="20%">Email</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {providerList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ProviderList;