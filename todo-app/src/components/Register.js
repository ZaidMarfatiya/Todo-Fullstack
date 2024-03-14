import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const Register = () => {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")

    const { registerUser } = useContext(AuthContext)

    const handleSubmit = async e => {
        e.preventDefault()
        registerUser(email, firstName, lastName, password)
    }

    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "#61919a" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row d-flex justify-content-center align-items-center row g-0">
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form onSubmit={handleSubmit}>
                                                <h5
                                                    className="fw-normal mb-3 pb-3"
                                                    style={{ letterSpacing: 1 }}
                                                >
                                                    Sign Up
                                                </h5>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="email"
                                                        id="form2Example17"
                                                        className="form-control form-control-lg"
                                                        placeholder="Email Address"
                                                        onChange={e => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="text"
                                                        id="form2Example27"
                                                        className="form-control form-control-lg"
                                                        placeholder="First Name"
                                                        onChange={e => setFirstName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="text"
                                                        id="form2Example37"
                                                        className="form-control form-control-lg"
                                                        placeholder="Last Name"
                                                        onChange={e => setLastName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        id="form2Example47"
                                                        className="form-control form-control-lg"
                                                        placeholder="Password"
                                                        onChange={e => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button
                                                        className="btn btn-dark btn-lg btn-block"
                                                        type="submit"
                                                    >
                                                        Register
                                                    </button>
                                                </div>
                                                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                                                    Already have an account?{" "}
                                                    <Link to="/login" style={{ color: "#393f81" }}>
                                                        Login Now
                                                    </Link>
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register