import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingsTable from "../features/bookings/BookingsTable";
import BookingsTableOperations from "../features/bookings/BookingsTableOperations";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Bookings</Heading>
        <BookingsTableOperations />
      </Row>
      <BookingsTable />
    </>
  );
}

export default Bookings;
