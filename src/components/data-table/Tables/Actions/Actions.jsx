import { DataTable } from "../../DataTable.jsx";
import { useEffect, useState } from "react";
import { DataTableColumnHeader } from "../../DataTableColumnHeader.jsx";
import UserApi from "@/services/Api/UserApi.js";
import { Button } from "@/components/ui/button.jsx";
import { exportToExcel } from "@/components/ExportToExecl.js";
import { SelectSpecifiqueGroup } from "@/assets/SelectSpecifiqueRegion.jsx";

export default function ActionsList() {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState();

  const handleExport = () => {
    const filterdData = exportToExcel(data, "actions_data"); // Pass the data and file name to the export function
  };

  const AdminActionsColumns = [
    {
      accessorKey: "exercice",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Intitulé du Diplôme'
          />
        );
      },
    },
    {
      accessorKey: "entreprises_id",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Type de Diplôme'
          />
        );
      },
    },
    {
      accessorKey: "themes_id",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title='Spécialité du Diplôme'
          />
        );
      },
    },
    {
      accessorKey: "etablissements_id",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title="Type d'Intervenant"
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
            title='Statut'
          />
        );
      },
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const response = await UserApi.getActions();
      setData(response?.data);
    }

    fetchData();
  }, []);

  const onRegionChange = (value) => {};
  return (
    <>
      <Button onClick={handleExport}>export to exe</Button>
      <SelectSpecifiqueGroup />
      {data?.length > 0 ? (
        <DataTable
          id='actions-table'
          columns={AdminActionsColumns}
          data={data}
          name={"Intervenant"}
          filterBy={"status"}
          messageFilter={"Filtrer par statut"}
        />
      ) : (
        <div className={"w-full"}>
          <h1 className={"text-3xl w-3/4 text-center mx-auto text-blue-500"}>
            Aucun intervenant pour le moment
          </h1>
        </div>
      )}
    </>
  );
}
