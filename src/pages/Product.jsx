import React, { useState } from 'react';
import { 
    ResponsiveContainer, 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Legend, 
    AreaChart, 
    Area,
    Tooltip
} from 'recharts';

// --- Données Initiales Simulant la Performance des Employés ---
const initialPerformanceData = [
    { employee: "Alice", tasksCompleted: 45, qualityScore: 9.2, productivity: 85 },
    { employee: "Bob", tasksCompleted: 38, qualityScore: 8.5, productivity: 75 },
    { employee: "Charlie", tasksCompleted: 55, qualityScore: 9.5, productivity: 90 },
    { employee: "Diana", tasksCompleted: 30, qualityScore: 7.8, productivity: 65 },
    { employee: "Ethan", tasksCompleted: 42, qualityScore: 9.0, productivity: 82 },
    { employee: "Fiona", tasksCompleted: 48, qualityScore: 9.3, productivity: 88 },
];

// --- Composant du Formulaire d'Ajout d'Évaluation ---
const ReviewForm = ({ onAddReview, onCancel }) => {
    // État pour stocker les valeurs du formulaire
    const [formData, setFormData] = useState({
        employee: '',
        tasksCompleted: '',
        qualityScore: '',
        productivity: ''
    });

    // Gestion du changement dans les champs de saisie
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation basique
        if (!formData.employee || !formData.tasksCompleted) {
            alert("Veuillez remplir au moins le nom de l'employé et les tâches.");
            return;
        }

        // Conversion des nombres et préparation des données pour l'ajout
        const newReview = {
            employee: formData.employee,
            tasksCompleted: parseInt(formData.tasksCompleted || 0),
            qualityScore: parseFloat(formData.qualityScore || 0),
            productivity: parseInt(formData.productivity || 0),
        };

        onAddReview(newReview); // Appel de la fonction pour ajouter la donnée
        setFormData({ // Réinitialisation du formulaire
            employee: '',
            tasksCompleted: '',
            qualityScore: '',
            productivity: ''
        });
    };

    return (
        <div style={formStyles.container}>
            <h4>Ajouter une Nouvelle Évaluation de Performance</h4>
            <form onSubmit={handleSubmit} style={formStyles.form}>
                
                <div style={formStyles.group}>
                    <label style={formStyles.label}>Nom de l'Employé:</label>
                    <input 
                        type="text" 
                        name="employee" 
                        value={formData.employee} 
                        onChange={handleChange} 
                        required 
                        style={formStyles.input}
                    />
                </div>

                <div style={formStyles.group}>
                    <label style={formStyles.label}>Tâches Terminées:</label>
                    <input 
                        type="number" 
                        name="tasksCompleted" 
                        value={formData.tasksCompleted} 
                        onChange={handleChange} 
                        required 
                        min="0"
                        style={formStyles.input}
                    />
                </div>

                <div style={formStyles.group}>
                    <label style={formStyles.label}>Score Qualité (0-10):</label>
                    <input 
                        type="number" 
                        name="qualityScore" 
                        value={formData.qualityScore} 
                        onChange={handleChange} 
                        step="0.1" 
                        min="0" 
                        max="10"
                        style={formStyles.input}
                    />
                </div>

                <div style={formStyles.group}>
                    <label style={formStyles.label}>Productivité (0-100%):</label>
                    <input 
                        type="number" 
                        name="productivity" 
                        value={formData.productivity} 
                        onChange={handleChange} 
                        min="0" 
                        max="100"
                        style={formStyles.input}
                    />
                </div>

                <div style={formStyles.buttonGroup}>
                    <button type="submit" style={{ ...formStyles.button, backgroundColor: '#28a745' }}>
                        Enregistrer l'Évaluation
                    </button>
                    <button type="button" onClick={onCancel} style={{ ...formStyles.button, backgroundColor: '#dc3545', marginLeft: '10px' }}>
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
};


// Styles pour le formulaire (simples)
const formStyles = {
    container: { 
        padding: '20px', 
        border: '1px solid #007bff', 
        borderRadius: '8px', 
        marginTop: '15px',
        marginBottom: '20px',
        backgroundColor: '#f8f9fa'
    },
    form: { 
        display: 'flex', 
        flexDirection: 'column' 
    },
    group: { 
        marginBottom: '15px' 
    },
    label: { 
        marginBottom: '5px', 
        fontWeight: 'bold', 
        display: 'block' 
    },
    input: { 
        padding: '10px', 
        borderRadius: '4px', 
        border: '1px solid #ced4da', 
        width: 'calc(100% - 22px)' 
    },
    buttonGroup: { 
        marginTop: '20px' 
    },
    button: { 
        padding: '10px 20px', 
        color: 'white', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer' 
    }
};


// --- Composant Fonctionnel Principal (Dashboard) ---
const EmployeePerformanceDashboard = () => {
    // État pour les données de performance, initialisé avec les données de base
    const [performanceData, setPerformanceData] = useState(initialPerformanceData);
    // État pour afficher/masquer le formulaire
    const [showReviewForm, setShowReviewForm] = useState(false);

    // Fonction pour ajouter une nouvelle évaluation aux données
    const handleAddReview = (newReview) => {
        // Ajout de la nouvelle évaluation à la liste des données
        setPerformanceData([...performanceData, newReview]);
        // Masquer le formulaire après l'ajout
        setShowReviewForm(false);
        alert(`Évaluation ajoutée pour ${newReview.employee} !`);
    };

    // Composant simulant un tableau de performances
    const PerformanceTable = () => (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
            <h3>Détails des Évaluations Récentes</h3>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                {performanceData.slice(-5).map((data, index) => ( // Affiche les 5 dernières
                    <li key={index} style={{ margin: '5px 0', borderBottom: '1px dotted #eee', paddingBottom: '5px' }}>
                        **{data.employee}**: Tâches: {data.tasksCompleted} | Score Qualité: {data.qualityScore}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>📊 Tableau de Bord de Performance des Employés</h1>

            {/* --- Bouton d'Interaction --- */}
            <button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                style={{ 
                    padding: '10px 20px', 
                    margin: '15px 0', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer' 
                }}
            >
                {showReviewForm ? 'Masquer le Formulaire' : '➕ Ajouter une Évaluation de Performance'}
            </button>

            {/* --- Affichage du Formulaire (Interactivité) --- */}
            {showReviewForm && (
                <ReviewForm 
                    onAddReview={handleAddReview} 
                    onCancel={() => setShowReviewForm(false)} 
                />
            )}

            <hr style={{ margin: '30px 0' }} />

            {/* --- Graphique des Tâches Terminées (Area Chart) --- */}
            <h2>Courbe d'Achèvement des Tâches</h2>
            <ResponsiveContainer width="100%" aspect={3}>
                <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="employee" interval={'preserveStartEnd'} />
                    <YAxis label={{ value: 'Tâches', angle: -90, position: 'insideLeft' }} /> 
                    <Tooltip />
                    <Area type="monotone" dataKey="tasksCompleted" stroke="#8884d8" fillOpacity={1} fill="#8884d8" name="Tâches Terminées" />
                </AreaChart>
            </ResponsiveContainer>

            <hr style={{ margin: '30px 0' }} />

            {/* --- Graphique du Score de Qualité (Bar Chart) --- */}
            <h2>Score de Qualité et Productivité</h2>
            <ResponsiveContainer width="100%" aspect={3}>
                <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="employee" />
                    <YAxis yAxisId="left" orientation="left" stroke="#82ca9d" label={{ value: 'Score Qualité', angle: -90, position: 'insideLeft' }}/>
                    <YAxis yAxisId="right" orientation="right" stroke="#ffc658" label={{ value: 'Productivité (%)', angle: 90, position: 'insideRight' }}/>
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="qualityScore" fill="#82ca9d" name="Score Qualité (sur 10)" />
                    <Bar yAxisId="right" dataKey="productivity" fill="#ffc658" name="Productivité (%)" />
                </BarChart>
            </ResponsiveContainer>

            <hr style={{ margin: '30px 0' }} />

            {/* --- Tableau des Données Récentes (mis à jour en direct) --- */}
            <PerformanceTable />
            
        </div>
    );
}

export default EmployeePerformanceDashboard;