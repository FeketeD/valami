import { useNavigate } from "react-router-dom";

export default function ChessCreate() {
    const navigate = useNavigate();
    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Új sakkozó</h2>
            <form
                onSubmit={(event) => {
                    event.persist();
                    event.preventDefault();
                    fetch(``, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },

                        body: JSON.stringify({
                            name: event.target.elements.name.value,
                            birth_date: event.target.elements.birth_date.value,
                            world_ch_won: event.target.elements.world_ch_won.value,
                            profile_url: event.target.elements.profile_url.value,
                            image_url: event.target.elements.image_url.value,
                        }),
                    })
                        .then(() => {
                            navigate("/");
                        })
                        .catch(console.log);
                }}>
                <div style={{position: "absolute", left: "50%", transform: 'translate(-50%)', width: '30%'}}>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label text-end">Item neve:</label>
                        <div className="col-sm-9">
                            <input type="text" name="name" className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label text-end">Születési dátuma:</label>
                        <div className="col-sm-9">
                            <input type="date" name="birth_date" className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label text-end">Valami:</label>
                        <div className="col-sm-9">
                            <input type="number" name="world_ch_won" className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label text-end">Profil URL-je:</label>
                        <div className="col-sm-9">
                            <input type="text" name="profile_url" className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label text-end">Kép URL-je:</label>
                        <div className="col-sm-9">
                            <input type="text" name="image_url" className="form-control" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success">
                        Küldés
                    </button>
                </div>

            </form>
        </div>
    );
}