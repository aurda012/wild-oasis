import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();

  const {
    id: cabinId,
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `${name} (Copy)`,
      image,
      description,
      maxCapacity,
      regularPrice,
      discount,
    });
  }

  return (
    <Table.Row role="row">
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>{maxCapacity} Guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <div>
        <button onClick={handleDuplicate} disabled={isCreating}>
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.Open opens="edit">
            <button disabled={isDeleting}>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          <Modal.Open opens="delete">
            <button disabled={isDeleting}>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabin"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />
          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>
            <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
