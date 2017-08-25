/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */

import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import apiCall from '../utilities/apiHelper';
import { Providers, Observations } from './encounterObservations';

export default class Encounters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      encounterUuid: '92e9f325-277e-47b0-9110-716d1ddf1b54',
      encounterDisplay: '',
      observations: [],
      providers: [],
      location_array: [],
      patientName: '',
      location: '',
      encounterDatetime: '',
      visit: '',
      encounterType: '',
      form: '',
      creator: '',
      voided: '',
      dateCreated: '',
      changedBy: '',
      dateChanged: '',
    }
    this.goHome = this.goHome.bind(this);
  }

  componentWillReceiveProps() {

  }

  componentDidMount() {
    apiCall(null, 'get', `encounter/${this.state.encounterUuid}?v=full`)
      .then((res) => {
        this.setState({
          patientName: res.patient.display, location: res.location.display,
          encounterType: res.encounterType.display, observations: res.obs, visit: res.visit.display,
          creator: res.auditInfo.creator.display, dateCreated: res.auditInfo.dateCreated,
          changedBy: res.auditInfo.changedBy.display, dateChanged: res.auditInfo.dateChanged,
          providers: res.encounterProviders
        })
      })
    apiCall(null, 'get', 'location')
      .then(res => {
        this.setState(Object.assign({}, this.state, {
          location_array: res.results
        }))
      })
  }
  goHome() {
    this.props.router.push("/");
  }
  render() {
    return (
      <div>
        <div className="section top">
          <div className="col-sm-12 section search">
            <span onClick={this.goHome} className="glyphicon glyphicon-home glyphicon-updated breadcrumb-item"
              aria-hidden="true">Back</span>
            <header className="patient-header">
              Encounter {this.state.encounterUuid}
            </header>
            <div className="display">
              <div className="encounter">
                <form className="encounter-form">
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label"> Patient  </label>
                    <div className="col-sm-6">
                      <input className="form-control"
                        name="patient"
                        type="text"
                        value={this.state.patientName}
                        readOnly={this.state.display === 'view' ? 'readonly' : null}
                        required
                        disabled />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Location </label>
                    <div className="col-sm-6">
                      <select className="form-control"
                        name="location"
                        value={this.state.location}
                        readOnly={this.state.display === 'view' ? 'readonly' : null}
                        disabled>
                        {
                          this.state.location_array.map((location, key) => (
                            <option value={location.display}>{location.display}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label"> Encounter Date </label>
                    <div className="col-sm-6">
                      <input className="form-control"
                        name="encounterDate"
                        type="text"
                        value={new Date(this.state.dateCreated).toString()}
                        readOnly={this.state.display === 'view' ? 'readonly' : null}
                        required
                        disabled />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Visit</label>
                    <div className="col-sm-6">
                      <input className="form-control"
                        name="visit"
                        type="text"
                        value={this.state.visit}
                        disabled />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Encounter Type</label>
                    <div className="col-sm-6">
                      <input className="form-control"
                        name="createdby"
                        type="text"
                        value={this.state.encounterType}
                        disabled />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Form</label>
                    <div className="col-sm-6">
                      <input className="form-control"
                        name="createdby"
                        type="text"
                        value={this.state.form}
                        disabled />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Created By:</label>
                    <div className="col-sm-6">
                      <input className="form-control"
                        name="createdby"
                        type="text"
                        value={this.state.creator}
                        disabled />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Deleted</label>
                    <div className="col-sm-6">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        checked={this.state.voided}
                        disabled />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-sm-2">
                      <button type="submit"
                        name="update"
                        onClick={this.handleEdit}
                        disabled={this.state.display === 'view' ? 'disabled' : null}
                        className="btn btn-default form-control">
                        Edit</button>
                    </div>
                    <div className="col-sm-2">
                      <button type="button"
                        name="cancel"
                        onClick={this.handleCancel}
                        disabled={this.state.display === 'view' ? 'disabled' : null}
                        className="btn btn-default form-control cancelBtn">
                        Cancel</button>
                    </div>
                  </div>
                </form>
              </div>
              <Providers providers={this.state.providers} />
              <Observations observations={this.state.observations} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}