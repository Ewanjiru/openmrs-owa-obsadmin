import React from 'react';

const Encounter = props => (
  <div className="encounter">
    <form className="encounter-form">
      <div className="form-group row">
        <label className="col-sm-4 col-form-label"> Patient</label>
        <div className="col-sm-6">
          <input
            className="form-control"
            name="patientName"
            type="text"
            value={props.patientName}
            required
            disabled={(props.editable === false)}
            onChange={props.handleChange}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Location </label>
        <div className="col-sm-6">
          <select
            className="form-control"
            name="location"
            value={props.location}
            disabled={(props.editable === false)}
            onChange={props.handleChange}
          >
            {
              props.location_array.map((location, key) => (
                <option value={location.display}>{location.display}</option>
              ))
            }
          </select>
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label"> Encounter Date </label>
        <div className="col-sm-6">
          <input
            className="form-control"
            name="encounterDatetime"
            type="text"
            value={new Date(props.encounterDatetime).toString()}
            required
            disabled={(props.editable === false)}
            onChange={props.handleChange}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Visit</label>
        <div className="col-sm-6">
          <select
            className="form-control"
            name="visit"
            type="text"
            value={props.visit}
            disabled={(props.editable === false)}
            onChange={props.handleChange}
          >
            {
              props.visit_array.map((visit, index) => (
                <option key={index} value={visit.display}>{visit.display}</option>
              ))
            }
          </select>
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Encounter Type</label>
        <div className="col-sm-6">
          <input
            className="form-control"
            name="encounterType"
            type="text"
            value={props.encounterType}
            disabled={(props.editable === false)}
            onChange={props.handleChange}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Form</label>
        <div className="col-sm-6">
          <input
            className="form-control"
            name="form"
            type="text"
            value={props.form}
            disabled={(props.editable === false)}
            onChange={props.handleChange}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Created By:</label>
        <div className="col-sm-6">
          <input
            className="form-control"
            name="creator"
            type="text"
            value={props.creator}
            disabled={(props.editable === false)}
            onChange={props.handleChange}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Deleted</label>
        <div className="col-sm-6">
          <input
            name="voided"
            className="form-check-input"
            type="checkbox"
            checked={props.voided}
            disabled={(props.editable === false)}
            onChange={props.handleChange}
          />
        </div>
      </div>
      {props.toDelete &&
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">Reason for Deletion</label>
          <div className="col-sm-6">
            <input
              className="form-control"
              name="voidReason"
              type="text"
              value={props.voidReason}
              onChange={props.handleChange}
              required
            />
          </div>
        </div>
      }
      <div className="form-group row">
        <div className="col-sm-2">
          <button
            type="submit"
            name="update"
            onClick={(props.editable) ? props.handleUpdate : props.handleEdit}
            className="btn btn-default form-control"
          >
            {(props.editable) ? 'Update' : 'Edit'}</button>
        </div>

        <div className="col-sm-2">
          <button
            type="button"
            name="cancel"
            onClick={(props.editable) ? props.handleCancel : props.handleDelete}
            className="btn btn-default form-control cancelBtn"
          >
            {(props.editable) ? 'Cancel' : 'Delete'}</button>
        </div>
      </div>
    </form>
  </div>
);

export default Encounter;
