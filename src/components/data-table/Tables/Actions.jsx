import { DataTable } from '../DataTable.jsx';
import { useEffect, useState } from 'react';
import { DataTableColumnHeader } from '../DataTableColumnHeader.jsx';
import UserApi from "@/services/Api/UserApi.js";
import { Button } from "@/components/ui/button.jsx";
import { exportToExcel } from "@/components/ExportToExecl.js";
import { IntervenantActions } from "@/components/data-table/Tables/Actions/IntervenantAction.jsx";
import AddAction from "@/components/CRUD/Action/AddAction.jsx";
import { ClassAction } from "@/components/data-table/Tables/Actions/ClassAction.jsx";
import {SelectFilterBy} from "@/components/data-table/Tables/components/SelectFitltrage.jsx";
import {useUserContext} from "@/context/UserContext.jsx";

export default function ActionsList() {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleExport = () => {
    // Filter data based on selected date range
    const filteredData = data.filter(item => {
      const createdAt = new Date(item.created_at);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return createdAt >= start && createdAt <= end;
    });

    // Map through the filtered data array and flatten each object
    const flattenedData = filteredData.map(item => ({
      id: item.id,
      exercice: item.exercice,
      entreprises_id: item.entreprises_id,
      themes_id: item.themes_id,
      intervenants_id: item.intervenants_id,
      etablissements_id: item.etablissements_id,
      date_debut_prev: item.date_debut_prev,
      date_fin_prev: item.date_fin_prev,
      prix_reel: item.prix_reel,
      date_fin_real: item.date_fin_real,
      date_debut_real: item.date_debut_real,
      nbparticipants: item.nbparticipants,
      status: item.status,
      created_at: item.created_at,
      updated_at: item.updated_at,
      // Flatten entreprise object
      entreprise_raison: item.entreprise.raison,
      entreprise_email: item.entreprise.email,
      entreprise_site: item.entreprise.site,
      entreprise_logo: item.entreprise.logo,
      entreprise_status: item.entreprise.status,
      entreprise_created_at: item.entreprise.created_at,
      entreprise_updated_at: item.entreprise.updated_at,
      entreprise_representant: item.entreprise.representant,
      entreprise_telephone1: item.entreprise.telephone1,
      entreprise_telephone2: item.entreprise.telephone2,
      entreprise_telephone3: item.entreprise.telephone3,
      // Flatten etablissement object
      etablissement_nom: item.etablissement.nom_efp,
      etablissement_adresse: item.etablissement.adresse,
      etablissement_tel: item.etablissement.tel,
      etablissement_ville: item.etablissement.ville,
      etablissement_status: item.etablissement.status,
      etablissement_created_at: item.etablissement.created_at,
      etablissement_updated_at: item.etablissement.updated_at,
      // Flatten intervenant object
      intervenant_nom: item.intervenant.nom,
      intervenant_matricule: item.intervenant.matricule,
      intervenant_created_at: item.intervenant.created_at,
      intervenant_updated_at: item.intervenant.updated_at,
      // Flatten theme object
      theme_intitule: item.theme.intitule_theme,
      theme_duree_formation: item.theme.duree_formation,
      theme_status: item.theme.status,
      theme_created_at: item.theme.created_at,
      theme_updated_at: item.theme.updated_at
    }));

    // Pass the flattened data array and file name to the export function
    exportToExcel(flattenedData, 'actions_data');
  };

  const [filterBy, setFilterBy] = useState();
  const {state} = useUserContext();


  const AdminActionsColumns = [
    {
      accessorKey: 'exercice',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Intitulé du Diplôme" />;
      },
    },
    {
      accessorKey: 'entreprise.email',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Entreprise" />;
      },
    },
    {
      accessorKey: 'theme.intitule_theme',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Thème" />;
      },
    },
    {
      accessorKey: 'etablissement.nom_efp',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Établissement" />;
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Status" />;
      },
    },
    {
      accessorKey: 'theme.intitule_theme',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="intitule theme" />;
      },
    },

    {
      accessorKey: 'theme.domain.nom_domaine',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="domain" />;
      },
    },
    {
      accessorKey: 'date_debut_prev',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Date Début Prev" />;
      },
    },
    {
      accessorKey: 'date_fin_prev',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Date Fin Prev" />;
      },
    },
    {
      accessorKey: 'date_debut_real',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Date Début Real" />;
      },
    },
    {
      accessorKey: 'date_fin_real',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Date Fin Real" />;
      },
    },
   {
      id: 'actions',
      cell: ({ row }) => {
        const {id ,status,date_debut_real } = row?.original;
        return <ClassAction id={id } dateDebutReal={date_debut_real} status={status} />;
      },
    },
  ];

  useEffect(() => {
    let tempData = state?.actions;

    if(state?.user.role_name === 'intervenant')
    {
      tempData = tempData?.filter((d)=>d.intervenants_id === state?.user?.intervenant?.id )
    }
    if(state?.user.role_name === 'entreprise')
    {
      console.log(tempData)
      tempData = tempData?.filter((d)=>d.entreprises_id === state?.user?.entreprise?.id )
    }

    setData(tempData)
  }, [state]);

  return (
      <>
        <div className="flex justify-between items-center mb-4">
          <Button onClick={handleExport}>Export to Excel</Button>
          <div className="flex gap-4">

            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2"
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2"
            />
          </div>
        </div>

        <SelectFilterBy filtrageItem={['status' ,'theme_domain.nom_domaine' , 'theme_intitule_theme']} setFiltredBy={(value)=>setFilterBy(value)} />
        {data?.length > 0 ? (
            <DataTable
                id="actions-table"
                columns={AdminActionsColumns}
                addAction={() => <AddAction />}
                data={data}
                name={'Action'}
                filterBy={filterBy}
                messageFilter={'Filtrer par theme.intitule_theme'}
            />
        ) : (
            <div className="w-full">
              <h1 className="text-3xl w-3/4 text-center mx-auto text-blue-500">
                Aucun intervenant pour le moment
              </h1>
            </div>
        )}
      </>
  );
}
