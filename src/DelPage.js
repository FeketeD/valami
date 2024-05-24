import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

export default function ChessDel(props) {
    const params = useParams();
    const id = params.itemId;
    const navigate = useNavigate();
    const [item, setItem] = useState([]);
    const [isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const res = await fetch(``)
                const item = await res.json();
                setItem(item);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setPending(false);
            }
        })
            ();
    }, [id]);
    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !item.id ? (
                <div className="spinner-border"></div>
            ) : (
                <div className="card p-3">
                    <div className="card-body">
                        <h5 className="card-title">Biztosan törlöd ezt az itemet? <br /><span className='text-danger'>{item.name}</span></h5>
                        <div className="lead">Születési idő: {item.birth_date}</div>
                        <img alt={item.name}
                            className="img-fluid rounded"
                            style={{ maxHeight: "500px" }}
                            src={item.image_url ? item.image_url :
                                "https://via.placeholder.com/400x800"}
                        />
                    </div>
                    <form onSubmit={(event) => {

                        event.persist();
                        event.preventDefault();
                        fetch(`https://chess.sulla.hu/chess/${id}`, {
                            method: "DELETE",
                        })
                            .then(() => {
                                navigate("/");
                            })
                            .catch(console.log);
                    }}>
                        <div>
                            <NavLink to={"/"}>
                                <button className="btn btn-success bi bi-backspace">Mégsem</button>
                            </NavLink>
                            <button className="btn btn-danger bi bi-trash3">Törlés</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}