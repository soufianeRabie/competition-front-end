import React, { useEffect, useState } from "react";
import { DataTable } from "../DataTable.jsx";
import { DataTableColumnHeader } from "../DataTableColumnHeader.jsx";
import CertificationApi from "@/services/Api/CertificationApi.js";
import AddCertification from "../../CRUD/RegioCentreManager/Certifications/AddCertification.jsx";
import { CertificationActions } from "../Tables/Actions/CertificationAction.jsx";

export default function CertificationsList() {
  const [data, setData] = useState([]);

  const AdminCertificationColumns = [
    {
      accessorKey: "intiltule_certification",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Intitule certification'
          />
        );
      },
    },
    {
      accessorKey: "domaines_id", // Corrected to match data structure
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
      accessorKey: "organisme_certification",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Organisme certification'
          />
        );
      },
    },
    {
      accessorKey: "Intervenants_id",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Intervenants'
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
        return <CertificationActions id={id} />;
      },
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await CertificationApi.getCertifications();
        console.log("API Response:", response);
        setData(response?.data);
      } catch (error) {
        console.error("Failed to fetch certifications:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
        <DataTable
          columns={AdminCertificationColumns}
          data={data}
          name={"Certification"}
          addAction={(setOpen) => <AddCertification setOpen={setOpen} />}
          filterBy={"intiltule_certification"}
          messageFilter={"Filter by intitule certification"}
        />
    </>
  );
}
