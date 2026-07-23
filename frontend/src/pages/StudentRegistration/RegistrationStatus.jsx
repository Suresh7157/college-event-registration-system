import Navbar from "../../components/common/Navbar";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

function RegistrationStatus() {

    const registrations = [

        {
            id:1,
            event:"Hackathon 2026",
            appliedOn:"10 Aug 2026",
            status:"Approved"
        },

        {
            id:2,
            event:"Web Development Workshop",
            appliedOn:"15 Aug 2026",
            status:"Pending"
        },

        {
            id:3,
            event:"AI Seminar",
            appliedOn:"20 Aug 2026",
            status:"Rejected"
        }

    ];

    const getBadge = (status) => {

        switch(status){

            case "Approved":
                return "success";

            case "Pending":
                return "warning";

            case "Rejected":
                return "danger";

            default:
                return "secondary";
        }

    };

    return (

        <>
            <Navbar />

            <div className="container py-4">

                <h2 className="fw-bold mb-4">
                    Registration Status
                </h2>

                <Table
                    striped
                    bordered
                    hover
                    responsive
                >

                    <thead className="table-primary">

                        <tr>

                            <th>#</th>
                            <th>Event</th>
                            <th>Applied On</th>
                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {registrations.map((registration,index)=>(

                            <tr key={registration.id}>

                                <td>{index+1}</td>

                                <td>{registration.event}</td>

                                <td>{registration.appliedOn}</td>

                                <td>

                                    <Badge
                                        bg={getBadge(registration.status)}
                                    >
                                        {registration.status}
                                    </Badge>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </Table>

            </div>

        </>

    );

}

export default RegistrationStatus;