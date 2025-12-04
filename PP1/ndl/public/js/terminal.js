// Gestion du terminal Linux simulé
const input = document.getElementById('cmd');
const output = document.getElementById('output');

// Historique des commandes
let commandHistory = [];
let historyIndex = -1;

// Écouter l'événement keydown
input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        await runCommand();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateHistory('up');
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateHistory('down');
    }
});

// Fonction pour exécuter une commande
async function runCommand() {
    const cmd = input.value.trim();

    if (cmd === '') {
        return;
    }

    // Ajouter la commande à l'historique
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    // Afficher la commande dans le terminal
    output.textContent += `\n$ ${cmd}`;

    // Gestion de la commande 'clear'
    if (cmd === 'clear') {
        output.textContent = '';
        input.value = '';
        return;
    }

    try {
        // Envoyer la commande au serveur
        const response = await fetch('/api/command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command: cmd })
        });

        const data = await response.json();

        if (data.success) {
            if (data.output === 'CLEAR') {
                output.textContent = '';
            } else if (data.output) {
                output.textContent += `\n${data.output}`;
            }
        } else {
            output.textContent += `\nErreur: ${data.output}`;
        }

    } catch (error) {
        output.textContent += `\nErreur de connexion au serveur`;
        console.error('Erreur:', error);
    }

    // Vider l'input
    input.value = '';

    // Scroller vers le bas
    output.scrollTop = output.scrollHeight;
}

// Navigation dans l'historique des commandes
function navigateHistory(direction) {
    if (direction === 'up' && historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
    } else if (direction === 'down' && historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
    } else if (direction === 'down' && historyIndex === commandHistory.length - 1) {
        historyIndex = commandHistory.length;
        input.value = '';
    }
}

// Focus automatique sur l'input au clic sur le terminal
document.querySelector('.terminal').addEventListener('click', () => {
    input.focus();
});