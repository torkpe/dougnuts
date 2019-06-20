import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/Navbar";
import DoughnutCard from "./components/DoughnutCard";
import Footer from "./components/Footer";
import Modal from "./components/Modal/Modal";
import { steps } from "./helpers/constants";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdminLoggedIn: false,
      displayModal: false,
      numberOfItemsInCart: 0,
      doughnutsInCart: [],
      modalHeader: "",
      totalCost: 0,
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      errors: [],
      orderType: "",
      doughnuts: [
        {
          doughnutPhoto:
            "https://www.cookingclassy.com/wp-content/uploads/2013/09/baked-nutella-doughnuts6+srgb.-426x375.jpg",
          doughnutName: "test name",
          doughnutPrice: "1020",
          key: 1
        },
        {
          doughnutPhoto:
            "https://www.cookingclassy.com/wp-content/uploads/2013/09/baked-nutella-doughnuts6+srgb.-426x375.jpg",
          doughnutName: "test name",
          doughnutPrice: "1020",
          key: 2
        },
        {
          doughnutPhoto:
            "https://www.cookingclassy.com/wp-content/uploads/2013/09/baked-nutella-doughnuts6+srgb.-426x375.jpg",
          doughnutName: "test name",
          doughnutPrice: "1320",
          key: 3
        },
        {
          doughnutPhoto:
            "https://www.cookingclassy.com/wp-content/uploads/2013/09/baked-nutella-doughnuts6+srgb.-426x375.jpg",
          doughnutName: "test name",
          doughnutPrice: "1020",
          key: 5
        }
      ]
    };
  }

  getDoughnutInCart = doughnutId => {
    return this.state.doughnutsInCart.find(
      doughnut => doughnut.doughnutId === doughnutId
    );
  };

  getDoughnut = doughnutId => {
    return this.state.doughnuts.find(doughnut => doughnut.key === doughnutId);
  };

  formatCostForDisplay = cost => {
    const reversedCost = [];
    if (cost.length > 3) {
      cost
        .split("")
        .reverse()
        .forEach((number, index) => {
          if (index + 1 > 3 && (index + 1) % 3 === 1) {
            reversedCost.push(",");
            reversedCost.push(number);
          } else {
            reversedCost.push(number);
          }
        });
      return `₦${reversedCost.reverse().join("")}`;
    }
    return `₦${cost}`;
  };

  cartTransactions = (event, doughnutId) => {
    event.preventDefault();
    const { doughnutsInCart, numberOfItemsInCart, totalCost } = this.state;
    const doughnut = this.getDoughnut(doughnutId);
    const doughnutInCart = this.getDoughnutInCart(doughnutId);
    if (!this.getDoughnutInCart(doughnutId)) {
      this.setState({
        numberOfItemsInCart: numberOfItemsInCart + 1,
        doughnutsInCart: [
          ...doughnutsInCart,
          {
            doughnutId,
            doughnutPrice: doughnut.doughnutPrice,
            doughnutQuantity: 1
          }
        ],
        totalCost: totalCost + parseInt(doughnut.doughnutPrice)
      });
    } else {
      const filteredIds = doughnutsInCart.filter(
        doughnut => doughnut.doughnutId !== doughnutId
      );
      this.setState({
        numberOfItemsInCart: numberOfItemsInCart - 1,
        doughnutsInCart: filteredIds,
        totalCost:
          totalCost -
          doughnutInCart.doughnutPrice * doughnutInCart.doughnutQuantity
      });
    }
  };

  increaseOrDecreaseDoughnutQuantity = (doughnut, isIncrement) => {
    const { doughnutId, doughnutQuantity, doughnutPrice } = doughnut;
    const { totalCost, doughnutsInCart } = this.state;

    if (!isIncrement && doughnutQuantity === 1) {
      return;
    }
    doughnut.doughnutQuantity = isIncrement
      ? doughnutQuantity + 1
      : doughnutQuantity - 1;
    const doughnutIndexInCart = doughnutsInCart.findIndex(
      doughnut => doughnut.doughnutId === doughnutId
    );

    doughnutsInCart.splice(doughnutIndexInCart, 1, doughnut);

    this.setState({
      doughnutsInCart: doughnutsInCart,
      totalCost: isIncrement
        ? totalCost + parseInt(doughnutPrice)
        : totalCost - parseInt(doughnutPrice)
    });
  };

  toggleModal = (modalHeader = "") => {
    const { displayModal } = this.state;
    this.setState({
      displayModal: !displayModal,
      modalHeader: displayModal ? "" : modalHeader
    });
  };

  navigate = index => {
    if (index === 2 && this.validator()) {
      return
    }
    this.setState({
      modalHeader: steps[index]
    });
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSuggestSelect = suggest => {
    if (suggest) {
      this.setState({
        address: suggest.description
      });
    } else {
      this.setState({
        address: ''
      })
    }
    this.validateIndividualField('address');    
  };

  numberChange = event => {
    const { value } = event;
    this.setState({
      phoneNumber: value
    });
  };

  validator = () => {
    const {
      phoneNumber,
      email,
      address,
      name,
      orderType
    } = this.state;
    const fieldKeyValues = {
      phoneNumber,
      email,
      address,
      name,
      orderType
    };
    const errors = [];
    Object.keys(fieldKeyValues).forEach(field => {
      if (fieldKeyValues[field].trim().length < 1) {
        errors.push({
          errorType: field,
          errorMessage: "This is a required field!!!"
        });
      }
    });
    this.setState({
      errors,
    });
    return errors.length > 0;
  };

  validateIndividualField = (field, isEmail = false) => {
    const {
      email,
      errors: errorsInState,
      phoneNumber,
      address,
      name,
      orderType
    } = this.state;
    const indexInErrors = errorsInState.findIndex(
      error => error.errorType === field
    );
    const error = {
      errorType: field,
      errorMessage: ""
    };
    const fieldKeyValues = {
      phoneNumber,
      email,
      address,
      name,
      orderType
    };
    if (isEmail) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        const filteredErrors = errorsInState.filter(
          error => error.errorType !== field
        );
        this.setState({
          errors: filteredErrors
        });
      } else {
        error.errorMessage = "Email should be valid!!!";
      }
    } else {
      if (fieldKeyValues[field].trim().length < 1) {
        error.errorMessage = "This field is required!!!";
      } else {
        const filteredErrors = errorsInState.filter(
          error => error.errorType !== field
        );
        this.setState({
          errors: filteredErrors
        });
      }
    }

    if (indexInErrors > -1) {
      errorsInState.splice(indexInErrors, 1, error);
    } else if(error.errorMessage) {
      errorsInState.push(error);
    }
    this.setState({
      errors: errorsInState,
    });
  };

  paymentCallBack = (respomse) => {
    console.log(respomse)
  }

  getReference = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
    for( let i=0; i < 15; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  closePayment =() => {
    console.log('payment closed')
  }
  render() {
    const {
      doughnuts,
      numberOfItemsInCart,
      doughnutsInCart,
      displayModal,
      modalHeader,
      totalCost,
      phoneNumber,
      errors,
      email,
    } = this.state;

    return (
      <div className="container">
        <NavBar
          numberOfItemsInCart={numberOfItemsInCart}
          toggleModal={this.toggleModal}
        />
        <div className="background-image">
          <div className="background-text">Crispy... Just eat</div>
        </div>
        <main>
          <section className="doughnuts">
            <div className="orders">
              <h1>We're taking orders...</h1>
            </div>
            <div className="doughnuts-list">
              {doughnuts.map(doughnut => (
                <DoughnutCard
                  key={doughnut.key}
                  doughnut={doughnut}
                  doughnutInCart={this.getDoughnutInCart(doughnut.key)}
                  cartTransactions={this.cartTransactions}
                  doughnutsInCart={doughnutsInCart}
                  formatCostForDisplay={this.formatCostForDisplay}
                />
              ))}
            </div>
            <div className="doughnuts-pagination">
              <button className="btn btn__pagination">1</button>
            </div>
          </section>
          <Modal
            displayModal={displayModal}
            toggleModal={this.toggleModal}
            doughnuts={doughnuts}
            doughnutsInCart={doughnutsInCart}
            getDoughnutInCart={this.getDoughnutInCart}
            cartTransactions={this.cartTransactions}
            modalHeader={modalHeader}
            increaseOrDecreaseDoughnutQuantity={
              this.increaseOrDecreaseDoughnutQuantity
            }
            totalCost={totalCost}
            formatCostForDisplay={this.formatCostForDisplay}
            navigate={this.navigate}
            onSuggestSelect={this.onSuggestSelect}
            phoneNumber={phoneNumber}
            numberChange={this.numberChange}
            onChange={this.onChange}
            validateIndividualField={this.validateIndividualField}
            validator={this.validator}
            formErrors={errors}
            paymentCallBack={this.paymentCallBack}
            getReference={this.getReference}
            closePayment={this.closePayment}
            paymentDetails={({
              email,
              totalCost
            })}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export default Main;
