const commandModel = require('../model/NIRDModel');

// Affiche la page principale
exports.getHomePage = (req, res) => {
    const pageData = {
        title: 'NIRD - S\'ENGAGER ET LIBÉRER',
        sections: {
            context: {
                title: 'Contexte',
                content: 'Linux est un système d\'exploitation libre et open-source qui offre une liberté totale à ses utilisateurs.'
            },
            interet: {
                title: 'Intérêt',
                content: 'Apprendre Linux vous permet de comprendre les fondements de l\'informatique moderne et de maîtriser un outil puissant utilisé par des millions de développeurs et d\'entreprises.'
            }
        },
        learnCards: [
            'Introduction à Linux',
            'Le système de fichiers',
            'Commandes de base',
            'Permissions',
            'Processus',
            'Gestion des paquets'
        ]
    };

    res.render('index', pageData);
};

// Exécute une commande Linux simulée
exports.executeCommand = (req, res) => {
    const { command } = req.body;
    
    if (!command) {
        return res.json({ 
            success: false, 
            output: 'Aucune commande fournie' 
        });
    }

    const result = commandModel.executeCommand(command.trim());
    
    res.json({
        success: true,
        output: result
    });
};

export default NIRDCONTROLLER;