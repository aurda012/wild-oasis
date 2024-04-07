import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { sortArrayByFieldForStrings } from "../../utils/helpers";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resource="cabins" />;

  // 1) FILTER CABINS

  const filterValue = searchParams.get("discount") || "all";
  console.log(filterValue);

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) SORT CABINS
  const sortBy = searchParams.get("sortBy") || "createdAt-asc";
  const [field, order] = sortBy.split("-");
  const modifier = order === "asc" ? 1 : -1;
  let sortedCabins;
  if (field === "name") {
    sortedCabins = sortArrayByFieldForStrings(filteredCabins, field, order);
  } else {
    sortedCabins = filteredCabins.sort(
      (a, b) => (a[field] - b[field]) * modifier
    );
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
