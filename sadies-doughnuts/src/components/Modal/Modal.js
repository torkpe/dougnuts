import React from "react";
import "./Modal.css";
import CartItems from "../Cart/CartItems";
import Checkout from "../Checkout/Checkout";
import { steps } from "../../helpers/constants";
import PaystackButton from 'react-paystack';

function Modal(props) {
  const { displayModal, modalHeader, formatCostForDisplay, doughnutsInCart } = props;

  const getCurrentStepIndex = (modalHeader) => {
    return steps.findIndex(step => step === modalHeader);
  }

  return (
    <div className={`modal ${displayModal ? "display-modal" : "hide-modal"}`}>
      <div className="modal-content">
      <div className="close" onClick={props.toggleModal}>
        <button className="btn modal-navigation">&lt; Back</button>
      </div>
        <div className="modal-header">
          <div className="modal-header-title">
            <strong>{modalHeader}</strong>
          </div>
        </div>
        <div className="modal-body">
          {getCurrentStepIndex(modalHeader) === 0 && <CartItems
            toggleModal={props.toggleModal}
            doughnuts={props.doughnuts}
            doughnutsInCart={doughnutsInCart}
            getDoughnutInCart={props.getDoughnutInCart}
            cartTransactions={props.cartTransactions}
            increaseOrDecreaseDoughnutQuantity={props.increaseOrDecreaseDoughnutQuantity}
            formatCostForDisplay={formatCostForDisplay}
          />}
          {getCurrentStepIndex(modalHeader) === 1 && <Checkout
            onSuggestSelect={props.onSuggestSelect}
            phoneNumber={props.phoneNumber}
            numberChange={props.numberChange}
            onChange={props.onChange}
            validateIndividualField={props.validateIndividualField}
            validator={props.validator}
            formErrors={props.formErrors}
          />}
          {getCurrentStepIndex(modalHeader) === 2 &&
            <PaystackButton
              text="Make Payment"
              class="payButton"
              callback={props.paymentCallBack}
              close={props.closePayment}
              disabled={true}
              embed={true}
              reference={props.getReference()}
              email={props.paymentDetails.email}
              amount={props.paymentDetails.totalCost * 100}
              paystackkey="pk_test_60b6ee9c71cbdb6db8d903ee14711ac0ccc646fd"
              tag="button"
            />}
        </div>
        <div className="modal-footer">
          <div className="modal-footer-text">
            <strong>Total cost: {props.formatCostForDisplay(String(props.totalCost))}</strong>
          </div>
          {doughnutsInCart.length > 0 &&
          <div className="modal-footer-navigation">
            {
              getCurrentStepIndex(modalHeader) > 0 &&
            <button onClick={() => props.navigate(getCurrentStepIndex(modalHeader) - 1)}
              className="btn modal-navigation">
              &lt; Previous
            </button>
            }
            {
              getCurrentStepIndex(modalHeader) < steps.length - 1 &&
              <button onClick={() => props.navigate(getCurrentStepIndex(modalHeader) + 1)}
                className="btn modal-navigation">
                Next &gt;
              </button>
            }
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Modal;
