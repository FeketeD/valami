import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';

export default function ChessSingle() {
    const params = useParams();
    const id = params.itemId;
    const [item, setItem] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get(``)
            .then((res) => res.data)
            .then((data) => setItem(data))
            .catch(console.log)
            .finally(() => {
                setLoading(false);
            });
    }
        , [id]);


    return (
        <div className="py-5 m-auto text-center content bg-lavender container">
            {isLoading || !item.id ? (
                <div className="spinner-border"></div>
            ) : (
                <div className="card p-1">
                    <div className="card-body d-flex justify-content-around align-items-center">
                        <img alt={item.name}
                            className="img-fluid rounded"
                            style={{ maxHeight: "500px" }}
                            src={item.image_url ? item.image_url :
                                "https://via.placeholder.com/400x800"}
                        />
                        <div className='flex-column'>
                            <h5 className="card-title">item neve: {item.name}</h5>
                            <div className="lead">Születési dátuma: {item.birth_date}</div>
                            <div className="lead">Valami: {item.world_ch_won}</div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between mx-3'>
                        <div>
                            <NavLink to={item.profile_url} target="_blank">{item.profile_url}</NavLink>
                        </div>
                        <br />
                        <div>
                            <NavLink to="/">
                                <button className='btn btn-primary bi bi-backspace mx-1'>
                                    &nbsp;Vissza
                                </button>
                            </NavLink>
                            <NavLink to={"/mod-item/" + item.id}>
                                <button className='btn btn-warning bi bi-pencil mx-1'>
                                    &nbsp;Módosítás
                                </button>
                            </NavLink>
                            <NavLink to={"/del-item/" + item.id}>
                                <button className='btn btn-danger bi bi-trash3 mx-1'>
                                    &nbsp;Törlés
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}