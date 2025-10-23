import React from 'react';
import { FcPhone } from 'react-icons/fc';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './About.css'; // Renommer le fichier CSS pour la cohérence

const About = () => {
    // Données de démonstration pour le profil de l'employé
    const employee = {
        name: "Marie Dubois",
        position: "Développeuse Front-end",
        department: "Développement Web",
        email: "marie.dubois@entreprise.com",
        phone: "+33 6 12 34 56 78",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734b419?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    };

    // Données de démonstration pour le graphique de performance
    const performanceData = [
        { name: 'Jan', tasksCompleted: 20, bugsFixed: 5 },
        { name: 'Fév', tasksCompleted: 25, bugsFixed: 3 },
        { name: 'Mar', tasksCompleted: 30, bugsFixed: 2 },
        { name: 'Avr', tasksCompleted: 22, bugsFixed: 4 },
        { name: 'Mai', tasksCompleted: 28, bugsFixed: 1 },
        { name: 'Juin', tasksCompleted: 35, bugsFixed: 0 },
    ];

    return (
        <div className="dashboard-container">
            <div className="main-content">
                <div className="welcome-card card">
                    <h1>Bonjour, Marie</h1>
                    <p>Voici un aperçu de votre tableau de bord.</p>
                </div>
                
                <div className="profile-card card">
                    <img src={employee.photo} alt={`Photo de ${employee.name}`} className="profile-photo" />
                    <div className="profile-info">
                        <h2>{employee.name}</h2>
                        <p className="profile-position">{employee.position}</p>
                        <p className="profile-department">{employee.department}</p>
                        <div className="contact-info">
                            <a href={`tel:${employee.phone}`}><FcPhone /> {employee.phone}</a>
                            <a href={`mailto:${employee.email}`}>{employee.email}</a>
                        </div>
                    </div>
                </div>

                <div className="goals-card card">
                    <h3>Objectifs en cours</h3>
                    <ul className="goals-list">
                        <li>✨ Terminer le projet "Dashboard RH" avant la fin du mois.</li>
                        <li>🎯 Assister à la conférence sur React Native en juillet.</li>
                        <li>💡 Mettre en place un système de revue de code pour l'équipe.</li>
                    </ul>
                </div>

                <div className="performance-card card">
                    <h3>Performance sur 6 mois</h3>
                    <ResponsiveContainer width="100%" aspect={2.5}>
                        <LineChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="tasksCompleted" stroke="#8884d8" name="Tâches accomplies" />
                            <Line type="monotone" dataKey="bugsFixed" stroke="#82ca9d" name="Bugs corrigés" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default About;