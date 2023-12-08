import React, { useState } from 'react';
import axios from 'axios';

const SignupPage: React.FC = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [classtoken, setClassToken] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!role) {
            console.error('Please select a role.');
            return;
        }    

        if (role === 'Teacher' && classtoken !== 'JU8OS1B') {
            console.error('Verification code invaild');
            return;
        }

        console.log({
            firstname,
            lastname,
            email,
            password,
            confirmpassword,
            classtoken,
            role
        });

        const userData = {
            'username': email,
            'password': password,
            'cpassword': confirmpassword,
            'firstname': firstname,
            'lastname': lastname,
            'classtoken': classtoken,
            'role': role
        };
        
        axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/SignupBackend.php', userData)
            .then(response => {
                console.log('Data submitted successful');
                response;
            })
            .catch(error => {
                console.error('Error submitting data', error);
            });

    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h1>Who are you...</h1>
            <div className="role-container">
                <button 
                    type="button" 
                    className={`role ${role === 'Student' ? 'role-selected' : ''}`} 
                    onClick={() => setRole('Student')}
                >
                    Student
                </button>
                <button 
                    type="button" 
                    className={`role ${role === 'Teacher' ? 'role-selected' : ''}`} 
                    onClick={() => setRole('Teacher')}
                >
                    Teacher
                </button>
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
            {role === 'Student' && (
                <div className="form-group">
                    <label className="control-label">Class Token</label>
                    <input placeholder="Enter your class token (optional)" name="classtoken" value={classtoken} onChange={(e) => setClassToken(e.target.value)} type="text" className="form-control" />
                </div>
            )}

            {role === 'Teacher' && (
                <div className="form-group">
                    <label className="control-label">Verification Code</label>
                    <input placeholder="Enter your verification code" name="verificationcode" value={classtoken} onChange={(e) => setClassToken(e.target.value)} type="text" className="form-control" />
                </div>
            )}

            <div className="signup-submit">
                <button type="submit" className="signup">Sign Up</button>
            </div>
            <h2>Or</h2>
            <h3><a href="https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/#/login" target="_blank" rel="noopener noreferrer">Already have an account? Login</a></h3>
        </form>
    );
}

export default SignupPage;