// IntervenantForm.js
import React, {useEffect, useState} from 'react';
import UserApi from "@/services/Api/UserApi.js";

const IntervenantForm = () => {
    const [formData, setFormData] = useState({
        etablissements_id: '',
        users_id: '',
        matricule: '',
        nom: '',
        datenaissance: '',
        intitule_diplome: '',
        type_diplome: '',
        specialite_diplome: '',
        type_intervenant: '',
        status: '',
        adresse: '',
        tel: '',
        ville: '',
    });

    const [etablissements, setEtablissements] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await UserApi.getInit();
            console.log(response)
            setEtablissements(response?.data?.etablisments);
            setUsers(response?.data.Users);
        }

        fetchData();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Ajoutez la logique pour soumettre les données du formulaire ici.
        await  UserApi.addInv(formData);
    };

    return (
        <form className="max-w-lg mx-auto p-6 bg-white rounded shadow-md" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700">Matricule</label>
                <input
                    type="text"
                    name="matricule"
                    value={formData.matricule}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Nom</label>
                <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Date de naissance</label>
                <input
                    type="date"
                    name="dateaissance"
                    value={formData.dateNaissance}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Intitulé du diplôme</label>
                <input
                    type="text"
                    name="intitule_diplome"
                    value={formData.intituleDiplome}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Type de diplôme</label>
                <input
                    type="text"
                    name="type_diplome"
                    value={formData.typeDiplome}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Spécialité du diplôme</label>
                <input
                    type="text"
                    name="specialite_diplome"
                    value={formData.specialiteDiplome}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Type d'intervenant</label>
                <input
                    type="text"
                    name="type_intervenant"
                    value={formData.typeIntervenant}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Adresse</label>
                <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Téléphone</label>
                <input
                    type="
text"
                    name="tel"
                    value={formData.tel}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Ville</label>
                <input
                    type="text"
                    name="ville"
                    value={formData.ville}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Etablissement</label>
                <select
                    name="etablissements_id"
                    value={formData.etablissements_id}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded"
                >
                    <option value="">Sélectionnez un établissement</option>
                    {etablissements.map((etablissement) => (
                        <option key={etablissement.id} value={etablissement.id}>
                            {etablissement.nom_efp}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Utilisateur</label>
                <select
                    name="user_id"
                    value={formData.users_id}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full bg-gray-100 border border-gray-300 rounded"
                >
                    <option value="">Sélectionnez un utilisateur</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user?.email}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Ajouter
                </button>
            </div>
        </form>
    );
}

export default IntervenantForm