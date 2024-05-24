import React, { useEffect, useState } from "react";
import { DataTable } from "../DataTable.jsx";
import { DataTableColumnHeader } from "../DataTableColumnHeader.jsx";
import ThemeApi from "@/services/Api/ThemeApi.js"; // Import ThemeApi instead of CertificationApi
import AddTheme from "../../CRUD/RegioCentreManager/OffreFormation(Themes)/AddTheme.jsx"; // Import AddTheme instead of AddCertification
import { ThemeActions } from "./Actions/ThemeAction.jsx";
import {useUserContext} from "@/context/UserContext.jsx"; // Import ThemeActions instead of CertificationActions

export default function ThemesList() {
  // Change component name to ThemesList
  const [data, setData] = useState([]);

  const {state : {themes}} = useUserContext();
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
    setData(themes)
  }, [themes]);

  return (
    <>
        <DataTable
          columns={AdminThemeColumns}
          data={data}
          name={"Theme"} // Set table name to "Theme"
          addAction={(setOpen) => <AddTheme setOpen={setOpen} />} // Use AddTheme instead of AddCertification
          filterBy={"intitule_theme"}
          messageFilter={"Filter by intitule theme"}
        />

    </>
  );
}
