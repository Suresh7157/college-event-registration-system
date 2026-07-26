function Navbar() {

    return (

        <div className="admin-navbar">

            <h3 className="mb-0">
                Admin Dashboard
            </h3>

            <div className="d-flex align-items-center">

                <i className="bi bi-bell fs-4 me-4"></i>

                <div className="d-flex align-items-center">

                    <i className="bi bi-person-circle fs-2 me-2"></i>

                    Administrator

                </div>

            </div>

        </div>

    );

}

export default Navbar;