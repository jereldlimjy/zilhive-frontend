import React, { Component } from 'react';

class AccessForm extends Component {
    state = {
        // passphrase: '',
        // file: null,
        handle: '',
        zilPayLoginBtnText: 'Login With ZilPay',
        zilPayLogin: false,
        address: '',
    }

    // ComponentDidMount - popdown Zilliqa extension

    zilPayConnect = async() => {
        // check if extension installed
        if (!window.zilPay) {
            this.props.setAlert('You do not have ZilPay installed!', 'danger');
        } else {
            // check if logged in
            if (window.zilPay.wallet.isEnable) {
                await window.zilPay.wallet.connect();
                if (window.zilPay.wallet.isConnect) {
                    this.setState({ zilPayLoginBtnText: "Logging In With ZilPay..." });
                    this.setState({ zilPayLogin: true });
                    // bech32 vs base16?
                    let currentAddress = await window.zilPay.wallet.defaultAccount.bech32;
                    this.setState({ address: currentAddress, zilPayLoginBtnText: "Logged In to ZilPay!" });
                }
            } else {
                this.props.setAlert('You are not logged in to ZilPay!', 'danger');
            }
        }
    }

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state.address, this.state.handle);
        this.props.setAlert('Success!', 'success');
        this.setState({ handle: '', zilPayLoginBtnText: 'Login With Zilpay', zilPayLogin: false, address: '' });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="container">
                <h1 className="mt-3">Get Started</h1>
                <form onSubmit={this.onSubmit} className="m-1 card bg-light">
                    {/* <label htmlFor="keystore">Keystore File</label>
                    <input type="file" name="keystore" id="keystore" required/>

                    <label htmlFor="passphrase">Passphrase</label>
                    <input type="text" onChange={this.onChange} value={this.state.passphrase} name="passphrase" id="passphrase" placeholder="Passphrase" required/> */}
                    <button type="button" className="btn btn-block btn-primary mb-1" onClick={this.zilPayConnect}>{this.state.zilPayLoginBtnText}</button>

                    <label htmlFor="handle">Telegram Handle</label>
                    <input type="text" onChange={this.onChange} value={this.state.handle} id="handle" name="handle" placeholder="@elonmusk" required/>
                    <button type="submit" onSubmit={this.onSubmit} disabled={!(this.state.handle && this.state.address)} className="btn btn-success mt-b" style={{ margin: 'auto', display: 'block' }}>Get Started!</button>
                </form>
            </div>
        )
    }
}

export default AccessForm;
