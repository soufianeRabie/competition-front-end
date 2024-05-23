import {SelectSpecifiqueRegion} from "@/assets/SelectSpecifiqueRegion.jsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.jsx";
import {exportToExcel} from "@/components/ExportToExecl.js";
import {Alert} from "@/components/Alert.jsx";

export const Reports = () => {

    const [region, setRegion] = useState('')
    const [showAlert, setShowAlert] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    const convertToDate = (dateString)=>
    {
       return   new Date(dateString)
    }
    const handleExportToExcel = () => {
        const from = new Date(startDate);
        const to = new Date(endDate);

        let actionsRealise = region?.etablisments.map((eta) =>
            eta.actions.filter((action) => {
                const actionDate = convertToDate(action?.created_at);
                return action.status === 1 && actionDate >= from && actionDate <= to;
            })
        ).flat();

        const flattenedData = actionsRealise.map(item => ({
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
            entreprise_raison: item.entreprise?.raison,
            entreprise_email: item.entreprise?.email,
            entreprise_site: item.entreprise?.site,
            entreprise_logo: item.entreprise?.logo,
            entreprise_status: item.entreprise?.status,
            entreprise_created_at: item.entreprise?.created_at,
            entreprise_updated_at: item.entreprise?.updated_at,
            entreprise_representant: item.entreprise?.representant,
            entreprise_telephone1: item.entreprise?.telephone1,
            entreprise_telephone2: item.entreprise?.telephone2,
            entreprise_telephone3: item.entreprise?.telephone3,
            // Flatten etablissement object
            etablissement_nom: item.etablissement?.nom_efp,
            etablissement_adresse: item.etablissement?.adresse,
            etablissement_tel: item.etablissement?.tel,
            etablissement_ville: item.etablissement?.ville,
            etablissement_status: item.etablissement?.status,
            etablissement_created_at: item.etablissement?.created_at,
            etablissement_updated_at: item.etablissement?.updated_at,
            // Flatten intervenant object
            intervenant_nom: item.intervenant?.nom,
            intervenant_matricule: item.intervenant?.matricule,
            intervenant_created_at: item.intervenant?.created_at,
            intervenant_updated_at: item.intervenant?.updated_at,
            // Flatten theme object
            theme_intitule: item.theme?.intitule_theme,
            theme_duree_formation: item.theme?.duree_formation,
            theme_status: item.theme?.status,
            theme_created_at: item.theme?.created_at,
            theme_updated_at: item.theme?.updated_at
        }));

        if (flattenedData.length > 0) {
            exportToExcel(flattenedData, `${region?.nom_region} actions realise`)
        } else {
            setShowAlert(true)
        }
    }


    return (
        <>
            <Alert isOpen={showAlert} setIsOpen={setShowAlert} title={'no actions'}
                   message={region?.nom_region + ' ' + 'dont have any actions now '}/>

            <SelectSpecifiqueRegion setRegion={(value) => setRegion(value)}/>
            <div className="flex justify-between items-center mb-4">
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
            <Button onClick={handleExportToExcel}> export {region?.nom_region}</Button>
        </>
    )
}
