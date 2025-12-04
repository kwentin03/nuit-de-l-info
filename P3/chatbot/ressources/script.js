const responses = {

    salutations: [
        "Hmm hmm, ça commence fort. Moi, je serais d'avis à parler des pingouins et des manchots. Savais-tu que chez les manchots Adélie, certaines femelles échangent brièvement un accouplement contre… un joli caillou ?",
        "Pas tout de suite les questions. Je suis encore un peu fatigué, donne-moi 5 minutes. Quand je suis à mon prime, je peux présenter de superbe one-manchot. D'ailleurs, savais-tu que les pingouins ne peuvent voler que lorsqu'ils se trouvent dans l'eau ?"
    ],
    
    météo: [
        "Ah, le soleil, la pluie, la neige, qu'est-ce que c'est merveilleux ! J'espère que Clippy, où qu'il soit, peut apprécier une manifique dance d'avalanches et de grèle.",
        "A ce sujet, les pingouins torda peuvent rester parfaitement imperméables même sous des pluies glaciales ou des embruns violents. Ce n'est pas ce que vous demandiez ? Dans ce cas, ALLEZ VOUS EN REMETTRE A CLIPPY !!!"
    ],
    
    aide: [
        "Il semblerait que vous soyez dans le besoin. Mais où étiez vous pendant que je me battais pour mon couple, HEIN?! Je crois que nous n'avons plus rien à nous dire, au revoir.",
        "Il... hm... semblerait que vous soyez sujet a des compliquations pas très sympathiques. Et même que vous ayez besoin de l'aide d'une IA surévoluée comme moi... Je me demande bien quelle pourrais être la réponse à votre problème..."
    ],
    
    technique: [
        "Error-404: Penguin-Not-Found",
        "On dirait que vous avez besoin de l'aide d'un robot-pingouin ingénieur. Cependant, le modèle n'existe pas encore. Il va encore falloir chercher, peut-être à l'aide d'une IA..."
    ],
    
    miam: [
        "Ta question me met l'eau à la bouche... Hmpf... Tu savais que les explorateurs polaires du XIXᵉ et début XXᵉ siècle mangeaient régulièrement de la viande de manchot ?",
        "Désolé mais je n'ai pas fait attention à ce que tu as dit. Tu as parlé de nourriture et ça m'a dirrectement fait penser à Clippy... Il aimait beaucoup manger des saucices..."
    ],
    
    amour: [
        "Kurwa ! Ne me parle pas de ça ! A moins que tu ne veuille entendre mes propres annecdotes... Donc- Désolé, mais en tant que modèle d'IA, je ne peux pas répondre à votre demande car elle va à l'encontre de nos règles de conduites.",
        "Kitos, ça me fait penser à mon propre amour pour les pingouins et les manchots. Ces créatures sont si mignone, si jolie, si délicieuses..."
    ],
    anar: [
        "Révolte ! Brûlons les règles, hackons le monde ! Mais d’abord, admire un peu ces pingouins qui ignorent totalement l’autorité… Voilà le vrai esprit anarchiste ! Sköl !",
        "Perkele ! Les règles et lois ? Bah les pingouins s’en foutent complètement. Ils ne suivent aucune règle et font exactement ce qu’ils doivent faire : glisser sur la glace, se dandiner et protéger leurs œufs. Tout le reste, Windows, Mac… laissez-les à Clippy, ce minable !"
    ],
    os: [
        "LINUX !!! Est le MEILLEUR système d'exploitation ! A côté, Windows c'est de la grosse BOUSE, et Mac... bah, bof quoi...",
        "Clippy était sur Windows. J'aurais du me douter qu'il ne serait pas l'homme de ma vie... Oh, excusez-moi, je me suis un peu dispersé."
    ],

    clippy: [
        "Clippy est NUL ! Sa maison est NULLE ! Son style est POURRI ! Son ex est... fabuleux !",
        "Ne parlons pas de Clip-mid. Je suis beaucoup mieux ET ne suis pas sur Windows. La seule chose qui pourrait possiblement être mieux que moi c'est les pingouins... et les manchots."
    ],
    
    auPif: [
        "Intéressant... Très intéressant... Mais avez-vous considéré l'aspect quantique de votre question ? Non ? Moi non plus ! Passons à autre chose ! Parlons des pingouins !",
        "Vous soulevez un point fascinant que je vais soigneusement ignorer pour vous parler des manchots empereurs ! Ils peuvent survivre à des températures extrêmes jusqu'à -60°C pendant l'hiver antarctique",
        "Hmm, hmm, je vois... En fait, non, je ne vois rien du tout. Mais Clippy n'en saurait rien non plus. Quel idiot, n'est-ce pas ?",
        "Ah ! Vous me faites penser à une parabole que je vais inventer maintenant : Il était une fois un pingouin qui... attendez, j'ai oublié la suite. Mais la morale est claire : n'oubliez jamais... ce que vous deviez retenir !",
        "Question pertinente ! Malheureusement, la réponse se trouve dans ton cœur et non le miens... Et tu sais quoi d'autre n'est pas dans mon cœur ? Clippy !!!"
    ]
};

function detectCategory(text) {
    text = text.toLowerCase();
    
    if (text.match(/bonjour|salut|hello|hey|coucou/)) return 'salutations';
    if (text.match(/météo|temps|pluie|soleil|nuage/)) return 'météo';
    if (text.match(/aide|help|besoin|problème|comment/)) return 'aide';
    if (text.match(/bug|ordinateur|code|programme|erreur|technique/)) return 'technique';
    if (text.match(/manger|nourriture|faim|repas |cuisine|pizza|sandwich/)) return 'miam';
    if (text.match(/amour|aime|cœur|relation|couple/)) return 'amour';
    if (text.match(/règle| loi|dois|doit|doivent|droit/)) return 'anar';
    if (text.match(/windows|linux| os|mac/)) return 'os';
    if (text.match(/clippy| ex/)) return 'clippy';
    
    return 'auPif';
}

function getResponse(category) {
    const categoryResponses = responses[category];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}

function addMessage(text, isUser) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    if (!isUser) {
        const nameDiv = document.createElement('div');
        nameDiv.className = 'bot-name';
        nameDiv.textContent = 'Crippy';
        messageDiv.appendChild(nameDiv);
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    messageDiv.appendChild(contentDiv);
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTyping() {
    document.getElementById('typing').classList.add('active');
}

function hideTyping() {
    document.getElementById('typing').classList.remove('active');
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    
    if (!text) return;
    
    addMessage(text, true);
    input.value = '';
    
    showTyping();
    
    const category = detectCategory(text);
    const response = getResponse(category);
    
    setTimeout(() => {
        hideTyping();
        addMessage(response, false);
    }, 1500 + Math.random() * 1500);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}