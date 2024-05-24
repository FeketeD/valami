import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ChessMod(props) {
    const params = useParams();
    const id = params.itemId;
    const navigate = useNavigate();
    const [item, setItem] = useState({
        name: '',
        birth_date: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: ''
    });
    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await axios.get(``);
                setItem(response.data);
            } catch (error) {
                console.log('Error fetching chess data:', error);
            }
        };

        fetchItemData();
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`https://chess.sulla.hu/chess/${id}`, item)
            .then(() => {
                navigate("/");
            })
            .catch(error => {
                console.log('Error updating item data:', error);
            });
    };

    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Sakkozó módosítása</h2>
            <form onSubmit={handleSubmit} style={{position: "absolute", left: "50%", transform: 'translate(-50%)'}}>

                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label text-end">item név:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" defaultValue={item.name} onChange={handleInputChange} style={{width: "20vw"}} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label text-end">Születési dátum:</label>
                    <div className="col-sm-9">
                        <input type="date" name="birth_date" className="form-control" defaultValue={item.birth_date} onChange={handleInputChange} style={{width: "20vw"}} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label text-end">Nyert világbajnokságok:</label>
                    <div className="col-sm-9">
                        <input type="number" name="world_ch_won" className="form-control" value={item.world_ch_won.toString()} onChange={handleInputChange} style={{width: "20vw"}} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label text-end">Profil URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="profile_url" className="form-control" defaultValue={item.profile_url} onChange={handleInputChange} style={{width: "20vw"}} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label text-end">Kép URL-je:</label>
                    <div className="col-sm-9 d-flex flex-column">
                        <input type="text" name="image_url" className="form-control" defaultValue={item.image_url} onChange={handleInputChange} style={{width: "20vw"}} />
                        <img src={item.image_url} height="200px" className='mx-5' alt={item.name} style={{width: "15vw"}} />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Küldés</button>
            </form>
        </div>
    );
}