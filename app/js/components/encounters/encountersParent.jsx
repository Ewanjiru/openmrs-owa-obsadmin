/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */

import React from 'react';
import apiCall from '../../utilities/apiHelper';
import Providers from './encounterProviders';
import Encounter from './encounterForm';

export default class Encounters extends React.Component {
  constructor(props) {
    super(props);
    console.log('this props', props);
    this.state = {
      encounterUuid: props.params.encounterId,
      patientUuid: props.params.patentId,
      encounterDisplay: '',
      observations: [],
      providers: [],
      location_array: [],
      visit_array: [],
      encounterRoles: [],
      createProvidersArray: [],
      patientName: '',
      location: '',
      visit: '',
      encounterType: '',
      form: '',
      creator: '',
      voided: '',
      encounterDatetime: '',
      changedBy: '',
      dateChanged: '',
      editable: false,
      toDelete: false,
      isChecked: false,
      selectedProviderUuid: '',
      encounterRole: '',
      providerName: '',
      voidReason: '',
    };
    this.goHome = this.goHome.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUndelete = this.handleUndelete.bind(this);
    this.handleObservationClick = this.handleObservationClick.bind(this);
    this.handleProviderChecked = this.handleProviderChecked.bind(this);
    this.removeProvider = this.removeProvider.bind(this);
    this.saveNewProvider = this.saveNewProvider.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.state.encounterUuid);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.encounterUuid !== this.props.encounterUuid) {
      this.setState({
        encounterUuid: nextProps.params.encounterId,
      });
    }
  }

  fetchData(id) {
    apiCall(null, 'get', `encounter/${id}?v=full`)
      .then((res) => {
        console.log('results', res);
        this.setState({
          patientName: res.patient.display,
          location: res.location.display,
          encounterType: res.encounterType.display,
          observations: res.obs,
          visit: res.visit.display,
          form: (res.form !== null) ? res.form.display : res.form,
          creator: res.auditInfo.creator.display,
          encounterDatetime: res.encounterDatetime,
          changedBy: res.auditInfo.changedBy,
          dateChanged: res.auditInfo.dateChanged,
          providers: res.encounterProviders,
          voided: res.voided,
        });
      })
      .catch(error => console.log('error fetch', error));

    apiCall(null, 'get', `visit?patient=${this.state.patientUuid}`)
      .then((res) => {
        this.setState({
          visit_array: res.results,
        });
      });

    apiCall(null, 'get', 'location')
      .then((res) => {
        this.setState(Object.assign({}, this.state, {
          location_array: res.results,
        }));
      });

    apiCall(null, 'get', 'encounterrole')
      .then((response) => {
        this.setState({
          encounterRoles: response.results,
        });
      })
      .catch(error => console.log('this error', error));

    apiCall(null, 'get', 'provider')
      .then((response) => {
        this.setState({
          createProvidersArray: response.results,
        });
      })
      .catch(error => console.log('this error', error));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    console.log('this logs', value);
  }

  handleEdit(event) {
    event.preventDefault();
    this.setState({
      editable: true,
    });
  }

  handleUpdate() {
    const { patientName, location, visit, encounterDatetime, voided } = this.state;
    console.log(patientName, location, visit, encounterDatetime, voided);
    apiCall({
      patient: patientName,
      location,
      encounterDatetime,
    }, 'post', `encounter/${this.state.encounterUuid}`)
      .then((res) => {
        console.log('edit results', res);
      })
      .catch(error => console.log('res error', error));
    this.setState({
      editable: false,
    });
  }

  handleDelete(e) {
    e.preventDefault();
    if (!this.state.toDelete) {
      this.setState({
        toDelete: true,
      });
    } else {
      apiCall(null, 'delete', `encounter/${this.state.encounterUuid}`)
        .then((res) => {
          apiCall({ auditInfo: { voidReason: this.state.voidReason } }, 'post', `encounter/${this.state.encounterUuid}`)
            .then((response) => {
              console.log('I got an error when deleting', response);
            })
            .catch(error => console.log('error inner', error));
        })
        .catch(error => console.log('I got an error when deleting', error));
    }
  }

  handleUndelete(e) {
    e.preventDefault();
    apiCall({ voided: false }, 'post', `encounter/${this.state.encounterUuid}`)
      .then((res) => {
        apiCall({ obs: { voided: false } }, 'post', `encounter/${this.state.encounterUuid}`);
      });
  }

  handleObservationClick(observationUuid) {
    this.props.router.push(
      `/patient/${this.state.patientUuid}/encounter/${this.state.encounterUuid}/observation/${observationUuid}
      `);
  }

  handleProviderChecked(e, uuid) {
    console.log(uuid, 'provider');
    this.setState({
      isChecked: e.target.checked,
      selectedProviderUuid: uuid,
    });
  }

  removeProvider() {
    apiCall(null, 'delete', `encounter/${this.state.encounterUuid}/encounterprovider/${this.state.selectedProviderUuid}`)
      .then((response) => {
        console.log('delete provider', response);
      })
      .catch(error => console.log(error));
  }

  saveNewProvider(event) {
    event.preventDefault();
    const { encounterRole, providerName } = this.state;
    apiCall({
      provider: providerName,
      encounterRole,
    }, 'post', `/encounter/${this.state.encounterUuid}/encounterprovider`)
      .then((response) => {
        console.log('provider created', response);
      })
      .catch(error => console.log('provider created error', error));
  }

  goHome() {
    this.props.router.push('/');
  }
  render() {
    console.log('this logs', this.state.encounterRole, this.state.providerName);
    return (
      <div>
        <div className="section top">
          <div className="col-sm-12 section search">
            <span
              onClick={this.goHome}
              className="glyphicon glyphicon-home glyphicon-updated breadcrumb-item"
              aria-hidden="true"
            >Back</span>
            <header className="encounter-header">
              Encounter {this.state.encounterUuid}
            </header>
            <div className="display">
              <Encounter
                location_array={this.state.location_array}
                location={this.state.location}
                patientName={this.state.patientName}
                encounterDatetime={this.state.encounterDatetime}
                visit={this.state.visit}
                visit_array={this.state.visit_array}
                encounterType={this.state.encounterType}
                creator={this.state.creator}
                voided={this.state.voided}
                form={this.state.form}
                voidReason={this.state.voidReason}
                editable={this.state.editable}
                toDelete={this.state.toDelete}
                handleEdit={this.handleEdit}
                handleCancel={this.handleCancel}
                handleUpdate={this.handleUpdate}
                handleChange={this.handleChange}
                handleDelete={this.handleDelete}
                handleUndelete={this.handleUndelete}
              />

              <Providers
                providers={this.state.providers}
                isChecked={this.state.isChecked}
                handleProviderChecked={this.handleProviderChecked}
                removeProvider={this.removeProvider}
                encounterRoles={this.state.encounterRoles}
                createProvidersArray={this.state.createProvidersArray}
                providerName={this.state.providerName}
                encounterRole={this.state.encounterRole}
                handleChange={this.handleChange}
                saveNewProvider={this.saveNewProvider}
              />

              <div className="observation">
                <h3>Observations</h3>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Question Concept</th>
                      <th>Value</th>
                      <th>Created</th>
                      <th>Deleted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.observations.length > 0 &&
                      this.state.observations.map((ob) => {
                        if (ob.groupMembers !== null) {
                          return (
                            (ob.groupMembers.map((observation, index) => (
                              <tr key={index}>
                                <a>
                                  <td
                                    onClick={() => { this.handleObservationClick(observation.uuid); }}
                                  >{observation.concept.display}
                                  </td>
                                </a>
                                <td>{observation.value.display}</td>
                                <td>{new Date(observation.obsDatetime).toString()}</td>
                                <td>{(observation.voided) ? 'Deleted' : 'Not Deleted'}</td>
                              </tr>
                            )))
                          );
                        }
                        return (
                          <tr>
                            <a>
                              <td
                                onClick={() => { this.handleObservationClick(ob.uuid); }}
                              >{ob.concept.display}
                              </td>
                            </a>
                            <td>{ob.value}</td>
                            <td>{new Date(ob.obsDatetime).toString()}</td>
                            <td>{(ob.voided) ? 'Deleted' : 'Not Deleted'}</td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
