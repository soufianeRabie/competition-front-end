import React, { useEffect, useState } from "react";
import { DataTable } from "../DataTable.jsx";
import { DataTableColumnHeader } from "../DataTableColumnHeader.jsx";
import ThemeApi from "@/services/Api/ThemeApi.js"; // Import ThemeApi instead of CertificationApi
import AddTheme from "../../CRUD/RegioCentreManager/OffreFormation(Themes)/AddTheme.jsx"; // Import AddTheme instead of AddCertification
import { ThemeActions } from "./Actions/ThemeAction.jsx"; // Import ThemeActions instead of CertificationActions

export default function ThemesList() {
  // Change component name to ThemesList
  const [data, setData] = useState([]);

  const AdminThemeColumns = [
    {
      accessorKey: "intitule_theme", // Changed accessorKey to match theme data structure
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Intitule theme'
          />
        );
      },
    },
    {
      accessorKey: "domaines_id",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Domain'
          />
        );
      },
    },
    {
      accessorKey: "duree_formation", // Added accessor for 'duree_formation'
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Duration'
          />
        );
      },
    },
    {
      accessorKey: "status", // Added accessor for 'status'
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Status'
          />
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Created at'
          />
        );
      },
    },
    {
      accessorKey: "updated_at",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Updated at'
          />
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const id = row?.original?.id;
        return <ThemeActions id={id} />; // Pass id to ThemeActions component
      },
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ThemeApi.getThemes(); // Fetch themes using ThemeApi
        console.log("API Response:", response);
        setData(response?.data);
      } catch (error) {
        console.error("Failed to fetch themes:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {data?.length > 0 ? (
        <DataTable
          columns={AdminThemeColumns}
          data={data}
          name={"Theme"} // Set table name to "Theme"
          addAction={(setOpen) => <AddTheme setOpen={setOpen} />} // Use AddTheme instead of AddCertification
          filterBy={"id"}
          messageFilter={"Filter by ID"}
        />
      ) : (
        <div className={"w-full"}>
          <h1 className={"text-3xl w-3/4 text-center mx-auto text-blue-500"}>
            No themes available at the moment
          </h1>
        </div>
      )}
    </>
  );
}
