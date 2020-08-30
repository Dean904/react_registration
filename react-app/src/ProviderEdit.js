import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class ProviderEdit extends Component {

  emptyItem = {
    npiNumber: '',
    firstName: '',
    lastName: '',
    businessAddress: '',
    telephoneNumber: '',
    emailAddress: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const provider = await (await fetch(`/api/provider/${this.props.match.params.id}`)).json();
      this.setState({item: provider});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/provider', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.npiNumber ? 'Edit Provider' : 'Add Provider'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="npiNumber">NPI Number</Label>
            <Input type="text" name="npiNumber" id="npiNumber" value={item.npiNumber || ''}
                   onChange={this.handleChange} autoComplete="address-level1"/>
          </FormGroup>
		  
		  <div className="row">
			  <FormGroup className="col-md-6 mb-2">
				<Label for="address">First Name</Label>
				<Input type="text" name="firstName" id="firstName" value={item.firstName || ''}
					   onChange={this.handleChange} autoComplete="address-level1"/>
			  </FormGroup>
			  <FormGroup className="col-md-6 mb-2">
				<Label for="city">Last Name</Label>
				<Input type="text" name="lastName" id="lastName" value={item.lastName || ''}
					   onChange={this.handleChange} autoComplete="address-level1"/>
			  </FormGroup>
		  </div>

		<FormGroup >
		  <Label for="stateOrProvince">Business Address</Label>
		  <Input type="text" name="businessAddress" id="businessAddress" value={item.businessAddress || ''}
				 onChange={this.handleChange} autoComplete="address-level1"/>
		</FormGroup>
		<FormGroup>
		  <Label for="country">Telephone #</Label>
		  <Input type="text" name="telephoneNumber" id="telephoneNumber" value={item.telephoneNumber || ''}
				 onChange={this.handleChange} autoComplete="address-level1"/>
		</FormGroup>
		<FormGroup >
		  <Label for="country">Email Address</Label>
		  <Input type="text" name="emailAddress" id="emailAddress" value={item.emailAddress || ''}
				 onChange={this.handleChange} autoComplete="address-level1"/>
		</FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/providers">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(ProviderEdit);