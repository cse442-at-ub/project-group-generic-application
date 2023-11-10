import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [classtoken, setClassToken] = useState('');
    const [role, setRole] = useState('');
    const [showChecklist, setShowChecklist] = useState(false);
    const [isLongEnough, setIsLongEnough] = useState(false);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);
    const navigate = useNavigate();

    const updateChecklist = (password: string) => {
        setIsLongEnough(password.length >= 8);
        setHasUppercase(/[A-Z]/.test(password));
        setHasSpecialChar(/[!@#$%^&*]/.test(password));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        updateChecklist(newPassword);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!role) {
            alert('Please select a role.');
            return;
        }

        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!passwordRegex.test(password)) {
            alert('Password must contain at least one uppercase letter and one special symbol.');
            return;
        }
        
        if (firstname.length > 15 || lastname.length > 15 || password.length > 15) {
            alert('First name, last name, and password must not exceed 15 characters.');
            return;
        }

        if (role === 'Teacher' && classtoken !== 'JU8OS1B') {
            alert('Verification code invaild');
            return;
        }

        if (password !== confirmpassword) {
            alert('The passwords do not match.');
            return;
        }

        console.log({
            firstname,
            lastname,
            email,
            password,
            confirmpassword,
            role
        });

        const userData = {
            'username': email,
            'password': password,
            'cpassword': confirmpassword,
            'firstname': firstname,
            'lastname': lastname,
            'role': role
        };
        
        axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/SignupBackend.php', userData)
            .then(_response => {
                alert('Signup successful');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
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
                <input maxLength={15} placeholder="Enter your first name" name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" className="form-control" />
                <label className="control-label">Lastname</label>
                <input maxLength={15} placeholder="Enter your last name" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label className="control-label">Email</label>
                <input placeholder="Enter your email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
            </div>
            <div className="form-group">
                <label className="control-label">Password</label>
                <input 
                  placeholder="Enter your password" 
                  name="password" 
                  value={password} 
                  onChange={handlePasswordChange}
                  onFocus={() => setShowChecklist(true)}
                  onBlur={() => setShowChecklist(false)}
                  type="password" 
                  className="form-control" 
                />
                {showChecklist && (
                    <div className="password-checklist">
                        <ul>
                            <li className={isLongEnough ? 'valid' : 'invalid'}>
                                At least 8 characters
                            </li>
                            <li className={hasUppercase ? 'valid' : 'invalid'}>
                                At least one uppercase letter
                            </li>
                            <li className={hasSpecialChar ? 'valid' : 'invalid'}>
                                At least one special symbol
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="form-group">
                <label className="control-label">Confirm Password</label>
                <input placeholder="Confirm your password" name="confirmpassword" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" />
            </div>

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