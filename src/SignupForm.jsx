import React from "react";

export default class SignupForm extends React.Component {

    constructor(){
        super();
        this.state = {
            firstname:"",
            lastname:"",
            email:"",
            password:"",
            confirmpassword:"",
            classtoken:""
        }
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render (){
        return(
            <form className="signup-form" onSubmit={ this.onSubmit }>
                <h1>Who are you...</h1>
                <div className="role-container">
                    <button className="role">Student</button>
                    <button className="role">Teacher</button>
                </div>
                <div className="form-group">
                    <label className="control-label">Firstname</label>
                    <input placeholder="Enter your first name" name="firstname" onChange={ this.onChange } value={ this.state.firstname } type="text" className="form-control"/>
                    <label className="control-label">Lastname</label>
                    <input placeholder="Enter your last name" name="lastname" onChange={ this.onChange } value={ this.state.lastname } type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input placeholder="Enter your email" name="email" onChange={ this.onChange } value={ this.state.email } type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input placeholder="Enter your password" name="password" onChange={ this.onChange } value={ this.state.password } type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label className="control-label">Confirmpassword</label>
                    <input placeholder="Confirm you password" name="confirmpassword" onChange={ this.onChange } value={ this.state.confirmpassword } type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label className="control-label">Class Token</label>
                    <input placeholder="Enter your class token" name="classtoken" onChange={ this.onChange } value={ this.state.classtoken } type="text" className="form-control"/>
                </div>
                <div className="signup-submit">
                    <button className="signup" >Sign Up</button>
                </div>
                <h2>Or</h2>
                <h3>Already have an account? Login </h3>
            </form>

        )
    }
}