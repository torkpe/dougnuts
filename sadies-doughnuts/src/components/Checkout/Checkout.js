import React from "react";
import Geosuggest from "react-geosuggest";
import "./checkout.css";

function Checkout(props) {
  const { formErrors } = props;
  const getFormError =(field) => {
    const formError = formErrors.find(error => error.errorType === field)
    if (formError) {
      return formError.errorMessage;
    }
  }
  return (
    <div className="checkout">
      <div className="form-group">
        <div className="form-input">
          <select className="checkout-input-field"
            onBlur={()=> props.validateIndividualField('orderType')}
            name="orderType" onChange={props.onChange} defaultValue={'DEFAULT'}>
            <option value="DEFAULT" disabled>Select type of delivery</option>
            <option value="Delivery">
              Delivery
            </option>
            <option value="Pick up">
              Pick up
            </option>
          </select>
          {getFormError('orderType') && <div className="form-error">
            {getFormError('orderType')}
          </div>}
        </div>
        <div className="form-input">
          <input type="text"
            placeholder="Name"
            onChange={props.onChange}
            onBlur={()=> props.validateIndividualField('name')}
            className="checkout-input-field" name="name"/>
          {getFormError('name') && <div className="form-error">
            {getFormError('name')}
          </div>}
        </div>
        <div className="form-input">
          <input type="email"
            placeholder="Email"
            onChange={props.onChange}
            onBlur={()=> props.validateIndividualField('email', true)}
            className="checkout-input-field" name="email"/>
            {getFormError('email') && <div className="form-error">
            {getFormError('email')}
          </div>}
        </div>
        <div className="form-input">
          <input
            placeholder="Phone number"
            className="checkout-input-field"
            onChange={props.onChange}
            type="number"
            name="phoneNumber"
            onBlur={()=> props.validateIndividualField('phoneNumber')}
            />
            {getFormError('phoneNumber') && <div className="form-error">
            {getFormError('phoneNumber')}
          </div>}
        </div>
        <div className="form-group">
          <Geosuggest
            autoComplete="new-address"
            placeholder="Street Address"
            onBlur={()=> props.validateIndividualField('address')}
            onSuggestSelect={props.onSuggestSelect}
          />
          {getFormError('address') && <div className="form-error">
            {getFormError('address')}
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Checkout;
