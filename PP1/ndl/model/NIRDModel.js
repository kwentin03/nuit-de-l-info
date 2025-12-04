// Système de fichiers simulé
const fileSystem = {
    '/': ['home', 'usr', 'var', 'etc'],
    '/home': ['user', 'documents', 'downloads'],
    '/home/user': ['Documents', 'Téléchargements', 'Images', 'Bureau']
};

let currentPath = '/home/user';

// Commandes disponibles
const commands = {
    help: () => {
        return `Commandes disponibles :
  ls          - Liste les fichiers et dossiers
  pwd         - Affiche le répertoire courant
  cd [dir]    - Change de répertoire
  clear       - Efface le terminal
  help        - Affiche cette aide
  whoami      - Affiche l'utilisateur actuel
  date        - Affiche la date et l'heure
  echo [txt]  - Affiche un texte`;
    },

    ls: () => {
        const files = fileSystem[currentPath] || [];
        return files.length > 0 ? files.join('  ') : 'Répertoire vide';
    },

    pwd: () => {
        return currentPath;
    },

    cd: (args) => {
        if (!args || args === '~') {
            currentPath = '/home/user';
            return '';
        }

        if (args === '..') {
            const parts = currentPath.split('/').filter(p => p);
            parts.pop();
            currentPath = '/' + parts.join('/');
            if (currentPath === '/') currentPath = '/';
            return '';
        }

        const newPath = args.startsWith('/') ? args : `${currentPath}/${args}`;

        if (fileSystem[newPath]) {
            currentPath = newPath;
            return '';
        }

        return `cd: ${args}: Aucun fichier ou dossier de ce type`;
    },

    clear: () => {
        return 'CLEAR';
    },

    whoami: () => {
        return 'user';
    },

    date: () => {
        return new Date().toLocaleString('fr-FR');
    },

    echo: (args) => {
        return args || '';
    }
};

// Exécute une commande
exports.executeCommand = (input) => {
    const [cmd, ...args] = input.split(' ');
    const argString = args.join(' ');

    if (commands[cmd]) {
        return commands[cmd](argString);
    }

    return `Commande inconnue : ${cmd}`;
};

// Réinitialise le chemin
exports.resetPath = () => {
    currentPath = '/home/user';
};

export default NIRD;