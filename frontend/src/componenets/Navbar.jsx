import { Link } from "react-router-dom";

function Navbar()
{
    const user_role=localStorage.getItem('user_role');
    return(
    <>
        <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
            <Link className="navbar-brand fs-1 fw-bold " to="/">WORKER CLIENT</Link>
            <div className="row">
                <div className="col-1 text-end">
                    <div className="d-flex justify-content-end">
                    {user_role &&
                        <Link to={'/notification'}  className="btn btn-info fs-4 me-2 fw-medium">🔔</Link>
                    }
                    </div>
                </div>
                <div className="col-10 text-end">
                    <Link to={'/profile'} className="btn btn-info fs-4 me-2 fw-medium">PROFILE</Link>
                </div>
            </div>
        </div>
        </nav>

    </>
    )
}
export default Navbar;