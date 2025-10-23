import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// ====================================================================
// 1. Données Initiales
// ====================================================================

const initialEmployees = [
    { id: 1, name: 'Alice Dubois', baseSalary: 3500, deductions: 500, netPay: 3000, paid: false },
    { id: 2, name: 'Bob Martin', baseSalary: 5000, deductions: 800, netPay: 4200, paid: false },
    { id: 3, name: 'Chloé Petit', baseSalary: 2800, deductions: 400, netPay: 2400, paid: true },
];

// ====================================================================
// 2. Composant: Formulaire d'Ajout d'Employé (Interaction)
// ====================================================================

const EmployeeForm = ({ name, setName, baseSalary, setBaseSalary, addEmployee }) => (
    <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #007bff', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <h2>Ajouter un Nouvel Employé ➕</h2>
        <form onSubmit={addEmployee} style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <label htmlFor="name" style={{ fontWeight: 'bold' }}>Nom de l'employé:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom Complet"
                    required
                    style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '3px' }}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <label htmlFor="salary" style={{ fontWeight: 'bold' }}>Salaire de Base (€):</label>
                <input
                    id="salary"
                    type="number"
                    value={baseSalary}
                    onChange={(e) => setBaseSalary(e.target.value)}
                    placeholder="Ex: 3500"
                    min="1"
                    required
                    style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '3px' }}
                />
            </div>
            <button 
                type="submit" 
                style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
            >
                Ajouter l'employé
            </button>
        </form>
    </div>
);

// ====================================================================
// 3. Composant: Tableau des Salaires (Visualisation & Paiement)
// ====================================================================

const EmployeeTable = ({ employees, handlePayEmployee }) => (
    <div>
        <h2>Liste des Employés et Statut de Paie 📑</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '15px' }}>
            <thead>
                <tr style={{ borderBottom: '3px solid #333', backgroundColor: '#e9ecef' }}>
                    <th style={{ padding: '10px' }}>Nom</th>
                    <th style={{ padding: '10px' }}>Salaire de Base (€)</th>
                    <th style={{ padding: '10px' }}>Déductions (15%) (€)</th>
                    <th style={{ padding: '10px' }}>Salaire Net (€)</th>
                    <th style={{ padding: '10px' }}>Statut</th>
                    <th style={{ padding: '10px' }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((emp) => (
                    <tr key={emp.id} style={{ borderBottom: '1px dashed #eee' }}>
                        <td style={{ padding: '10px' }}>{emp.name}</td>
                        <td style={{ padding: '10px' }}>{emp.baseSalary.toFixed(2)}</td>
                        <td style={{ padding: '10px' }}>{emp.deductions.toFixed(2)}</td>
                        <td style={{ padding: '10px', fontWeight: 'bold', color: '#0056b3' }}>**{emp.netPay.toFixed(2)}**</td>
                        <td style={{ padding: '10px', color: emp.paid ? 'green' : 'red', fontWeight: 'bold' }}>
                            {emp.paid ? 'Payé ✅' : 'En attente ❌'}
                        </td>
                        <td style={{ padding: '10px' }}>
                            <button 
                                onClick={() => handlePayEmployee(emp.id)}
                                disabled={emp.paid}
                                style={{ 
                                    padding: '5px 10px', 
                                    backgroundColor: emp.paid ? '#ccc' : '#28a745', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '3px',
                                    cursor: emp.paid ? 'default' : 'pointer' 
                                }}
                            >
                                {emp.paid ? 'Déjà Payé' : 'Payer'}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// ====================================================================
// 4. Composant: Statistiques de Paie (Recharts)
// ====================================================================

const PayStats = ({ netPayData, summaryData }) => (
    <div>
        <h2>Statistiques de Paie (Graphiques) 📊</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
            
            {/* Graphique 1: Distribution du salaire net par employé */}
            <div style={{ width: '48%', minWidth: '350px', height: '300px', border: '1px solid #ddd', padding: '10px' }}>
                <h3 style={{ textAlign: 'center' }}>Distribution du Salaire Net par Employé</h3>
                <ResponsiveContainer width="100%" height="90%">
                    <PieChart>
                        <Pie 
                            data={netPayData} 
                            dataKey="value" 
                            nameKey="name" 
                            cx="50%" 
                            cy="50%" 
                            outerRadius={100} 
                            fill="#8884d8" 
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        />
                        <Tooltip formatter={(value) => `${value.toFixed(2)} €`} />
                        <Legend wrapperStyle={{ fontSize: '12px' }}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Graphique 2: Répartition Masse Salariale vs. Déductions */}
            <div style={{ width: '48%', minWidth: '350px', height: '300px', border: '1px solid #ddd', padding: '10px' }}>
                <h3 style={{ textAlign: 'center' }}>Masse Salariale Nette vs. Déductions Totales</h3>
                <ResponsiveContainer width="100%" height="90%">
                    <PieChart>
                        <Pie 
                            data={summaryData} 
                            dataKey="value" 
                            nameKey="name" 
                            cx="50%" 
                            cy="50%" 
                            innerRadius={60} 
                            outerRadius={90} 
                            label 
                            fill="#82ca9d" 
                        />
                        <Tooltip formatter={(value) => `${value.toFixed(2)} €`} />
                        <Legend wrapperStyle={{ fontSize: '12px' }}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
);

// ====================================================================
// 5. Composant Principal: EmployeePaySystem
// ====================================================================

const EmployeePaySystem = () => {
    const [employees, setEmployees] = useState(initialEmployees);
    const [name, setName] = useState('');
    const [baseSalary, setBaseSalary] = useState('');

    // --- Logique d'Interaction ---

    // Ajout d'un nouvel employé
    const addEmployee = (e) => {
        e.preventDefault();
        if (!name || !baseSalary || isNaN(baseSalary) || parseFloat(baseSalary) <= 0) return;

        const salary = parseFloat(baseSalary);
        const newDeductions = salary * 0.15; // Logique de calcul simple (ex: 15% de déductions)
        const newNetPay = salary - newDeductions;

        const newEmployee = {
            id: Date.now(),
            name,
            baseSalary: salary,
            deductions: newDeductions,
            netPay: newNetPay,
            paid: false,
        };

        setEmployees([...employees, newEmployee]);
        setName('');
        setBaseSalary('');
    };

    // Simule le paiement
    const handlePayEmployee = (id) => {
        setEmployees(employees.map(emp => 
            emp.id === id ? { ...emp, paid: true } : emp
        ));
    };

    // --- Préparation des Données pour les Graphiques ---
    
    // Graphique 1: Salaires Nets par employé
    const netPayData = employees.map(emp => ({
        name: emp.name,
        value: emp.netPay,
    }));

    // Graphique 2: Totaux Net Payé vs. Déductions
    const totalNetPay = employees.reduce((sum, emp) => sum + emp.netPay, 0);
    const totalDeductions = employees.reduce((sum, emp) => sum + emp.deductions, 0);

    const summaryData = [
        { name: 'Total Salaires Nets', value: totalNetPay, fill: '#8884d8' },
        { name: 'Total Déductions', value: totalDeductions, fill: '#82ca9d' },
    ];


    return (
        <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
                🚀 Tableau de Bord de la Paie
            </h1>
            
            <EmployeeForm 
                name={name}
                setName={setName}
                baseSalary={baseSalary}
                setBaseSalary={setBaseSalary}
                addEmployee={addEmployee}
            />

            <hr style={{ margin: '30px 0' }} />

            <EmployeeTable 
                employees={employees}
                handlePayEmployee={handlePayEmployee}
            />

            <hr style={{ margin: '30px 0' }} />
            
            <PayStats 
                netPayData={netPayData}
                summaryData={summaryData}
            />
        </div>
    );
};

export default EmployeePaySystem;