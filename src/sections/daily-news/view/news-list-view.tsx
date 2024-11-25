"use client";

import { useState, useEffect, useCallback } from "react";
import isEqual from "lodash/isEqual";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridColumnVisibilityModel,
  GridRowSelectionModel,
} from "@mui/x-data-grid";

import axiosInstance from "src/utils/axios";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";
import { RouterLink } from "src/routes/components";

import { useBoolean } from "src/hooks/use-boolean";
import { useGetProducts } from "src/api/product";

import Iconify from "src/components/iconify";
import { useSnackbar } from "src/components/snackbar";
import EmptyContent from "src/components/empty-content";
import { ConfirmDialog } from "src/components/custom-dialog";
import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

import { INewsItem, INewsTableFilters, INewsTableFilterValue } from "src/types/news";
import DailyNewsTableToolbar from "../news-table-toolbar";
import DailyNewsTableFiltersResult from "../news-table-filters-result";
import { RenderCellPublish, RenderCellProduct, RenderCellCreatedAt } from "../news-table-row";

// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = [
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

const defaultFilters: INewsTableFilters = {
  publish: [],
  stock: [],
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ["category", "actions"];

// ----------------------------------------------------------------------

export default function DailyNewsListView() {
  const { enqueueSnackbar } = useSnackbar();
  const confirmRows = useBoolean();
  const router = useRouter();
  const settings = useSettingsContext();
  const { products, productsLoading } = useGetProducts();

  const [tableData, setTableData] = useState<INewsItem[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [loading, setLoading] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get("/api/news");
        console.log("API Response:", data); // Log entire API response

        if (data.success && isMounted) {
          setTableData(
            data.data.map((post: any) => ({
              id: post._id || post.id || Math.random().toString(), // Fallback to random ID
              title: post.title || "Untitled",
              image: post.image || "",
              createdAt: post.createdAt || new Date().toISOString(),
              publish: post.publish || "draft",
            }))
          );
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        enqueueSnackbar("Error fetching news data", { variant: "error" });
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNews();
    return () => {
      isMounted = false;
    };
  }, [enqueueSnackbar]);

  const dataFiltered = applyFilter({ inputData: tableData, filters });

  const handleFilters = useCallback((name: string, value: INewsTableFilterValue) => {
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
      setTableData((prevData) => prevData.filter((row) => row.id !== id));
      enqueueSnackbar("Delete success!");
    },
    [enqueueSnackbar]
  );

  const handleDeleteRows = useCallback(() => {
    setTableData((prevData) => prevData.filter((row) => !selectedRowIds.includes(row.id)));
    enqueueSnackbar("Delete success!");
  }, [enqueueSnackbar, selectedRowIds]);

  const handleEditRow = useCallback(
    (id: string) => router.push(paths.dashboard.dailyNews.root),
    [router]
  );
  const handleViewRow = useCallback(
    (id: string) => router.push(paths.dashboard.dailyNews.root),
    [router]
  );

  const columns: GridColDef[] = [
    { field: "category", headerName: "Category", filterable: false },
    {
      field: "name",
      headerName: "Title",
      flex: 1,
      minWidth: 160,
      renderCell: RenderCellProduct,
    },
    {
      field: "createdAt",
      headerName: "Published Date",
      width: 160,
      renderCell: RenderCellCreatedAt,
    },
    {
      field: "publish",
      headerName: "Publish",
      width: 110,
      type: "singleSelect",
      editable: true,
      valueOptions: PUBLISH_OPTIONS,
      renderCell: RenderCellPublish,
    },
    {
      type: "actions",
      field: "actions",
      headerName: " ",
      align: "right",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          onClick={() => handleViewRow(params.row.id)}
        />,
        <GridActionsCellItem
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.id)}
        />,
        <GridActionsCellItem
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => handleDeleteRow(params.row.id)}
          sx={{ color: "error.main" }}
        />,
      ],
    },
  ];

  return (
    <>
      <Container
        maxWidth={settings.themeStretch ? false : "lg"}
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <CustomBreadcrumbs
          heading="Daily News List"
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            { name: "Daily News", href: paths.dashboard.dailyNews.root },
            { name: "Daily News List" },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.dailyNews.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Daily News
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered} // Use unfiltered data
            columns={columns}
            loading={loading || productsLoading}
            getRowHeight={() => "auto"}
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={setColumnVisibilityModel}
            slots={{
              toolbar: () => (
                <>
                  <GridToolbarContainer>
                    <DailyNewsTableToolbar
                      filters={filters}
                      onFilters={handleFilters}
                      publishOptions={PUBLISH_OPTIONS}
                    />
                    <GridToolbarQuickFilter />
                    <Stack spacing={1} direction="row" justifyContent="flex-end">
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
                    </Stack>
                  </GridToolbarContainer>
                  {!!dataFiltered.length && (
                    <DailyNewsTableFiltersResult
                      filters={filters}
                      onResetFilters={handleResetFilters}
                    />
                  )}
                </>
              ),
              noRowsOverlay: () => <EmptyContent title="No Data" />,
            }}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Delete"
        content={`Are you sure you want to delete ${selectedRowIds.length} items?`}
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
  inputData: INewsItem[];
  filters: INewsTableFilters;
}) {
  return inputData.filter((item) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value.length) return true;
      return value.includes(item[key as keyof INewsTableFilters]);
    })
  );
}
