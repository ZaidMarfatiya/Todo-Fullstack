import React, { useEffect, useState } from 'react'
import { useAxios } from '../utils/useAxios'

const Profile = () => {
    const baseUrl = "http://127.0.0.1:8000/api";
    const api = useAxios();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get(`${baseUrl}/profile/`);
            const data = response.data;

            setFormData({
                first_name: data.first_name,
                last_name: data.last_name
            });
        } catch (error) {}
    };

    const changeHandler = event => {
        setFormData(prevFormData => {
            const newFormData = {
                ...prevFormData,
                [event.target.name]: event.target.value
            };
            return newFormData;
        });
    };

    const submitForm = async () => {
        await api.patch(`${baseUrl}/profile/`, formData);
    };

    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "#61919a" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row d-flex justify-content-center align-items-center g-0">
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <div className="col p-2">
                                                <h4>Profile Details</h4>
                                            </div>
                                            <form onSubmit={submitForm}>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example27">
                                                        First Name:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.first_name}
                                                        id="form2Example27"
                                                        className="form-control form-control-lg"
                                                        onChange={changeHandler}
                                                        name="first_name"

                                                    />
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example37">
                                                        Last Name:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.last_name}
                                                        id="form2Example37"
                                                        className="form-control form-control-lg"
                                                        onChange={changeHandler}
                                                        name="last_name"

                                                    />
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button
                                                        className="btn btn-dark btn-lg btn-block"
                                                        type="submit"
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Profile
