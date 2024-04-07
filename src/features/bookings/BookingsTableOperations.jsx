import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingsTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by Date (Upcoming)" },
          { value: "startDate-asc", label: "Sort by Date (Past)" },
          {
            value: "totalPrice-desc",
            label: "Sort by Amount (Highest)",
          },
          { value: "totalPrice-asc", label: "Sort by Amount (Lowest)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingsTableOperations;
