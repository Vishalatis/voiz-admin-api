'use client';

import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  DataGrid,
  GridColDef,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridRowSelectionModel,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useGetTickets } from 'src/api/tickets';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import {
  IOpinionItem,
  IOpinionTableFilters,
  IOpinionTableFilterValue,
} from 'src/types/opinion-poll';

import OpinionPollFiltersResult from './opinion-table-filters-result';
import {
  RenderCellDesc,
  RenderCellRegion,
  RenderCellVotingCount,
  RenderCellPublishedDate,
} from './opinion-table-row';

// ----------------------------------------------------------------------

const defaultFilters: IOpinionTableFilters = {
  services: [],
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export default function OpinionPollView() {
  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();

  const { productsLoading } = useGetTickets();

  const [tableData, setTableData] = useState<IOpinionItem[]>([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  useEffect(() => {
    if (!productsLoading) {
      setTableData([
        {
          id: '1',
          region: 'BJP',
          img: '/6.png',
          votingCount: '40% - 50%',
          desc: 'Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus,',
          publishedDate: new Date(),
          includes(service: string): unknown {
            throw new Error('Function not implemented.');
          },
          service: '',
        },
      ]);
    }
  }, [productsLoading]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });

  const canReset = !isEqual(defaultFilters, filters);

  const handleFilters = useCallback((name: string, value: IOpinionTableFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      enqueueSnackbar('Delete success!');

      setTableData(deleteRow);
    },
    [enqueueSnackbar, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !selectedRowIds.includes(row.id));

    enqueueSnackbar('Delete success!');

    setTableData(deleteRows);
  }, [enqueueSnackbar, selectedRowIds, tableData]);

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(`${paths.dashboard.opinionPoll.details}/${id}`);
    },
    [router]
  );

  const columns: GridColDef[] = [
    {
      field: 'category',
      headerName: 'Category',
      filterable: false,
    },
    {
      field: 'region',
      headerName: 'Region',
      flex: 1,
      minWidth: 260,
      hideable: false,
      renderCell: (params) => <RenderCellRegion params={params} />,
    },
    {
      field: 'votingCount',
      headerName: 'Voting count',
      width: 160,
      renderCell: (params) => <RenderCellVotingCount params={params} />,
    },

    {
      field: 'desc',
      headerName: 'Description',
      width: 380,
      type: 'singleSelect',
      editable: true,

      renderCell: (params) => <RenderCellDesc params={params} />,
    },
    {
      field: 'publishedDate',
      headerName: 'Published Date',
      width: 180,
      type: 'singleSelect',
      editable: true,

      renderCell: (params) => <RenderCellPublishedDate params={params} />,
    },

    {
      type: 'actions',
      field: 'actions',
      headerName: ' Actions',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          onClick={() => handleViewRow(params.row.id)}
        />,

        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => handleDeleteRow(params.row.id)}
          sx={{ color: 'error.main' }}
        />,
      ],
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);
  return (
    <>
      <Container
        maxWidth={settings.themeStretch ? false : 'lg'}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CustomBreadcrumbs
          heading="Opinion Poll"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Opinion-Poll',
              href: paths.dashboard.opinionPoll.root,
            },
            { name: 'Opinion-Poll-List' },
          ]}
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
          }}
        />

        <Card
          sx={{
            height: { xs: 800, md: '100vh' },
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            flexDirection: { md: 'column' },
          }}
        >
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={productsLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            onRowSelectionModelChange={(newSelectionModel) => {
              setSelectedRowIds(newSelectionModel);
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            sx={{
              '& .MuiDataGrid-root': {
                border: '2px solid rgba(224, 224, 224, 1)', // Outer border for the entire grid
              },
              '& .MuiDataGrid-cell': {
                border: '1px solid rgba(224, 224, 224, 1)', // Border around each cell
              },
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: '2px solid rgba(224, 224, 224, 1)', // Border under the headers
              },
              '& .MuiDataGrid-row': {
                borderBottom: '1px solid rgba(224, 224, 224, 1)', // Row bottom border
              },
              '& .MuiDataGrid-columnHeader': {
                borderRight: '1px solid rgba(224, 224, 224, 1)', // Borders between column headers
              },
              '& .MuiDataGrid-columnHeader:last-child': {
                borderRight: 'none', // No border on the rightmost header
              },
              '& .MuiDataGrid-row:last-child': {
                borderBottom: 'none', // No border under the last row
              },
            }}
            slots={{
              toolbar: () => (
                <>
                  <GridToolbarContainer>
                    <GridToolbarQuickFilter />

                    <Stack
                      spacing={1}
                      flexGrow={1}
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      {!!selectedRowIds.length && (
                        <Button
                          size="small"
                          color="error"
                          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                          onClick={confirmRows.onTrue}
                        >
                          Delete ({selectedRowIds.length})
                        </Button>
                      )}

                      <GridToolbarColumnsButton />
                      <GridToolbarFilterButton />
                      <GridToolbarExport />
                    </Stack>
                  </GridToolbarContainer>

                  {canReset && (
                    <OpinionPollFiltersResult
                      filters={filters}
                      onFilters={handleFilters}
                      onResetFilters={handleResetFilters}
                      results={dataFiltered.length}
                      sx={{ p: 2.5, pt: 0 }}
                    />
                  )}
                </>
              ),
              noRowsOverlay: () => <EmptyContent title="No Data" />,
              noResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
            slotProps={{
              columnsPanel: {
                getTogglableColumns,
              } as any,
            }}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selectedRowIds.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirmRows.onFalse();
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
  filters,
}: {
  inputData: IOpinionItem[];
  filters: IOpinionTableFilters;
}) {
  const { services } = filters;

  if (services.length) {
    inputData = inputData.filter((product) => services.includes(product.service));
  }

  return inputData;
}
