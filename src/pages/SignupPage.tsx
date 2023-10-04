import React, { useState } from 'react';

const SignupPage: React.FC = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [classtoken, setClassToken] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // You can perform sign up logic here. For now, just logging the state.
        console.log({
            firstname,
            lastname,
            email,
            password,
            confirmpassword,
            classtoken
        });
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h1>Who are you...</h1>
            <div className="role-container">
                <button className="role">Student</button>
                <button className="role">Teacher</button>
            </div>
            <div className="form-group">
                <label className="control-label">Firstname</label>
                <input placeholder="Enter your first name" name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" className="form-control" />
                <label className="control-label">Lastname</label>
                <input placeholder="Enter your last name" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label className="control-label">Email</label>
                <input placeholder="Enter your email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
            </div>
            <div className="form-group">
                <label className="control-label">Password</label>
                <input placeholder="Enter your password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
            </div>
            <div className="form-group">
                <label className="control-label">Confirm Password</label>
                <input placeholder="Confirm your password" name="confirmpassword" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" />
            </div>
            <div className="form-group">
                <label className="control-label">Class Token</label>
                <input placeholder="Enter your class token" name="classtoken" value={classtoken} onChange={(e) => setClassToken(e.target.value)} type="text" className="form-control" />
            </div>
            <div className="signup-submit">
                <button type="submit" className="signup">Sign Up</button>
            </div>
            <h2>Or</h2>
            <h3>Already have an account? Login </h3>
        </form>
    );
}

export default SignupPage;