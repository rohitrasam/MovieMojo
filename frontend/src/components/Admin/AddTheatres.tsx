import React, { useState } from "react";
import axios from 'axios';
import "./AdminDashboard.css";
import AdminBar from "./AdminBar";
import { Link } from "react-router-dom";

const AddTheatres: React.FC = () => {
    const [tName, setTname] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('', { 
                name: tName,
            });

            if (response.data.success) {
                setSuccess("Theatre has been added!!");
                setTname('');
            } else {
                setError("Something went wrong");
            }
        } catch (err) {
            setError("Please try again");
        }
    };

    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper">
                <AdminBar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">Add Theatre</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/admindashboard">Dashboard</Link></li>
                                </ol>
                            </nav>
                        </div>
                       
                            <div className="row">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title" style={{ textAlign: 'center' }}>Add Theatre</h4>
                                            <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputName1">Theatre Name</label>
                                                <input
                                                    type="text"
                                                    id="tName"
                                                    value={tName}
                                                    onChange={(e) => setTname(e.target.value)}
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="tName">Theatre Address</label>
                                                <input
                                                    type="text"
                                                    id="tName"
                                                    value={tName}
                                                    onChange={(e) => setTname(e.target.value)}
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="tName">Theatre Name</label>
                                                <input
                                                    type="text"
                                                    id="tName"
                                                    value={tName}
                                                    onChange={(e) => setTname(e.target.value)}
                                                    className="form-control"
                                                />
                                            </div>




                                            <button type="submit" className="btn btn-primary">Add</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {success && <p className="alert alert-success">{success}</p>}
                        {error && <p className="alert alert-danger">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTheatres;
