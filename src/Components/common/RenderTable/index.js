/* eslint-disable */
import React from "react";
import {
  useTable,
  usePagination,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useRowSelect,
} from "react-table";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
// import InputBase from '@material-ui/core/InputBase'
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "./TablePaginationActions";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import matchSorter from "match-sorter";
import PropTypes from "prop-types";
import "./RenderTable.css";
import TableToolbar from "./TableToolbar";

const guid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  DefaultColumnFilter.propTypes = {
    column: PropTypes.object,
  };

  DefaultColumnFilter.defaultProps = {
    column: {},
  };
  
  const count = preFilteredRows.length;

  return (
    <input
      className="inputField"
      value={filterValue || ""}
      className="search"
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

const RenderTable = (props) => {
  // Use the state and functions returned from useTable to build your UI
  RenderTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    showFilter: PropTypes.bool,
    showPagination: PropTypes.bool,
    header: PropTypes.string,
    addNewData: PropTypes.func,
    showTableToolbar: PropTypes.bool,
  };

  RenderTable.defaultProps = {
    columns: [],
    data: [],
    showFilter: true,
    showPagination: true,
    header: "",
    addNewData: null,
    showTableToolbar: false,
  };

  const {
    columns,
    data,
    showFilter,
    header,
    addNewData,
    showTableToolbar,
    showPagination,
  } = props;

  const hiddenColumns = [
    "id",
    "Is Active",
    "Higher Office",
    "Duty id",
    "Job Nature id",
    "Designation id",
    "Duty Area id",
    "Organization Id",
    "Job Nature id",
    "Approver Id",
    "Leave Name Id",
    "Employee Id",
    "Password",
    "Manager Id",
  ];

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <Checkbox ref={resolvedRef} {...rest} />
        </>
      );
    }
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
    // rows,
    // allColumns,
    // getToggleHideAllColumnsProps,
    setHiddenColumns,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageindex: 0 },
      defaultColumn,
      filterTypes,
      initialState: {
        hiddenColumns,
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  React.useEffect(() => {
    setHiddenColumns(hiddenColumns);
  }, []);

  // Render the UI for your table

  const deleteUserHandler = () => {};

  const addUserHandler = () => {
    addNewData();
  };

  return (
    <>
      <TableContainer style={{ overflowX: "auto" }}>
        {showTableToolbar && (
          <TableToolbar
            numSelected={Object.keys(selectedRowIds).length}
            deleteUserHandler={deleteUserHandler}
            header={header}
            addUserHandler={addUserHandler}
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            globalFilter={globalFilter}
          />
        )}

        <MaUTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell key={guid()} {...column.getHeaderProps()}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      {showFilter && (
                        <div>
                          {column.canFilter ? column.render("Filter") : null}
                        </div>
                      )}
                      <div
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                      </div>

                      {/* Render the columns filter UI */}
                      {column.id !== "selection" ? (
                        <TableSortLabel
                          active={column.isSorted}
                          // react-table has a unsorted state which is not treated here
                          direction={column.isSortedDesc ? "desc" : "asc"}
                        />
                      ) : null}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} key={guid()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()} key={guid()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MaUTable>
        {
          <TableFooter>
            <TableRow key={guid()}>
              <TablePagination
                key={guid()}
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  { label: "All", value: data.length },
                ]}
                colSpan={3}
                count={data.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        }
      </TableContainer>
    </>
  );
};

export default RenderTable;
