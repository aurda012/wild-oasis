import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckout } from "../check-in-out/useCheckout";
import { useBooking } from "./useBooking";
import { useDeleteBooking } from "./useDeleteBooking";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();

  const { booking, isLoading } = useBooking();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check In
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              disabled={isCheckingOut}
              onClick={() => checkout(bookingId)}
            >
              Check Out
            </Button>
          )}
          {status !== "checked-in" && (
            <Modal.Open opens="delete">
              <Button variation="danger">Delete</Button>
            </Modal.Open>
          )}
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
        <Modal.Window name="delete">
          <ConfirmDelete
            resource="booking"
            disabled={isDeleting}
            onConfirm={() => {
              deleteBooking(bookingId, { onSettled: navigate("/bookings") });
            }}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
