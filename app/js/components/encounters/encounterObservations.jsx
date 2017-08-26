/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */

import React from 'react';

const Observations = (props) => {
  console.log('obs', props.observations)
  return (
    <div className="observation">
      <header className="encounter-header">
        Observations
                  </header>
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
          {
            (props.observations.length > 0) ? (props.observations.map((observation) => (
              <tr>
                <td>{observation.concept.display}</td>
                <td>{observation.value.display}</td>
                <td>{new Date(observation.obsDatetime).toString()}</td>
                <td>{(observation.voided) ? 'Deleted' : 'Not Deleted'}</td>
              </tr>
            ))) :
              <span>null found</span>
          }
        </tbody>
      </table>
    </div>


  )
}

export default Observations;