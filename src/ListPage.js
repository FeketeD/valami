import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default function ChessList() {

  const [items, setItem] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("")
      .then((response) => response.data)
      .then((data) => setItem(data))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [])

  return (
    <div className='p-5 m-auto text-center content bg-ivory'>
      {isLoading ? (
        <div className='spinner-border'></div>
      ) : (
        <div>
          <p className='h1'>Itemek</p>
          {items.map((item, index) => (
            <div className='card col-sm-3 d-inline-block m-1 p-2' key={index}>
              <p className='h5'>{item.name}</p>
              <p className="">{item.birth_date}</p>
              <p className="text-info">{item.world_ch_won}</p>
              <div className="card-body">
                <NavLink key={item.id} to={"/item/" + item.id}>
                  <img alt={item.name}
                    className="img-fluid"
                    style={{ maxHeight: 200 }}
                    src={item.image_url ? item.image_url :
                      "https://via.placeholder.com/400x800"} /></NavLink>
                <br />
                <NavLink to={item.profile_url} target="_blank">Wikipédia link</NavLink><br />
                <NavLink to={"/mod-item/" + item.id}>
                  <button className='btn btn-warning bi bi-pencil' style={{ fontSize: "1rem" }}>
                    Módosítás
                  </button>
                </NavLink> &nbsp;&nbsp;
                <NavLink to={"/del-item/" + item.id}>
                  <button className='btn btn-danger bi bi-trash3' style={{ fontSize: "1rem" }}>
                    Törlés
                  </button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
