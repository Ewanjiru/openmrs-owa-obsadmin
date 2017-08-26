/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */

import React from 'react';

const Providers = (props) => {
  return (
    <div className="observation">
      <header className="encounter-header">
        Provider
      </header>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Role</th>
            <th>Provider Name</th>
            <th>Identifier</th>
          </tr>
        </thead>
        <tbody>
          {props.providers.map((provider) => (
            <tr>
              <td>{provider.role}</td>
              <td>{observation.display}</td>
              <td>{provider.identifier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Providers;