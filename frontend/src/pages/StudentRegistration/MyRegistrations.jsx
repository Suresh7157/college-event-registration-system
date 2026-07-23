import Navbar from "../../components/common/Navbar";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

function MyRegistrations() {

    const registrations = [

        {
            id:1,
            event:"Hackathon 2026",
            date:"10 Aug 2026",
            status:"Approved"
        },

        {
            id:2,
            event:"Web Development Workshop",
            date:"15 Aug 2026",
            status:"Pending"
        },

        {
            id:3,
            event:"AI Seminar",
            date:"20 Aug 2026",
            status:"Approved"
        }

    ];

    return (

        <>
            <Navbar />

            <div className="container py-4">

                <h2 className="fw-bold mb-4">
                    My Registrations
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
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {registrations.map((registration,index)=>(

                            <tr key={registration.id}>

                                <td>{index+1}</td>

                                <td>{registration.event}</td>

                                <td>{registration.date}</td>

                                <td>

                                    <Badge
                                        bg={
                                            registration.status==="Approved"
                                                ?"success"
                                                :"warning"
                                        }
                                    >
                                        {registration.status}
                                    </Badge>

                                </td>

                                <td>

                                    <Button
                                        variant="danger"
                                        size="sm"
                                    >
                                        Cancel
                                    </Button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </Table>

            </div>

        </>

    );

}

export default MyRegistrations;