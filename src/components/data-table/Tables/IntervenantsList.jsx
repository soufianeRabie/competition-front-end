import { DataTable } from "../DataTable.jsx";
import { useEffect, useState } from "react";
import { DataTableColumnHeader } from "../DataTableColumnHeader.jsx";
import UserApi from "@/services/Api/UserApi.js";
import AddIntervenant from "@/components/CRUD/RegioCentreManager/Intervenant/AddIntervenant.jsx";
import { IntervenantActions } from "@/components/data-table/Tables/Actions/IntervenantAction.jsx";
import {useUserContext} from "@/context/UserContext.jsx";

export default function IntervenantList() {
  const [data, setData] = useState([]);
  const {state : {intervennats}} = useUserContext();


  const AdminIntervenantColumns = [
    {
      accessorKey: "etablissements_id",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Etablissements'
          />
        );
      },
    },
    {
      accessorKey: "users_id",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Users'
          />
        );
      },
    },
    {
      accessorKey: "matricule",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='matricule'
          />
        );
      },
    },
    {
      accessorKey: "nom",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Nom'
          />
        );
      },
    },
    {
      accessorKey: "datenaissance",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='date de naissance'
          />
        );
      },
    },
    {
      accessorKey: "intitule_diplome",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Intitule du Diplôme'
          />
        );
      },
    },
    {
      accessorKey: "type_diplome",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Type du Diplôme'
          />
        );
      },
    },
    {
      accessorKey: "specialite_diplome",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title="Specialite du Diplôme"
          />
        );
      },
    },
    {
      accessorKey: "type_intervenant",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title="Type d'intervenant"
          />
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Statut'
          />
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const {id , type_intervenant} = row?.original;
        return <IntervenantActions id={id} type={type_intervenant} />;
      },
    },
  ];

  useEffect(() => {

 setData(intervennats)
  }, [intervennats]);

  return (
    <>
        <DataTable
          columns={AdminIntervenantColumns}
          data={data}
          name={"Intervenant"}
          addAction={(setOpen) => <AddIntervenant setOpen={setOpen} />}
          filterBy={"status"}
          messageFilter={"Filtrer par statut"}
        />
    </>
  );
}
