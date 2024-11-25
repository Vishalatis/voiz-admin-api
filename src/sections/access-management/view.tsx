'use client';

import isEqual from 'lodash/isEqual';
import { useState, useCallback, useEffect } from 'react';

import {
  Card,
  Table,
  Button,
  Tooltip,
  Container,
  TableBody,
  IconButton,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  Stack,
} from '@mui/material';
import axiosInstance from 'src/utils/axios';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { _ministry, _legislativeList } from 'src/_mock';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import {
  ILegislativeItem,
  ILegislativeTableFilters,
  ILegislativeTableFilterValue,
} from 'src/types/legislative';

// import LegislativeTableRow from './inDepthCase-table-row';
// import LegislativeTableToolbar from './inDepthCase-table-toolbar';
// import LegislativeTableFiltersResult from './inDepthCase-table-filters-result';

import AccessManagementTableRow from './accessManagement-table-row';
import AccessManagementTableToolbar from './accessManagement-table-toolbar';
import AccessManagementTableFiltersResult from './accessManagement-table-filters-result';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Full Name' },
  { id: 'role', label: 'Role', width: 180 },
  { id: 'createAt', label: 'Created At', width: 220 },
  { id: 'action', label: 'Action', width: 88 },
];

const defaultFilters: ILegislativeTableFilters = {
  name: '',
  ministry: [],
};

// ----------------------------------------------------------------------

export default function AccesssManagementView() {
  // const { enqueueSnackbar } = useSnackbar();
  // const table = useTable();
  // const settings = useSettingsContext();
  // const router = useRouter();
  // const confirm = useBoolean();

  // const [tableData, setTableData] = useState<ILegislativeItem[]>(
  //   _legislativeList.map((item) => ({
  //     ...item,
  //   }))
  // );

  const { enqueueSnackbar } = useSnackbar();
  const table = useTable();
  const settings = useSettingsContext();
  const router = useRouter();
  const confirm = useBoolean();

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users data
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/auth/users');
      if (response.data.success) {
        setTableData(response.data.data);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to fetch users', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);


  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 76;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: ILegislativeTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row: { id: string }) => row.id !== id);
      enqueueSnackbar('Delete success!');
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, enqueueSnackbar, table, tableData]
  );

  // const handleDeleteRows = useCallback(() => {
  //   const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
  //   enqueueSnackbar('Delete success!');
  //   // setTableData(deleteRows);
  //   table.onUpdatePageDeleteRows({
  //     totalRowsInPage: dataInPage.length,
  //     totalRowsFiltered: dataFiltered.length,
  //   });
  // }, [dataFiltered.length, dataInPage.length, enqueueSnackbar, table, tableData]);

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.user.root);
    },
    [router]
  );

  interface User {
    _id: string;
    name: string;
    userName: string;
    phone: string;
    role: string;
    createdAt: string;
  }

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Access Management"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Access Management', href: paths.dashboard.inDepthCaseStudy.root },
            { name: 'Access Management Updates' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.accessManagement.createAccessManagement}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Create Access Management
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {/* <Card>
          <AccessManagementTableToolbar
            filters={filters}
            onFilters={handleFilters}
            roleOptions={_ministry}
          />

          {canReset && (
            <AccessManagementTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              onResetFilters={handleResetFilters}
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <AccessManagementTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card> */}

<Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((user) => (
              <TableRow key={(user as User)._id}>
            <TableCell>{(user as User).name}</TableCell>
  <TableCell>{(user as User).userName}</TableCell>
  <TableCell>{(user as User).phone}</TableCell>
  <TableCell>{(user as User).role}</TableCell>
  <TableCell>{new Date((user as User).createdAt).toLocaleDateString()}</TableCell>

                    <TableCell>
  <Stack direction="row" spacing={1}>
    <IconButton 
      color="primary" 
      // onClick={() => handleEditRow(user._id)}
    >
      <Iconify icon="eva:edit-fill" />
    </IconButton>

    <IconButton 
      color="error" 
      // onClick={() => handleDeleteRow(user._id)}
    >
      <Iconify icon="eva:trash-2-outline" />
    </IconButton>
  </Stack>
</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>


      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={`Are you sure you want to delete ${table.selected.length} items?`}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              // handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: ILegislativeItem[];
  comparator: (a: any, b: any) => number;
  filters: ILegislativeTableFilters;
}) {
  const { name, ministry } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter((item) => item.title.toLowerCase().includes(name.toLowerCase()));
  }

  if (ministry.length) {
    inputData = inputData.filter((item) => ministry.includes(item.ministry));
  }

  return inputData;
}
