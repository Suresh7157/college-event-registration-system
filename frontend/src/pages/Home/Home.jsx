import Navbar from "../../components/common/Navbar";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <Navbar />

            <div className="container text-center mt-5">

                <h1 className="display-4 fw-bold">
                    College Event Registration
                </h1>

                <p className="lead">
                    Register for technical, cultural, sports and workshop events.
                </p>

                <Link to="/events">
                    <button className="btn btn-primary btn-lg mt-3">
                        View Events
                    </button>
                </Link>

            </div>
        </>
    );
}

export default Home;