function StatCard({ title, value, icon, color }) {

    return (

        <div className="col-lg-3 col-md-6 mb-4">

            <div className="card stat-card">

                <div className="card-body d-flex justify-content-between align-items-center">

                    <div>

                        <h6 className="text-muted">
                            {title}
                        </h6>

                        <h2 className="fw-bold">
                            {value}
                        </h2>

                    </div>

                    <div className={`icon-circle bg-${color}`}>

                        <i className={icon}></i>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default StatCard;