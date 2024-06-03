import React from "react";
export default function Products(props) {
    console.log(props.cart)
    function getCartTotal(){
        var total = 0
        for(let i = 0; i < props.cart.length;i++){
            total += props.cart[i]["price"]
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
                                <h6 className="my-0">{props.cart[i]["productName"]}</h6>
                                <small className="text-body-secondary">{props.cart[i]["size"]} {props.cart[i]["productName"]}</small>
                            </div>
                            <span className="text-body-secondary">${props.cart[i]["price"]}</span>
                        </li>
                    )
                })}
                {/* <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
                    <div className="text-success">
                        <h6 className="my-0">Promo code</h6>
                        <small>EXAMPLECODE</small>
                    </div>
                    <span className="text-success">−$5</span>
                </li> */}
                <li className="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>${getCartTotal()}</strong>
                </li>
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
  