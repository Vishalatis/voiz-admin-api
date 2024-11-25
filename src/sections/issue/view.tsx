'use client';

import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// eslint-disable-next-line import/no-extraneous-dependencies
import axiosInstance from 'src/utils/axios';
import { useAuthContext } from 'src/auth/hooks';

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

import { ISocialItem, ISocialTableFilters, ISocialTableFilterValue } from 'src/types/social-issues';

import SocialTableFiltersResult from './social-table-filters-result';
import {
  RenderCellLike,
  RenderCellName,
  RenderCellShare,
  RenderCellViews,
  RenderCellComments,
  RenderCellLocation,
  RenderCellPublishedDate,
} from './social-table-row';


// ----------------------------------------------------------------------

const defaultFilters: ISocialTableFilters = {
  services: [],
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export default function SocialIssueView() {
  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();

  const { productsLoading } = useGetTickets();

  const { user } = useAuthContext();
  const userRole = user?.role;
  const userLocation = user?.location;
  console.log("this is an location",userLocation )

  console.log(userRole);
  console.log(userRole);

  // const [tableData, setTableData] = useState<ISocialItem[]>([]);

  
  const [tableData, setTableData] = useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axiosInstance.get('/api/posts');
  //       if (response.data.success) {
  //         const formattedData = response.data.data.map(post => ({
  //           id: post._id,
  //           title: post.postText,
  //           postImg: post.img,
  //           publishedDate: post.createdAt,
  //           location: post.location, // Since location is not in API response
  //           views: '0', // Not in API response
  //           likes: post.likeCount.toString(),
  //           comments: post.commentCount.toString(),
  //           share: '0' // Not in API response
  //         }));
  //         setTableData(formattedData);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       enqueueSnackbar('Error fetching posts', { variant: 'error' });
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const endpoint = userRole === 'admin' 
          ? '/api/posts' 
          : `/api/posts/location/${userLocation}`;
          
        const response = await axiosInstance.get(endpoint);
        
        if (response.data.success) {
          const formattedData = response.data.data.map((post: {
            _id: string
            postText: string
            img: string
            createdAt: string
            location: string
            likeCount: any
            commentCount: any
          }) => ({
            id: post._id,
            title: post.postText,
            postImg: post.img,
            publishedDate: post.createdAt,
            location: post.location,
            views: '0',
            likes: post.likeCount.toString(),
            comments: post.commentCount.toString(),
            share: '0'
          })) 
          setTableData(formattedData);
        }
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Error fetching posts', { variant: 'error' });
      }
    };
  
    fetchPosts();
  }, [userRole, enqueueSnackbar, userLocation]);
  

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });

  const canReset = !isEqual(defaultFilters, filters);

  const handleFilters = useCallback((name: string, value: ISocialTableFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleDeleteRow = ()=> (
    console.log('delete')
    // (id: string) => {
    //   const deleteRow = tableData.filter((row) => row.id !== id);

    //   enqueueSnackbar('Delete success!');

    //   setTableData(deleteRow);
    // },
    // [enqueueSnackbar, tableData]
  );

  // const handleDeleteRows = useCallback(() => {
  //   const deleteRows = tableData.filter((row) => !selectedRowIds.includes(null));

  //   enqueueSnackbar('Delete success!');

  //   setTableData(deleteRows);
  // }, [enqueueSnackbar, selectedRowIds, tableData]);

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(`${paths.dashboard.socialIssues.details}/${id}`);
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
      field: 'title',
      headerName: 'Image & Title',
      flex: 1,
      minWidth: 260,
      hideable: false,
      renderCell: (params) => <RenderCellName params={params} />,
    },
    {
      field: 'publishedDate',
      headerName: 'Published Date',
      width: 160,
      renderCell: (params) => <RenderCellPublishedDate params={params} />,
    },

    {
      field: 'location',
      headerName: 'Location',
      width: 180,
      type: 'singleSelect',
      editable: true,

      renderCell: (params) => <RenderCellLocation params={params} />,
    },

    {
      field: 'views',
      headerName: 'Total Views',
      width: 180,
      editable: true,

      renderCell: (params) => <RenderCellViews params={params} />,
    },
    {
      field: 'likes',
      headerName: 'Total Likes',
      width: 180,
      editable: true,

      renderCell: (params) => <RenderCellLike params={params} />,
    },
    {
      field: 'comments',
      headerName: 'Total Comments',
      width: 180,
      editable: true,

      renderCell: (params) => <RenderCellComments params={params} />,
    },
    {
      field: 'share',
      headerName: 'Total Share',
      width: 180,
      editable: true,

      renderCell: (params) => <RenderCellShare params={params} />,
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
          onClick={() => handleDeleteRow()}
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
          heading=" Issues"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Issues',
              href: paths.dashboard.socialIssues.root,
            },
            { name: 'Issues-List' },
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
                    <SocialTableFiltersResult
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
              // handleDeleteRows();
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
  inputData: ISocialItem[];
  filters: ISocialTableFilters;
}) {
  const { services } = filters;

  if (services.length) {
    inputData = inputData.filter((product) => services.includes(product.service));
  }

  return inputData;
}
