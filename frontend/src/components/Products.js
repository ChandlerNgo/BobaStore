import React from "react";

export default function Products(props) {
    function getCartTotal(){
        var total = 0
        for(let i = 0; i < props.cart.length;i++){
            total += props.cart[i]["price"]
            var toppings = Object.keys(props.cart[i]["toppings"])
            for(let j = 0; j < toppings.length;j++){
                total += props.cart[i]["toppings"][toppings[j]]
            }
        }
        return total.toFixed(2)
    }

    return (
        <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your cart</span>
                <span className="badge bg-primary rounded-pill">{props.cart.length}</span>
            </h4>
            <ul className="list-group mb-3">
                {Object.keys(props.cart).map((item,i) => {
                    return (
                        <li className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 className="my-0">
                                    {props.cart[i]['size']} {props.cart[i]['productName']}
                                </h6>
                                {Object.keys(props.cart[i]["toppings"]).map((topping,j) => {
                                    return (
                                        <ul key={j} className="list-group d-flex justify-content-between">
                                            <li className="list-group d-flex justify-content-between">
                                                <small className="text-body-secondary">1x {topping}</small>
                                            </li>
                                        </ul>
                                    )
                                })}
                            </div>
                            <div>
                                <small className="text-body-secondary">${props.cart[i]['price']}</small>
                                {Object.keys(props.cart[i]["toppings"]).map((topping,j) => {
                                    return (
                                        <ul key={j} className="list-group d-flex justify-content-between">
                                            <li className="list-group d-flex justify-content-between">
                                                <small className="text-body-secondary">${props.cart[i]["toppings"][topping]}</small>
                                            </li>
                                        </ul>
                                    )
                                })}
                            </div>
                        </li>
                    )
                })}
                <li className="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>${getCartTotal()}</strong>
                </li>
                {/* <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
                    <div className="text-success">
                        <h6 className="my-0">Promo code</h6>
                        <small>EXAMPLECODE</small>
                    </div>
                    <span className="text-success">−$5</span>
                </li> */}
            </ul>
            <form className="card p-2">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Promo code" />
                    <button type="submit" className="btn btn-secondary">Redeem</button>
                </div>
            </form>
        </div>
    )
}
  