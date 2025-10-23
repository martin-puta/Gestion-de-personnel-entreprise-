import React, { useState, useMemo } from 'react';
import '../pages/Analatics.css';

const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const employeesData = [
    { id: 1, name: "Adrian Goia", shifts: { Lundi: 'Present', Mardi: 'Present', Mercredi: 'Present', Jeudi: 'Present', Vendredi: 'Present', Samedi: 'Holiday', Dimanche: 'Holiday' } },
    { id: 2, name: "Jennifer Muller", shifts: { Lundi: 'Absent', Mardi: 'Present', Mercredi: 'Present', Jeudi: 'Present', Vendredi: 'Present', Samedi: 'Holiday', Dimanche: 'Holiday' } },
    { id: 3, name: "Rachel Lorence", shifts: { Lundi: 'Present', Mardi: 'Present', Mercredi: 'Absent', Jeudi: 'Present', Vendredi: 'Present', Samedi: 'Holiday', Dimanche: 'Holiday' } },
    { id: 4, name: "Dwayne Stevens", shifts: { Lundi: 'Present', Mardi: 'Present', Mercredi: 'Present', Jeudi: 'Present', Vendredi: 'Present', Samedi: 'Holiday', Dimanche: 'Holiday' } },
    { id: 5, name: "Carmen Rodriguez", shifts: { Lundi: 'Present', Mardi: 'Present', Mercredi: 'Present', Jeudi: 'Present', Vendredi: 'Absent', Samedi: 'Holiday', Dimanche: 'Holiday' } },
    { id: 6, name: "Mark Stewart", shifts: { Lundi: 'Absent', Mardi: 'Present', Mercredi: 'Present', Jeudi: 'Present', Vendredi: 'Present', Samedi: 'Holiday', Dimanche: 'Holiday' } },
    { id: 7, name: "Sharon Neville", shifts: { Lundi: 'Present', Mardi: 'Present', Mercredi: 'Present', Jeudi: 'Present', Vendredi: 'Present', Samedi: 'Holiday', Dimanche: 'Holiday' } },
];

const Analatics = () => {
    const [employees, setEmployees] = useState(employeesData);
    const [newEmployeeName, setNewEmployeeName] = useState('');
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [editingEmployeeName, setEditingEmployeeName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState(null);
    const [filterDay, setFilterDay] = useState(daysOfWeek[0]);
    const [sortDirection, setSortDirection] = useState('asc'); // 'asc' for ascending, 'desc' for descending

    const toggleStatus = (employeeId, day) => {
        setEmployees(employees.map(emp => {
            if (emp.id === employeeId) {
                const currentStatus = emp.shifts[day];
                let newStatus;
                if (currentStatus === 'Present') {
                    newStatus = 'Absent';
                } else if (currentStatus === 'Absent') {
                    newStatus = 'Holiday';
                } else {
                    newStatus = 'Present';
                }
                return {
                    ...emp,
                    shifts: { ...emp.shifts, [day]: newStatus }
                };
            }
            return emp;
        }));
    };

    const addEmployee = () => {
        if (newEmployeeName.trim() === '') return;
        const newId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
        const newEmployee = {
            id: newId,
            name: newEmployeeName,
            shifts: daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: 'Present' }), {})
        };
        setEmployees([...employees, newEmployee]);
        setNewEmployeeName('');
    };

    const deleteEmployee = (employeeId) => {
        setEmployees(employees.filter(emp => emp.id !== employeeId));
    };

    const startEditing = (employee) => {
        setEditingEmployeeId(employee.id);
        setEditingEmployeeName(employee.name);
    };

    const saveEdit = (employeeId) => {
        setEmployees(employees.map(emp => {
            if (emp.id === employeeId) {
                return { ...emp, name: editingEmployeeName };
            }
            return emp;
        }));
        setEditingEmployeeId(null);
        setEditingEmployeeName('');
    };

    const cancelEdit = () => {
        setEditingEmployeeId(null);
        setEditingEmployeeName('');
    };

    const resetData = () => {
        setEmployees(employeesData);
        setSearchTerm('');
        setFilterStatus(null);
    };

    const toggleSortDirection = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    // UseMemo to optimize filtering and sorting
    const filteredAndSortedEmployees = useMemo(() => {
        const filtered = employees.filter(employee => {
            const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = filterStatus ? employee.shifts[filterDay] === filterStatus : true;
            return matchesSearch && matchesStatus;
        });

        const sorted = [...filtered].sort((a, b) => {
            if (sortDirection === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });

        return sorted;
    }, [employees, searchTerm, filterStatus, filterDay, sortDirection]);

    const presentCount = employees.filter(emp => emp.shifts[filterDay] === 'Present').length;
    const absentCount = employees.filter(emp => emp.shifts[filterDay] === 'Absent').length;
    const holidayCount = employees.filter(emp => emp.shifts[filterDay] === 'Holiday').length;

    return (
        <div className="scheduler-container">
            <div className="scheduler-header">
                <div className="navigation">
                    <button>&#8249;</button>
                    <span>Du 21 au 27 sept 2025</span>
                    <button>&#8250;</button>
                </div>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card">Total Employés: <span>{employees.length}</span></div>
                <div className="stat-card present-count">Présents aujourd'hui: <span>{presentCount}</span></div>
                <div className="stat-card absent-count">Absents aujourd'hui: <span>{absentCount}</span></div>
                <div className="stat-card holiday-count">En vacances: <span>{holidayCount}</span></div>
            </div>

            <div className="scheduler-controls">
                <input
                    type="text"
                    placeholder="Rechercher un employé..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select onChange={(e) => setFilterDay(e.target.value)} value={filterDay}>
                    {daysOfWeek.map(day => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                </select>
                <button onClick={() => setFilterStatus('Present')}>Présent</button>
                <button onClick={() => setFilterStatus('Absent')}>Absent</button>
                <button onClick={() => setFilterStatus('Holiday')}>Vacances</button>
                <button onClick={() => setFilterStatus(null)}>Tous</button>
                <button className="reset-btn" onClick={resetData}>Réinitialiser</button>
            </div>

            <div className="scheduler-controls add-employee-form">
                <input
                    type="text"
                    placeholder="Nom du nouvel employé"
                    value={newEmployeeName}
                    onChange={(e) => setNewEmployeeName(e.target.value)}
                />
                <button onClick={addEmployee}>Ajouter Employé</button>
            </div>

            <div className="scheduler-grid">
                <div className="grid-header">
                    <div className="employee-column-header">
                        Membres
                        <button className="sort-btn" onClick={toggleSortDirection}>
                            {sortDirection === 'asc' ? '▲' : '▼'}
                        </button>
                    </div>
                    {daysOfWeek.map(day => (
                        <div key={day} className="day-column-header">{day}</div>
                    ))}
                    <div className="actions-header">Actions</div>
                </div>
                {/* ------------------------------------------------------------- */}
                {/* C'est ici que les employés sont affichés ligne par ligne. */}
                {/* Le nom est la première cellule dans le 'grid-row'.       */}
                {/* ------------------------------------------------------------- */}
                {filteredAndSortedEmployees.map(employee => (
                    <div key={employee.id} className={`grid-row ${editingEmployeeId === employee.id ? 'editing-row' : ''}`}>
                        {editingEmployeeId === employee.id ? (
                            // Champ d'édition du nom
                            <div className="employee-name-cell">
                                <input
                                    type="text"
                                    value={editingEmployeeName}
                                    onChange={(e) => setEditingEmployeeName(e.target.value)}
                                />
                            </div>
                        ) : (
                            // Affichage du nom de l'employé
                            <div className="employee-name-cell">**{employee.name}**</div>
                        )}
                        {/* Cellules de statut pour les jours de la semaine */}
                        {daysOfWeek.map(day => (
                            <div
                                key={day}
                                className={`status-cell ${employee.shifts[day].toLowerCase()}`}
                                onClick={() => toggleStatus(employee.id, day)}
                            >
                                {employee.shifts[day]}
                            </div>
                        ))}
                        {/* Boutons d'action (Modifier/Supprimer ou Enregistrer/Annuler) */}
                        <div className="action-buttons">
                            {editingEmployeeId === employee.id ? (
                                <>
                                    <button className="save-btn" onClick={() => saveEdit(employee.id)}>Enregistrer</button>
                                    <button className="cancel-btn" onClick={cancelEdit}>Annuler</button>
                                </>
                            ) : (
                                <>
                                    <button className="edit-btn" onClick={() => startEditing(employee)}>Modifier</button>
                                    <button className="delete-btn" onClick={() => deleteEmployee(employee.id)}>Supprimer</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Analatics;