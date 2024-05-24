import { DataTable } from '../DataTable.jsx';
import { useEffect, useState } from 'react';
import { DataTableColumnHeader } from '../DataTableColumnHeader.jsx';
import UserApi from "@/services/Api/UserApi.js";
import { Button } from "@/components/ui/button.jsx";
import { exportToExcel } from "@/components/ExportToExecl.js";
import AddAction from "@/components/CRUD/Action/AddAction.jsx";
import { ClassAction } from "@/components/data-table/Tables/Actions/ClassAction.jsx";
import { SelectFilterBy } from "@/components/data-table/Tables/components/SelectFitltrage.jsx";
import { useUserContext } from "@/context/UserContext.jsx";

export default function ActionsList() {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleExport = () => {
    const filteredData = data.filter(item => {
      const createdAt = new Date(item.created_at);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return createdAt >= start && createdAt <= end;
    });

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
      etablissement_nom: item.etablissement.nom_efp,
      etablissement_adresse: item.etablissement.adresse,
      etablissement_tel: item.etablissement.tel,
      etablissement_ville: item.etablissement.ville,
      etablissement_status: item.etablissement.status,
      etablissement_created_at: item.etablissement.created_at,
      etablissement_updated_at: item.etablissement.updated_at,
      intervenant_nom: item.intervenant.nom,
      intervenant_matricule: item.intervenant.matricule,
      intervenant_created_at: item.intervenant.created_at,
      intervenant_updated_at: item.intervenant.updated_at,
      theme_intitule: item.theme.intitule_theme,
      theme_duree_formation: item.theme.duree_formation,
      theme_status: item.theme.status,
      theme_created_at: item.theme.created_at,
      theme_updated_at: item.theme.updated_at
    }));

    exportToExcel(flattenedData, 'actions_data');
  };

  const [filterBy, setFilterBy] = useState();
  const { state } = useUserContext();

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
        return <DataTableColumnHeader column={column} title="Intitulé Thème" />;
      },
    },
    {
      accessorKey: 'theme.domain.nom_domaine',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Domaine" />;
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
        const { id, status, date_debut_real } = row?.original;
        return <ClassAction id={id} dateDebutReal={date_debut_real} status={status} />;
      },
    },
  ];

  useEffect(() => {
    let tempData = state?.actions;

    if (state?.user.role_name === 'intervenant') {
      tempData = tempData?.filter((d) => d.intervenants_id === state?.user?.intervenant?.id);
    }
    if (state?.user.role_name === 'entreprise') {
      tempData = tempData?.filter((d) => d.entreprises_id === state?.user?.entreprise?.id);
    }

    setData(tempData);
  }, [state]);

  return (
      <>
        <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-md shadow-sm">
          <Button onClick={handleExport} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Export to Excel
          </Button>
          <div className="flex gap-4">
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 p-2 rounded-md"
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 p-2 rounded-md"
            />
          </div>
        </div>
        <div className="mb-4">
          <SelectFilterBy filtrageItem={['status', 'theme_domain.nom_domaine', 'theme_intitule_theme']} setFiltredBy={(value) => setFilterBy(value)} />
        </div>
            <DataTable
                id="actions-table"
                columns={AdminActionsColumns}
                addAction={() => <AddAction />}
                showAddCtion={state?.user === 'entreprise'}
                data={data}
                showHead={false}
                name="Action"
                filterBy={filterBy}
                messageFilter="Filtrer par theme.intitule_theme"
            />
      </>
  );
}
