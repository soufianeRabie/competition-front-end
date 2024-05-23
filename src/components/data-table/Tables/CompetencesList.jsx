import React, { useEffect, useState } from "react";
import { DataTable } from "../DataTable.jsx";
import { DataTableColumnHeader } from "../DataTableColumnHeader.jsx";
import CompetenceApi from "@/services/Api/CompetenceApi.js"; // Import CompetenceApi
import AddCompetence from "../../CRUD/RegioCentreManager/Competences/AddCompetence.jsx"
import { CompetenceActions } from "./Actions/CompetenceAction.jsx"; // Adjust the import path

export default function CompetencesList() {
  const [data, setData] = useState([]);

  const AdminCompetenceColumns = [
    {
      accessorKey: "intervenant_id", // Adjusted accessorKey to match competence data structure
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='intervenant '
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='name'
          />
        );
      },
    },
    {
      accessorKey: "description", // Adjusted accessor for 'duree_formation'
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Description'
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
        return <CompetenceActions id={id} />; // Pass id to CompetenceActions component
      },
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await CompetenceApi.getCompetences(); // Fetch competences using CompetenceApi
        console.log("API Response:", response);
        setData(response?.data);
      } catch (error) {
        console.error("Failed to fetch competences:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {data?.length > 0 ? (
        <DataTable
          columns={AdminCompetenceColumns}
          data={data}
          name={"Competence"} // Set table name to "Competence"
          addAction={(setOpen) => <AddCompetence setOpen={setOpen} />} // Use AddCompetence component
          filterBy={"id"}
          messageFilter={"Filter by ID"}
        />
      ) : (
        <div className={"w-full"}>
          <h1 className={"text-3xl w-3/4 text-center mx-auto text-blue-500"}>
            No competences available at the moment
          </h1>
        </div>
      )}
    </>
  );
}
