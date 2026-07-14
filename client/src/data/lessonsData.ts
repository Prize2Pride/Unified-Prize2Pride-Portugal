export interface VocabItem {
  word: string;
  translation: string;
  pronunciation: string;
  example?: string;
}

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "true-false";
  question: string;
  options?: string[];
  correctAnswer: string | number | boolean;
}

export interface Dialogue {
  speaker: string;
  text: string;
}

export interface LessonData {
  id: number;
  title: string;
  titlePt: string;
  description: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  topic: string;
  order: number;
  vocabulary: VocabItem[];
  grammar: string;
  readingComprehension: string;
  readingComprehensionTranslation: string;
  dialogues: Dialogue[];
  quizQuestions: QuizQuestion[];
}

export const lessonsData: LessonData[] = [
  // ─── A1 LESSONS ─────────────────────────────────────────────
  {
    id: 1,
    title: "Greetings & Introductions",
    titlePt: "Saudações e Apresentações",
    description: "Learn how to greet people and introduce yourself in Portuguese.",
    level: "A1",
    topic: "Greetings",
    order: 1,
    vocabulary: [
      { word: "Olá", translation: "Hello", pronunciation: "oh-LAH", example: "Olá! Como vai?" },
      { word: "Bom dia", translation: "Good morning", pronunciation: "bom JEE-ah", example: "Bom dia, professora!" },
      { word: "Boa tarde", translation: "Good afternoon", pronunciation: "BOH-ah TAR-deh", example: "Boa tarde, senhor Silva." },
      { word: "Boa noite", translation: "Good evening/night", pronunciation: "BOH-ah NOY-teh", example: "Boa noite a todos." },
      { word: "Tchau / Adeus", translation: "Bye / Farewell", pronunciation: "CHOW / ah-DAY-oosh", example: "Tchau! Até amanhã." },
      { word: "Por favor", translation: "Please", pronunciation: "por fah-VOR", example: "Um café, por favor." },
      { word: "Obrigado/a", translation: "Thank you", pronunciation: "oh-bree-GAH-doo/dah", example: "Obrigada pela ajuda." },
      { word: "De nada", translation: "You're welcome", pronunciation: "deh NAH-dah", example: "— Obrigado! — De nada." },
      { word: "Com licença", translation: "Excuse me", pronunciation: "kom lee-SEN-sah", example: "Com licença, pode ajudar-me?" },
      { word: "Desculpe", translation: "Sorry", pronunciation: "desh-KOOL-peh", example: "Desculpe o atraso." },
      { word: "Sim / Não", translation: "Yes / No", pronunciation: "seem / now", example: "Sim, eu falo português." },
      { word: "Como se chama?", translation: "What is your name?", pronunciation: "KOH-moo seh SHAH-mah", example: "Como se chama?" },
      { word: "Chamo-me...", translation: "My name is...", pronunciation: "SHAH-moo-meh", example: "Chamo-me Ana." },
      { word: "Prazer", translation: "Nice to meet you", pronunciation: "prah-ZER", example: "Muito prazer!" },
      { word: "Até logo", translation: "See you later", pronunciation: "ah-TEH LOH-goo", example: "Até logo, amigo!" },
    ],
    grammar: `## Greetings in Portuguese

### Time-Based Greetings
Portuguese uses different greetings depending on the time of day:

| Time | Greeting | Meaning |
|------|----------|---------|
| Morning (until ~noon) | **Bom dia** | Good morning |
| Afternoon (~noon–6pm) | **Boa tarde** | Good afternoon |
| Evening/Night (after 6pm) | **Boa noite** | Good evening / Good night |
| Any time | **Olá** | Hello |

### "Obrigado" vs "Obrigada"
This is one of the first grammar points in Portuguese: adjectives and some words **agree with the gender of the speaker**, not the listener.
- **Obrigado** — said by a man (masculine)
- **Obrigada** — said by a woman (feminine)

> **Tip:** This rule applies to many adjectives in Portuguese. The speaker's gender determines the form used.

### Formal vs Informal
- **Informal:** \`Olá!\`, \`Oi!\`, \`Tchau!\` (common in Brazil)
- **Formal:** \`Bom dia, senhor/senhora\`, \`Com licença\`, \`Adeus\`

### European vs Brazilian Portuguese
- In **European Portuguese (EP)**, "Olá" is standard; "Oi" is less common
- In **Brazilian Portuguese (BP)**, "Oi" is very common and friendly
- "Tchau" comes from Italian *ciao* and is used in both varieties`,
    readingComprehension: `**Uma manhã em Lisboa**

É segunda-feira de manhã. Ana acorda cedo e vai ao café perto de casa. O senhor Manuel, o dono do café, está atrás do balcão.

— Bom dia, Ana! Como está? — diz o senhor Manuel com um sorriso.

— Bom dia, senhor Manuel! Estou bem, obrigada. E o senhor? — responde Ana.

— Muito bem, muito bem. O café do costume?

— Sim, por favor. E uma torrada com manteiga.

— Claro! Um momento, por favor.

Ana senta-se perto da janela. Ela vê os vizinhos a passar na rua. A senhora Fátima passa e acena.

— Olá, Ana! Bom dia!

— Bom dia, dona Fátima! Até logo!

O senhor Manuel traz o café e a torrada.

— Aqui está. Bom proveito!

— Obrigada, senhor Manuel. Tem um bom dia!

— Igualmente, Ana. Até amanhã!`,
    readingComprehensionTranslation: `**A Morning in Lisbon**

It's Monday morning. Ana wakes up early and goes to the café near her house. Mr. Manuel, the café owner, is behind the counter.

— Good morning, Ana! How are you? — says Mr. Manuel with a smile.

— Good morning, Mr. Manuel! I'm fine, thank you. And you? — Ana replies.

— Very well, very well. The usual coffee?

— Yes, please. And a toast with butter.

— Of course! One moment, please.

Ana sits near the window. She sees the neighbors passing in the street. Mrs. Fátima passes by and waves.

— Hello, Ana! Good morning!

— Good morning, Mrs. Fátima! See you later!

Mr. Manuel brings the coffee and toast.

— Here you are. Enjoy your meal!

— Thank you, Mr. Manuel. Have a good day!

— Likewise, Ana. See you tomorrow!`,
    dialogues: [
      { speaker: "A", text: "Bom dia! Como se chama?" },
      { speaker: "B", text: "Bom dia! Chamo-me Carlos. E você?" },
      { speaker: "A", text: "Chamo-me Maria. Muito prazer!" },
      { speaker: "B", text: "Igualmente! É português/a?" },
      { speaker: "A", text: "Sim, sou de Lisboa. E você?" },
      { speaker: "B", text: "Sou do Porto. Até logo, Maria!" },
    ],
    quizQuestions: [
      { id: "1", type: "multiple-choice", question: "How do you say 'Good morning' in Portuguese?", options: ["Boa noite", "Boa tarde", "Bom dia", "Olá"], correctAnswer: 2 },
      { id: "2", type: "true-false", question: "A woman says 'Obrigado' to thank someone.", correctAnswer: false },
      { id: "3", type: "multiple-choice", question: "Which greeting is used in the evening?", options: ["Bom dia", "Boa tarde", "Boa noite", "Olá"], correctAnswer: 2 },
      { id: "4", type: "multiple-choice", question: "How do you say 'What is your name?' in Portuguese?", options: ["Como está?", "Como se chama?", "De onde é?", "Quanto custa?"], correctAnswer: 1 },
      { id: "5", type: "true-false", question: "'Tchau' is used to say goodbye.", correctAnswer: true },
      { id: "6", type: "multiple-choice", question: "What does 'De nada' mean?", options: ["Thank you", "Please", "You're welcome", "Excuse me"], correctAnswer: 2 },
      { id: "7", type: "multiple-choice", question: "In the reading, what did Ana order?", options: ["Tea and cake", "Coffee and toast", "Juice and bread", "Water and biscuit"], correctAnswer: 1 },
      { id: "8", type: "true-false", question: "'Com licença' means 'I'm sorry'.", correctAnswer: false },
    ],
  },
  {
    id: 2,
    title: "Numbers & Counting",
    titlePt: "Números e Contagem",
    description: "Learn numbers 1-100 and how to use them in everyday situations.",
    level: "A1",
    topic: "Numbers",
    order: 2,
    vocabulary: [
      { word: "um / uma", translation: "one", pronunciation: "oom / OO-mah", example: "Tenho um irmão." },
      { word: "dois / duas", translation: "two", pronunciation: "doysh / DOO-ash", example: "Duas cervejas, por favor." },
      { word: "três", translation: "three", pronunciation: "traysh", example: "Três filhos." },
      { word: "quatro", translation: "four", pronunciation: "KWAH-troo", example: "Quatro horas." },
      { word: "cinco", translation: "five", pronunciation: "SEEN-koo", example: "Cinco euros." },
      { word: "seis", translation: "six", pronunciation: "saysh", example: "Seis dias." },
      { word: "sete", translation: "seven", pronunciation: "SEH-teh", example: "Sete pessoas." },
      { word: "oito", translation: "eight", pronunciation: "OY-too", example: "Oito horas da manhã." },
      { word: "nove", translation: "nine", pronunciation: "NOH-veh", example: "Nove meses." },
      { word: "dez", translation: "ten", pronunciation: "desh", example: "Dez minutos." },
      { word: "vinte", translation: "twenty", pronunciation: "VEEN-teh", example: "Vinte anos." },
      { word: "trinta", translation: "thirty", pronunciation: "TREEN-tah", example: "Trinta reais." },
      { word: "cem", translation: "one hundred", pronunciation: "seng", example: "Cem por cento." },
      { word: "mil", translation: "one thousand", pronunciation: "meel", example: "Mil pessoas." },
      { word: "zero", translation: "zero", pronunciation: "ZEH-roo", example: "Zero graus." },
    ],
    grammar: `## Numbers in Portuguese

### 1–10
| Number | Portuguese | Pronunciation |
|--------|-----------|---------------|
| 1 | um / uma | oom / OO-mah |
| 2 | dois / duas | doysh / DOO-ash |
| 3 | três | traysh |
| 4 | quatro | KWAH-troo |
| 5 | cinco | SEEN-koo |
| 6 | seis | saysh |
| 7 | sete | SEH-teh |
| 8 | oito | OY-too |
| 9 | nove | NOH-veh |
| 10 | dez | desh |

### 11–20
- 11 = **onze**, 12 = **doze**, 13 = **treze**, 14 = **catorze/quatorze**, 15 = **quinze**
- 16 = **dezasseis (EP) / dezesseis (BP)**, 17 = **dezassete**, 18 = **dezoito**, 19 = **dezanove**, 20 = **vinte**

### Tens
- 20 = **vinte**, 30 = **trinta**, 40 = **quarenta**, 50 = **cinquenta**
- 60 = **sessenta**, 70 = **setenta**, 80 = **oitenta**, 90 = **noventa**

### Compound Numbers
Use **e** (and) between tens and units:
- 21 = **vinte e um**, 35 = **trinta e cinco**, 99 = **noventa e nove**

### Gender Agreement
Numbers 1 and 2 agree with the noun:
- **um** livro (m) / **uma** mesa (f)
- **dois** livros (m) / **duas** mesas (f)

> **Note:** All other numbers are invariable — they don't change for gender.`,
    readingComprehension: `**No mercado**

A Joana vai ao mercado todos os sábados. Hoje ela precisa de comprar frutas e legumes.

— Bom dia! Quanto custam as laranjas? — pergunta a Joana.

— Bom dia! São dois euros o quilo — responde o vendedor.

— Quero três quilos, por favor.

— Muito bem. Mais alguma coisa?

— Sim. Quero também um quilo de maçãs e dois quilos de tomates.

— As maçãs são um euro e cinquenta o quilo, e os tomates são noventa cêntimos.

A Joana faz as contas: três quilos de laranjas são seis euros; um quilo de maçãs é um euro e cinquenta; dois quilos de tomates são um euro e oitenta. No total, são nove euros e trinta cêntimos.

— Aqui tem dez euros.

— E aqui tem setenta cêntimos de troco. Obrigado e bom dia!

— Obrigada! Até sábado!`,
    readingComprehensionTranslation: `**At the market**

Joana goes to the market every Saturday. Today she needs to buy fruits and vegetables.

— Good morning! How much do the oranges cost? — Joana asks.

— Good morning! They are two euros per kilo — the vendor replies.

— I want three kilos, please.

— Very good. Anything else?

— Yes. I also want one kilo of apples and two kilos of tomatoes.

— The apples are one euro fifty per kilo, and the tomatoes are ninety cents.

Joana does the math: three kilos of oranges are six euros; one kilo of apples is one euro fifty; two kilos of tomatoes are one euro eighty. In total, it's nine euros and thirty cents.

— Here are ten euros.

— And here are seventy cents change. Thank you and good morning!

— Thank you! See you Saturday!`,
    dialogues: [
      { speaker: "A", text: "Quantos anos tens?" },
      { speaker: "B", text: "Tenho vinte e cinco anos. E tu?" },
      { speaker: "A", text: "Tenho trinta e dois. Qual é o teu número de telefone?" },
      { speaker: "B", text: "É o noventa e um, trezentos e vinte, quarenta e cinco, sessenta e sete." },
    ],
    quizQuestions: [
      { id: "1", type: "multiple-choice", question: "What is 'fifteen' in Portuguese?", options: ["Cinquenta", "Quinze", "Cinquenta e cinco", "Treze"], correctAnswer: 1 },
      { id: "2", type: "true-false", question: "The number 'dois' can change to 'duas' depending on the noun's gender.", correctAnswer: true },
      { id: "3", type: "multiple-choice", question: "How do you say 'thirty-five' in Portuguese?", options: ["Vinte e cinco", "Trinta e cinco", "Quarenta e cinco", "Trinta e seis"], correctAnswer: 1 },
      { id: "4", type: "multiple-choice", question: "What does 'cem' mean?", options: ["Ten", "Fifty", "One hundred", "One thousand"], correctAnswer: 2 },
      { id: "5", type: "true-false", question: "In European Portuguese, 16 is 'dezesseis'.", correctAnswer: false },
      { id: "6", type: "multiple-choice", question: "How much did Joana pay in total at the market?", options: ["€8.50", "€9.30", "€10.00", "€7.80"], correctAnswer: 1 },
      { id: "7", type: "multiple-choice", question: "What is 'oito' in English?", options: ["Six", "Seven", "Eight", "Nine"], correctAnswer: 2 },
      { id: "8", type: "true-false", question: "The word 'e' is used between tens and units in compound numbers.", correctAnswer: true },
    ],
  },
  // ─── A2 LESSONS ─────────────────────────────────────────────
  {
    id: 11,
    title: "Past Tense — Pretérito Perfeito",
    titlePt: "Pretérito Perfeito Simples",
    description: "Learn to talk about completed past actions using the simple past tense.",
    level: "A2",
    topic: "Past Tense",
    order: 1,
    vocabulary: [
      { word: "ontem", translation: "yesterday", pronunciation: "ON-teng", example: "Ontem fui ao cinema." },
      { word: "anteontem", translation: "the day before yesterday", pronunciation: "an-teh-ON-teng", example: "Anteontem choveu muito." },
      { word: "na semana passada", translation: "last week", pronunciation: "nah seh-MAH-nah pah-SAH-dah", example: "Na semana passada trabalhei muito." },
      { word: "no ano passado", translation: "last year", pronunciation: "noo AH-noo pah-SAH-doo", example: "No ano passado fui a Paris." },
      { word: "já", translation: "already", pronunciation: "zhah", example: "Já comi." },
      { word: "ainda não", translation: "not yet", pronunciation: "ah-EEN-dah now", example: "Ainda não terminei." },
      { word: "fui", translation: "I went / I was", pronunciation: "fwee", example: "Fui ao supermercado." },
      { word: "comi", translation: "I ate", pronunciation: "koh-MEE", example: "Comi uma pizza." },
      { word: "falei", translation: "I spoke", pronunciation: "fah-LAY", example: "Falei com a professora." },
      { word: "trabalhei", translation: "I worked", pronunciation: "trah-bah-LYAY", example: "Trabalhei oito horas." },
      { word: "comprei", translation: "I bought", pronunciation: "kom-PRAY", example: "Comprei um livro novo." },
      { word: "vi", translation: "I saw", pronunciation: "vee", example: "Vi um filme excelente." },
      { word: "cheguei", translation: "I arrived", pronunciation: "sheh-GAY", example: "Cheguei tarde." },
      { word: "saí", translation: "I left/went out", pronunciation: "sah-EE", example: "Saí de casa às oito." },
      { word: "dormi", translation: "I slept", pronunciation: "dor-MEE", example: "Dormi muito bem." },
    ],
    grammar: `## Pretérito Perfeito Simples (Simple Past)

The **Pretérito Perfeito Simples** is used for completed past actions — things that happened and are finished.

### Regular -AR Verbs (e.g., falar — to speak)
| Person | Conjugation |
|--------|------------|
| Eu | fal**ei** |
| Tu | fal**aste** |
| Ele/Ela/Você | fal**ou** |
| Nós | fal**ámos** (EP) / fal**amos** (BP) |
| Vós | fal**astes** |
| Eles/Vocês | fal**aram** |

### Regular -ER Verbs (e.g., comer — to eat)
| Person | Conjugation |
|--------|------------|
| Eu | com**i** |
| Tu | com**este** |
| Ele/Ela/Você | com**eu** |
| Nós | com**emos** |
| Vós | com**estes** |
| Eles/Vocês | com**eram** |

### Regular -IR Verbs (e.g., partir — to leave)
| Person | Conjugation |
|--------|------------|
| Eu | part**i** |
| Tu | part**iste** |
| Ele/Ela/Você | part**iu** |
| Nós | part**imos** |
| Vós | part**istes** |
| Eles/Vocês | part**iram** |

### Key Irregular Verbs
| Infinitive | Eu | Ele/Ela | Nós | Eles |
|-----------|-----|---------|-----|------|
| **ser/ir** | fui | foi | fomos | foram |
| **ter** | tive | teve | tivemos | tiveram |
| **fazer** | fiz | fez | fizemos | fizeram |
| **vir** | vim | veio | viemos | vieram |
| **ver** | vi | viu | vimos | viram |

> **Important:** \`ser\` (to be) and \`ir\` (to go) share the same past tense forms! Context tells you which is meant.`,
    readingComprehension: `**O fim de semana de Pedro**

No sábado passado, Pedro teve um dia muito ocupado. De manhã, acordou às sete horas e foi correr no parque durante uma hora. Depois, voltou para casa, tomou duche e preparou o pequeno-almoço.

À tarde, Pedro foi ao centro comercial com a namorada, a Sofia. Eles compraram roupas novas para o verão. Pedro comprou uma camisa azul e Sofia comprou um vestido verde. Depois das compras, foram a um restaurante e comeram uma refeição deliciosa — Pedro comeu bacalhau à brás e Sofia comeu frango grelhado.

À noite, os dois foram ao cinema ver um filme de ação. O filme foi muito bom e eles gostaram muito. Chegaram a casa às onze e meia da noite.

No domingo, Pedro ficou em casa e descansou. Leu um livro, ouviu música e dormiu uma sesta longa. Foi um fim de semana perfeito!`,
    readingComprehensionTranslation: `**Pedro's Weekend**

Last Saturday, Pedro had a very busy day. In the morning, he woke up at seven o'clock and went running in the park for an hour. Afterwards, he came back home, took a shower, and prepared breakfast.

In the afternoon, Pedro went to the shopping center with his girlfriend, Sofia. They bought new clothes for summer. Pedro bought a blue shirt and Sofia bought a green dress. After shopping, they went to a restaurant and ate a delicious meal — Pedro ate bacalhau à brás and Sofia ate grilled chicken.

In the evening, the two went to the cinema to see an action film. The film was very good and they enjoyed it a lot. They arrived home at half past eleven at night.

On Sunday, Pedro stayed home and rested. He read a book, listened to music, and slept a long nap. It was a perfect weekend!`,
    dialogues: [
      { speaker: "A", text: "O que fizeste no fim de semana?" },
      { speaker: "B", text: "Fui à praia com a família. E tu?" },
      { speaker: "A", text: "Fiquei em casa. Trabalhei muito." },
      { speaker: "B", text: "Que pena! Comeste algo especial?" },
      { speaker: "A", text: "Sim, cozinhei uma receita nova. Ficou muito boa!" },
      { speaker: "B", text: "Que bom! Da próxima vez convida-me!" },
    ],
    quizQuestions: [
      { id: "1", type: "multiple-choice", question: "What is the past tense of 'falar' (to speak) for 'eu'?", options: ["falou", "falei", "falaste", "falaram"], correctAnswer: 1 },
      { id: "2", type: "true-false", question: "'Ser' and 'ir' have different past tense forms.", correctAnswer: false },
      { id: "3", type: "multiple-choice", question: "What is the past tense of 'fazer' (to do) for 'ele'?", options: ["fez", "fiz", "fizeram", "fazeu"], correctAnswer: 0 },
      { id: "4", type: "multiple-choice", question: "What did Pedro eat at the restaurant?", options: ["Grilled chicken", "Bacalhau à brás", "Pizza", "Soup"], correctAnswer: 1 },
      { id: "5", type: "true-false", question: "'Ontem' means 'tomorrow'.", correctAnswer: false },
      { id: "6", type: "multiple-choice", question: "What is the -ER verb ending for 'nós' in the past tense?", options: ["-amos", "-emos", "-imos", "-aram"], correctAnswer: 1 },
      { id: "7", type: "multiple-choice", question: "How do you say 'I went' in Portuguese?", options: ["Eu ia", "Eu vou", "Eu fui", "Eu irei"], correctAnswer: 2 },
      { id: "8", type: "true-false", question: "Pedro went to the cinema on Sunday.", correctAnswer: false },
    ],
  },
  // ─── B1 LESSONS ─────────────────────────────────────────────
  {
    id: 21,
    title: "Subjunctive Mood — Present",
    titlePt: "Conjuntivo Presente",
    description: "Master the present subjunctive for expressing doubt, wishes, and emotions.",
    level: "B1",
    topic: "Subjunctive",
    order: 1,
    vocabulary: [
      { word: "espero que", translation: "I hope that", pronunciation: "esh-PEH-roo keh", example: "Espero que venhas." },
      { word: "quero que", translation: "I want (you) to", pronunciation: "KEH-roo keh", example: "Quero que estudes." },
      { word: "é importante que", translation: "it's important that", pronunciation: "eh eem-por-TAN-teh keh", example: "É importante que chegues a horas." },
      { word: "duvido que", translation: "I doubt that", pronunciation: "doo-VEE-doo keh", example: "Duvido que ele saiba." },
      { word: "talvez", translation: "maybe/perhaps", pronunciation: "tal-VESH", example: "Talvez venha amanhã." },
      { word: "oxalá", translation: "I hope / God willing", pronunciation: "oh-shah-LAH", example: "Oxalá passe no exame!" },
      { word: "embora", translation: "although", pronunciation: "em-BOH-rah", example: "Embora seja difícil, vou tentar." },
      { word: "para que", translation: "so that / in order that", pronunciation: "PAH-rah keh", example: "Falo devagar para que entendas." },
      { word: "desde que", translation: "as long as / since", pronunciation: "DESH-deh keh", example: "Vou, desde que me ajudes." },
      { word: "caso", translation: "in case / if", pronunciation: "KAH-zoo", example: "Caso precise, liga-me." },
      { word: "antes que", translation: "before (that)", pronunciation: "AN-tesh keh", example: "Sai antes que chova." },
      { word: "sem que", translation: "without (that)", pronunciation: "seng keh", example: "Saiu sem que eu soubesse." },
      { word: "a não ser que", translation: "unless", pronunciation: "ah now ser keh", example: "Vou, a não ser que chova." },
      { word: "por mais que", translation: "however much / no matter how", pronunciation: "por maysh keh", example: "Por mais que tente, não consigo." },
      { word: "que", translation: "that (conjunction)", pronunciation: "keh", example: "Espero que sejas feliz." },
    ],
    grammar: `## Conjuntivo Presente (Present Subjunctive)

The **subjunctive** (conjuntivo) is essential in Portuguese. Unlike English, it's used very frequently.

### When to Use the Subjunctive
1. **After expressions of wish, desire, emotion:** \`querer que\`, \`esperar que\`, \`gostar que\`
2. **After expressions of doubt or denial:** \`duvidar que\`, \`não acreditar que\`
3. **After impersonal expressions:** \`é importante que\`, \`é necessário que\`
4. **After certain conjunctions:** \`embora\`, \`para que\`, \`antes que\`, \`caso\`
5. **After \`talvez\` and \`oxalá\`**

### Formation
Take the **eu** form of the present indicative, drop the **-o**, and add subjunctive endings:

| Person | -AR (falar) | -ER (comer) | -IR (partir) |
|--------|------------|------------|-------------|
| Eu | fal**e** | com**a** | part**a** |
| Tu | fal**es** | com**as** | part**as** |
| Ele/Ela | fal**e** | com**a** | part**a** |
| Nós | fal**emos** | com**amos** | part**amos** |
| Vós | fal**eis** | com**ais** | part**ais** |
| Eles | fal**em** | com**am** | part**am** |

### Key Irregular Subjunctives
| Verb | Subjunctive (eu) |
|------|-----------------|
| **ser** | seja |
| **estar** | esteja |
| **ter** | tenha |
| **ir** | vá |
| **fazer** | faça |
| **saber** | saiba |
| **poder** | possa |

> **EP vs BP Note:** In Brazilian Portuguese, the subjunctive is used somewhat less frequently in informal speech, but it remains essential in formal and written Portuguese.`,
    readingComprehension: `**Uma conversa sobre o futuro**

A Mariana e o seu amigo Tomás estão a conversar sobre os planos para o futuro.

— Tomás, o que queres que aconteça na tua vida nos próximos anos?

— Espero que consiga terminar o mestrado antes que acabe o ano. É importante que encontre um bom emprego, embora saiba que o mercado de trabalho esteja difícil.

— Eu também duvido que seja fácil, mas oxalá as coisas melhorem! Talvez seja boa ideia fazeres um estágio no estrangeiro, para que ganhe mais experiência.

— Tens razão. Caso apareça uma oportunidade boa, não vou hesitar. Mas preciso que os meus pais me apoiem, a não ser que consiga uma bolsa.

— Estou certa de que vão apoiar-te, desde que lhes expliques bem os teus planos. Por mais que o caminho seja difícil, vale a pena tentar.

— Obrigado, Mariana. É bom ter amigos que acreditem em nós!`,
    readingComprehensionTranslation: `**A Conversation About the Future**

Mariana and her friend Tomás are talking about plans for the future.

— Tomás, what do you want to happen in your life in the coming years?

— I hope I manage to finish my master's degree before the year ends. It's important that I find a good job, although I know the job market is difficult.

— I also doubt it will be easy, but I hope things improve! Maybe it would be a good idea to do an internship abroad, so that you gain more experience.

— You're right. If a good opportunity comes up, I won't hesitate. But I need my parents to support me, unless I manage to get a scholarship.

— I'm sure they'll support you, as long as you explain your plans well to them. However difficult the path may be, it's worth trying.

— Thank you, Mariana. It's good to have friends who believe in us!`,
    dialogues: [
      { speaker: "A", text: "Espero que o tempo melhore para o fim de semana." },
      { speaker: "B", text: "Eu também! Talvez possamos ir à praia, caso não chova." },
      { speaker: "A", text: "É importante que reservemos um lugar antes que esteja cheio." },
      { speaker: "B", text: "Tens razão. Vou ligar para que nos guardem mesa." },
    ],
    quizQuestions: [
      { id: "1", type: "multiple-choice", question: "What is the subjunctive of 'ser' for 'eu'?", options: ["sou", "era", "seja", "fui"], correctAnswer: 2 },
      { id: "2", type: "true-false", question: "'Talvez' is always followed by the subjunctive.", correctAnswer: true },
      { id: "3", type: "multiple-choice", question: "Which conjunction requires the subjunctive?", options: ["porque", "quando (future)", "embora", "All of the above"], correctAnswer: 2 },
      { id: "4", type: "multiple-choice", question: "What is the subjunctive of 'fazer' for 'ele'?", options: ["faz", "fazia", "faça", "fizesse"], correctAnswer: 2 },
      { id: "5", type: "true-false", question: "The subjunctive is rarely used in formal Portuguese.", correctAnswer: false },
      { id: "6", type: "multiple-choice", question: "What does 'oxalá' express?", options: ["Doubt", "Hope/wish", "Certainty", "Obligation"], correctAnswer: 1 },
      { id: "7", type: "multiple-choice", question: "What is Tomás hoping to finish?", options: ["His bachelor's degree", "His master's degree", "His PhD", "A language course"], correctAnswer: 1 },
      { id: "8", type: "true-false", question: "'Embora' is followed by the subjunctive.", correctAnswer: true },
    ],
  },
  // ─── B2 LESSON ───────────────────────────────────────────────
  {
    id: 31,
    title: "Conditional Tense & Hypotheticals",
    titlePt: "Condicional e Hipóteses",
    description: "Express hypothetical situations and polite requests using the conditional tense.",
    level: "B2",
    topic: "Conditional",
    order: 1,
    vocabulary: [
      { word: "se eu fosse", translation: "if I were", pronunciation: "seh eh FOH-seh", example: "Se eu fosse rico, viajaria pelo mundo." },
      { word: "gostaria", translation: "I would like", pronunciation: "gosh-tah-REE-ah", example: "Gostaria de um café, por favor." },
      { word: "poderia", translation: "could / would be able to", pronunciation: "poo-deh-REE-ah", example: "Poderia ajudar-me?" },
      { word: "deveria", translation: "should / ought to", pronunciation: "deh-veh-REE-ah", example: "Deveria estudar mais." },
      { word: "seria", translation: "would be", pronunciation: "seh-REE-ah", example: "Seria ótimo viajar." },
      { word: "teria", translation: "would have", pronunciation: "teh-REE-ah", example: "Teria mais tempo livre." },
      { word: "faria", translation: "would do/make", pronunciation: "fah-REE-ah", example: "O que farias no meu lugar?" },
      { word: "iria", translation: "would go", pronunciation: "ee-REE-ah", example: "Iria a Portugal amanhã." },
      { word: "hipótese", translation: "hypothesis / scenario", pronunciation: "ee-POH-teh-seh", example: "É uma hipótese interessante." },
      { word: "caso contrário", translation: "otherwise", pronunciation: "KAH-zoo kon-TRAH-ree-oo", example: "Estuda, caso contrário vais chumbar." },
      { word: "supondo que", translation: "supposing that", pronunciation: "soo-PON-doo keh", example: "Supondo que tivesses razão..." },
      { word: "no teu lugar", translation: "in your place", pronunciation: "noo teh-oo loo-GAR", example: "No teu lugar, não faria isso." },
      { word: "de certa forma", translation: "in a way / to some extent", pronunciation: "deh SER-tah FOR-mah", example: "De certa forma, tens razão." },
      { word: "ao invés de", translation: "instead of", pronunciation: "ow een-VESH deh", example: "Ao invés de reclamar, age." },
      { word: "embora", translation: "although / even though", pronunciation: "em-BOH-rah", example: "Embora seja difícil, é possível." },
    ],
    grammar: `## Condicional Simples (Conditional Tense)

The conditional is used for hypothetical situations, polite requests, and reported speech.

### Formation
Add these endings to the **infinitive** (same for all verb types):

| Person | Ending | Example (falar) |
|--------|--------|----------------|
| Eu | -ia | falar**ia** |
| Tu | -ias | falar**ias** |
| Ele/Ela/Você | -ia | falar**ia** |
| Nós | -íamos | falar**íamos** |
| Vós | -íeis | falar**íeis** |
| Eles/Vocês | -iam | falar**iam** |

### Irregular Conditional Stems
| Verb | Stem | Example |
|------|------|---------|
| **dizer** | dir- | dir**ia** |
| **fazer** | far- | far**ia** |
| **trazer** | trar- | trar**ia** |

### Uses of the Conditional
1. **Hypothetical situations** (with \`se\` + imperfect subjunctive):
   - *Se tivesse dinheiro, compraria uma casa.* (If I had money, I would buy a house.)
2. **Polite requests:**
   - *Poderia fechar a janela?* (Could you close the window?)
3. **Reported speech** (what someone said they would do):
   - *Ele disse que viria.* (He said he would come.)
4. **Advice:**
   - *No teu lugar, estudaria mais.* (In your place, I would study more.)`,
    readingComprehension: `**Se pudesse mudar o mundo...**

Numa aula de filosofia, a professora Dra. Santos pediu aos alunos que completassem a frase: "Se eu pudesse mudar o mundo..."

O Miguel respondeu primeiro: "Se eu pudesse mudar o mundo, eliminaria a pobreza. Criaria um sistema económico mais justo onde toda a gente teria acesso a educação e saúde de qualidade."

A Beatriz disse: "Eu gostaria de acabar com as guerras. Se os líderes mundiais se sentassem juntos e dialogassem com respeito, resolveriam os conflitos sem violência."

O professor Rui acrescentou: "Seria maravilhoso se as pessoas valorizassem mais o ambiente. Se todos plantassem uma árvore por ano, o planeta seria muito mais verde e saudável."

A Dra. Santos concluiu: "Cada um de vocês teria o poder de mudar o mundo à sua volta. Não precisariam de ser presidentes ou milionários. Bastaria ser mais gentil, mais tolerante e mais solidário no dia a dia."`,
    readingComprehensionTranslation: `**If I Could Change the World...**

In a philosophy class, Professor Dr. Santos asked students to complete the sentence: "If I could change the world..."

Miguel answered first: "If I could change the world, I would eliminate poverty. I would create a fairer economic system where everyone would have access to quality education and healthcare."

Beatriz said: "I would like to end wars. If world leaders sat together and dialogued with respect, they would resolve conflicts without violence."

Professor Rui added: "It would be wonderful if people valued the environment more. If everyone planted one tree per year, the planet would be much greener and healthier."

Dr. Santos concluded: "Each of you would have the power to change the world around you. You wouldn't need to be presidents or millionaires. It would be enough to be kinder, more tolerant, and more supportive in everyday life."`,
    dialogues: [
      { speaker: "A", text: "O que farias se ganhasses a lotaria?" },
      { speaker: "B", text: "Primeiro, pagaria todas as dívidas. Depois, viajaria pelo mundo." },
      { speaker: "A", text: "Eu compraria uma casa grande e ajudaria a minha família." },
      { speaker: "B", text: "Seria incrível! Mas no teu lugar, também investiria parte do dinheiro." },
    ],
    quizQuestions: [
      { id: "1", type: "multiple-choice", question: "What is the conditional of 'falar' for 'eu'?", options: ["falei", "falaria", "falasse", "falarei"], correctAnswer: 1 },
      { id: "2", type: "true-false", question: "The conditional is formed by adding endings to the infinitive.", correctAnswer: true },
      { id: "3", type: "multiple-choice", question: "What is the irregular conditional stem of 'fazer'?", options: ["faz-", "fiz-", "far-", "fizer-"], correctAnswer: 2 },
      { id: "4", type: "multiple-choice", question: "Which sentence uses the conditional correctly?", options: ["Eu falo amanhã", "Eu falaria se pudesse", "Eu falei ontem", "Eu falarei logo"], correctAnswer: 1 },
      { id: "5", type: "true-false", question: "The conditional can be used for polite requests.", correctAnswer: true },
      { id: "6", type: "multiple-choice", question: "What would Miguel eliminate if he could change the world?", options: ["Wars", "Poverty", "Pollution", "Inequality"], correctAnswer: 1 },
      { id: "7", type: "multiple-choice", question: "How do you say 'I would like' in Portuguese?", options: ["Quero", "Gostei", "Gostaria", "Queria"], correctAnswer: 2 },
      { id: "8", type: "true-false", question: "'Deveria' means 'I should/ought to'.", correctAnswer: true },
    ],
  },
  // ─── C1 LESSON ───────────────────────────────────────────────
  {
    id: 41,
    title: "Advanced Discourse & Argumentation",
    titlePt: "Discurso Avançado e Argumentação",
    description: "Master sophisticated discourse markers, argumentation techniques, and academic register.",
    level: "C1",
    topic: "Academic Language",
    order: 1,
    vocabulary: [
      { word: "no entanto", translation: "however / nevertheless", pronunciation: "noo en-TAN-too", example: "É caro; no entanto, vale a pena." },
      { word: "contudo", translation: "however / yet", pronunciation: "kon-TOO-doo", example: "Tentou muito; contudo, não conseguiu." },
      { word: "por conseguinte", translation: "consequently / therefore", pronunciation: "por kon-seh-GEEN-teh", example: "Por conseguinte, devemos agir." },
      { word: "ademais", translation: "furthermore / moreover", pronunciation: "ah-deh-MYSH", example: "Ademais, há outras razões." },
      { word: "outrossim", translation: "likewise / furthermore", pronunciation: "oh-troo-SEEM", example: "Outrossim, importa referir..." },
      { word: "em contrapartida", translation: "on the other hand", pronunciation: "eng kon-trah-par-TEE-dah", example: "Em contrapartida, há vantagens." },
      { word: "à luz de", translation: "in light of", pronunciation: "ah loosh deh", example: "À luz dos dados, concluímos..." },
      { word: "cumpre salientar", translation: "it is worth noting", pronunciation: "KOOM-preh sah-lee-en-TAR", example: "Cumpre salientar que..." },
      { word: "depreende-se que", translation: "it can be inferred that", pronunciation: "deh-PREN-deh-seh keh", example: "Depreende-se que houve erro." },
      { word: "em suma", translation: "in sum / in short", pronunciation: "eng SOO-mah", example: "Em suma, o projeto falhou." },
      { word: "porquanto", translation: "inasmuch as / since", pronunciation: "por-KWAN-too", example: "Porquanto a lei o exige..." },
      { word: "mormente", translation: "especially / above all", pronunciation: "mor-MEN-teh", example: "Mormente em casos urgentes." },
      { word: "a priori", translation: "a priori / beforehand", pronunciation: "ah pree-OH-ree", example: "A priori, a hipótese é válida." },
      { word: "corroborar", translation: "to corroborate / support", pronunciation: "koh-roo-boo-RAR", example: "Os dados corroboram a teoria." },
      { word: "infere-se", translation: "it is inferred / one can infer", pronunciation: "een-FEH-reh-seh", example: "Infere-se que houve negligência." },
    ],
    grammar: `## Advanced Discourse Markers in Portuguese

At C1 level, mastering **discourse connectors** is essential for sophisticated written and spoken Portuguese.

### Contrast Markers
| Marker | Register | Example |
|--------|----------|---------|
| **mas** | Informal | Quero ir, mas estou cansado. |
| **porém** | Formal | Quero ir; porém, estou cansado. |
| **no entanto** | Formal/Written | No entanto, há exceções. |
| **contudo** | Formal/Written | Contudo, a situação mudou. |
| **todavia** | Literary | Todavia, persistiu. |
| **não obstante** | Very Formal | Não obstante as dificuldades... |

### Consequence & Causality
- **por conseguinte / portanto / logo** — therefore, consequently
- **daí que** + subjunctive — hence, which is why
- **de tal forma que** — in such a way that
- **tanto... que** — so much... that

### Addition & Reinforcement
- **ademais / outrossim** — furthermore (formal/legal)
- **aliás** — moreover / in fact / by the way
- **inclusivamente** — even / including

### Concession
- **embora** + subjunctive — although
- **apesar de** + infinitive/noun — despite
- **ainda que** + subjunctive — even though
- **por mais que** + subjunctive — however much

> **Register Tip:** In academic and legal Portuguese, **outrossim**, **porquanto**, and **mormente** are common. In everyday speech, they sound overly formal — use them in writing and formal presentations.`,
    readingComprehension: `**A Língua Portuguesa no Mundo**

A língua portuguesa ocupa, no panorama linguístico mundial, uma posição de destaque que nem sempre é devidamente reconhecida. Com cerca de 260 milhões de falantes nativos distribuídos por quatro continentes, o português é, por conseguinte, a quinta língua mais falada no mundo e a terceira língua europeia mais difundida, a seguir ao inglês e ao espanhol.

Cumpre salientar, no entanto, que esta língua não é monolítica. As variedades europeia e brasileira apresentam diferenças fonológicas, lexicais e, em menor grau, gramaticais que, embora não impeçam a intercompreensão, conferem a cada variedade uma identidade própria e inconfundível. Ademais, as variedades africanas — mormente o português de Angola, Moçambique e Cabo Verde — têm vindo a afirmar-se como formas linguísticas autónomas e criativas.

À luz dos dados sociolinguísticos mais recentes, depreende-se que o português continuará a crescer demograficamente, sobretudo em África, onde se projeta que venha a ter o maior número de falantes nas próximas décadas. Em contrapartida, a sua presença no ensino superior e na produção científica internacional ainda fica aquém do seu peso demográfico, o que constitui um desafio que urge enfrentar.

Em suma, a língua portuguesa é um patrimônio cultural de valor inestimável, cujo potencial global ainda não foi plenamente realizado.`,
    readingComprehensionTranslation: `**The Portuguese Language in the World**

The Portuguese language occupies, in the global linguistic landscape, a prominent position that is not always properly recognized. With approximately 260 million native speakers distributed across four continents, Portuguese is consequently the fifth most spoken language in the world and the third most widespread European language, after English and Spanish.

It is worth noting, however, that this language is not monolithic. The European and Brazilian varieties present phonological, lexical, and, to a lesser extent, grammatical differences that, although they do not prevent mutual comprehension, give each variety its own unmistakable identity. Furthermore, the African varieties — especially Portuguese from Angola, Mozambique, and Cape Verde — have been asserting themselves as autonomous and creative linguistic forms.

In light of the most recent sociolinguistic data, it can be inferred that Portuguese will continue to grow demographically, especially in Africa, where it is projected to have the largest number of speakers in the coming decades. On the other hand, its presence in higher education and international scientific production still falls short of its demographic weight, which constitutes a challenge that urgently needs to be addressed.

In sum, the Portuguese language is a cultural heritage of inestimable value, whose global potential has not yet been fully realized.`,
    dialogues: [
      { speaker: "A", text: "Qual é a tua posição relativamente à globalização do português?" },
      { speaker: "B", text: "No meu entender, o português tem um potencial enorme; contudo, falta-lhe visibilidade no contexto científico internacional." },
      { speaker: "A", text: "Concordo, porém cumpre salientar que a situação tem vindo a melhorar gradualmente." },
      { speaker: "B", text: "Com efeito. À luz dos dados recentes, depreende-se que a tendência é positiva, mormente em África." },
    ],
    quizQuestions: [
      { id: "1", type: "multiple-choice", question: "How many native Portuguese speakers are there approximately?", options: ["100 million", "180 million", "260 million", "350 million"], correctAnswer: 2 },
      { id: "2", type: "true-false", question: "'Contudo' and 'no entanto' both express contrast.", correctAnswer: true },
      { id: "3", type: "multiple-choice", question: "Which marker means 'consequently'?", options: ["No entanto", "Por conseguinte", "Contudo", "Embora"], correctAnswer: 1 },
      { id: "4", type: "multiple-choice", question: "What register is 'outrossim' appropriate for?", options: ["Informal speech", "Text messages", "Academic/legal writing", "Children's books"], correctAnswer: 2 },
      { id: "5", type: "true-false", question: "European and Brazilian Portuguese are completely identical.", correctAnswer: false },
      { id: "6", type: "multiple-choice", question: "What does 'em suma' mean?", options: ["In addition", "In sum / in short", "On the other hand", "However"], correctAnswer: 1 },
      { id: "7", type: "multiple-choice", question: "Which continent is projected to have the most Portuguese speakers?", options: ["Europe", "South America", "Africa", "Asia"], correctAnswer: 2 },
      { id: "8", type: "true-false", question: "'Cumpre salientar' means 'it is worth noting'.", correctAnswer: true },
    ],
  },
  // ─── C2 LESSON ───────────────────────────────────────────────
  {
    id: 51,
    title: "Literary Portuguese & Stylistics",
    titlePt: "Português Literário e Estilística",
    description: "Explore the richness of literary Portuguese, poetic devices, and the language of Camões and Pessoa.",
    level: "C2",
    topic: "Literary Language",
    order: 1,
    vocabulary: [
      { word: "saudade", translation: "longing / melancholic nostalgia (untranslatable)", pronunciation: "sow-DAH-deh", example: "Tenho saudades de ti." },
      { word: "ânsia", translation: "yearning / anguish", pronunciation: "AN-see-ah", example: "Uma ânsia de infinito." },
      { word: "melancolia", translation: "melancholy", pronunciation: "meh-lan-koh-LEE-ah", example: "A melancolia do outono." },
      { word: "devaneio", translation: "daydream / reverie", pronunciation: "deh-vah-NAY-oo", example: "Perdido em devaneios." },
      { word: "efémero", translation: "ephemeral / fleeting", pronunciation: "eh-FEH-meh-roo", example: "A beleza é efémera." },
      { word: "perene", translation: "perennial / everlasting", pronunciation: "peh-REH-neh", example: "Uma verdade perene." },
      { word: "insólito", translation: "unusual / uncanny", pronunciation: "een-SOH-lee-too", example: "Um acontecimento insólito." },
      { word: "fado", translation: "fate / destiny (also the music genre)", pronunciation: "FAH-doo", example: "O fado é a alma de Portugal." },
      { word: "lusitano", translation: "Lusitanian / Portuguese (literary)", pronunciation: "loo-zee-TAH-noo", example: "O povo lusitano." },
      { word: "heterónimo", translation: "heteronym (Pessoa's alter egos)", pronunciation: "eh-teh-ROH-nee-moo", example: "Alberto Caeiro é um heterónimo de Pessoa." },
      { word: "fingimento", translation: "pretense / feigning", pronunciation: "feen-zhee-MEN-too", example: "O poeta finge que sofre." },
      { word: "estoicismo", translation: "stoicism", pronunciation: "esh-toy-SEE-zmoo", example: "O estoicismo de Ricardo Reis." },
      { word: "epopeia", translation: "epic poem / epic", pronunciation: "eh-poo-PAY-ah", example: "Os Lusíadas é uma epopeia." },
      { word: "verso livre", translation: "free verse", pronunciation: "VER-soo LEE-vreh", example: "Pessoa escreveu em verso livre." },
      { word: "metáfora", translation: "metaphor", pronunciation: "meh-TAH-foh-rah", example: "Uma metáfora poderosa." },
    ],
    grammar: `## Literary Portuguese — Style, Voice & Poetic Devices

### The Language of Fernando Pessoa
Fernando Pessoa (1888–1935) is Portugal's greatest poet. He created multiple **heterónimos** — fully developed alter egos with distinct styles:

| Heterónimo | Style | Philosophy |
|-----------|-------|-----------|
| **Alberto Caeiro** | Simple, direct, sensory | Pagan naturalism |
| **Ricardo Reis** | Classical, Latinate, odes | Stoic paganism |
| **Álvaro de Campos** | Whitmanesque, exclamatory | Sensationism |
| **Bernardo Soares** | Introspective prose | Existential melancholy |

### Saudade — The Untranslatable
**Saudade** is perhaps the most famous Portuguese concept — a bittersweet longing for something or someone absent, possibly never to return. It is the emotional core of **fado** music and much of Portuguese literature.

> *"Saudade é um prazer triste de coisas que não existem."* — Pessoa

### Key Poetic Devices in Portuguese
- **Anáfora** — repetition at the beginning of lines
- **Aliteração** — repetition of consonant sounds
- **Sinestesia** — mixing of senses (e.g., "a cor do silêncio")
- **Hipérbole** — exaggeration for effect
- **Eufemismo** — softening of harsh reality
- **Elipse** — deliberate omission for effect

### Camões and Os Lusíadas
Luís de Camões (c. 1524–1580) wrote **Os Lusíadas**, the Portuguese national epic. Its language is archaic but foundational:
- Uses the **pretérito mais-que-perfeito composto** extensively
- Rich in classical allusions and Latinisms
- Considered the Portuguese equivalent of Virgil's Aeneid`,
    readingComprehension: `**Fernando Pessoa e a Multiplicidade do Ser**

Fernando Pessoa é, sem dúvida, a figura mais enigmática e fascinante da literatura portuguesa do século XX. A sua obra, vasta e multifacetada, desafia as categorias convencionais da crítica literária e convida o leitor a uma experiência única de multiplicidade identitária.

O conceito central da sua poética é o **fingimento**: "O poeta é um fingidor / Finge tão completamente / Que chega a fingir que é dor / A dor que deveras sente." Nestes versos do poema *Autopsicografia*, Pessoa articula a sua teoria da despersonalização — a ideia de que o poeta, ao criar, se distancia da sua própria experiência emocional, transformando-a em arte.

Esta despersonalização levou Pessoa a criar os seus famosos **heterónimos** — não meros pseudónimos, mas personalidades literárias autónomas, com biografias, filosofias e estilos próprios. Alberto Caeiro, o "mestre" de Pessoa, escrevia com uma simplicidade radical: "Não tenho filosofia: tenho sentidos." Ricardo Reis, discípulo de Caeiro, cultivava um classicismo sereno e estoico. Álvaro de Campos, o mais moderno dos três, escrevia com uma energia whitmanesca e uma angústia existencial profunda.

A **saudade** perpassa toda a obra pessoana, mas de forma paradoxal: é uma saudade do que nunca foi, uma nostalgia do impossível. Como escreveu no *Livro do Desassossego*: "Não sou nada. Nunca serei nada. Não posso querer ser nada. À parte isso, tenho em mim todos os sonhos do mundo."`,
    readingComprehensionTranslation: `**Fernando Pessoa and the Multiplicity of Being**

Fernando Pessoa is, without doubt, the most enigmatic and fascinating figure in twentieth-century Portuguese literature. His work, vast and multifaceted, challenges the conventional categories of literary criticism and invites the reader into a unique experience of identity multiplicity.

The central concept of his poetics is **fingimento** (feigning): "The poet is a feigner / He feigns so completely / That he even feigns as pain / The pain he truly feels." In these verses from the poem Autopsicografia, Pessoa articulates his theory of depersonalization — the idea that the poet, in creating, distances himself from his own emotional experience, transforming it into art.

This depersonalization led Pessoa to create his famous **heteronyms** — not mere pseudonyms, but autonomous literary personalities, with their own biographies, philosophies, and styles. Alberto Caeiro, Pessoa's "master," wrote with radical simplicity: "I have no philosophy: I have senses." Ricardo Reis, Caeiro's disciple, cultivated a serene and stoic classicism. Álvaro de Campos, the most modern of the three, wrote with Whitmanesque energy and profound existential anguish.

**Saudade** permeates all of Pessoa's work, but paradoxically: it is a longing for what never was, a nostalgia for the impossible. As he wrote in the Book of Disquiet: "I am nothing. I shall never be anything. I cannot want to be anything. Apart from that, I have in me all the dreams of the world."`,
    dialogues: [
      { speaker: "A", text: "Qual é, na tua opinião, o heterónimo mais interessante de Pessoa?" },
      { speaker: "B", text: "Sem dúvida, Álvaro de Campos. A sua angústia existencial e o verso livre caótico fascinam-me profundamente." },
      { speaker: "A", text: "Compreendo. Contudo, há quem argumente que Alberto Caeiro representa a maior inovação poética." },
      { speaker: "B", text: "É uma perspetiva válida. A sua aparente simplicidade esconde uma filosofia radical da presença e da sensação." },
    ],
    quizQuestions: [
      { id: "1", type: "multiple-choice", question: "What is the concept of 'fingimento' in Pessoa's poetics?", options: ["Lying to readers", "The poet's depersonalization from emotion", "Writing under a pseudonym", "Imitating other poets"], correctAnswer: 1 },
      { id: "2", type: "true-false", question: "A heterónimo is the same as a pseudonym.", correctAnswer: false },
      { id: "3", type: "multiple-choice", question: "Which heterónimo wrote with 'radical simplicity'?", options: ["Álvaro de Campos", "Ricardo Reis", "Alberto Caeiro", "Bernardo Soares"], correctAnswer: 2 },
      { id: "4", type: "multiple-choice", question: "What is 'saudade' described as in Pessoa's work?", options: ["Joy for the present", "Longing for what never was", "Hope for the future", "Anger at loss"], correctAnswer: 1 },
      { id: "5", type: "true-false", question: "Os Lusíadas was written by Fernando Pessoa.", correctAnswer: false },
      { id: "6", type: "multiple-choice", question: "What poetic device mixes different senses?", options: ["Anáfora", "Aliteração", "Sinestesia", "Hipérbole"], correctAnswer: 2 },
      { id: "7", type: "multiple-choice", question: "When did Fernando Pessoa live?", options: ["1788-1855", "1888-1935", "1924-1980", "1850-1920"], correctAnswer: 1 },
      { id: "8", type: "true-false", question: "Fado music is connected to the concept of saudade.", correctAnswer: true },
    ],
  },
];

// ─── ADDITIONAL LESSONS (appended) ─────────────────────────
// These are appended to expand the lesson library

export const additionalLessons: LessonData[] = [
  // ─── A2 LESSON 2 ────────────────────────────────────────────
  {
    id: 8,
    title: "Shopping & Prices",
    titlePt: "Compras e Preços",
    description: "Learn vocabulary for shopping, asking prices, and making purchases in Portuguese.",
    level: "A2",
    topic: "Shopping",
    order: 2,
    vocabulary: [
      { word: "a loja", translation: "the shop/store", pronunciation: "ah LOH-zhah", example: "A loja está aberta." },
      { word: "quanto custa?", translation: "how much does it cost?", pronunciation: "KWAN-too KOOSH-tah", example: "Quanto custa este casaco?" },
      { word: "barato/a", translation: "cheap/inexpensive", pronunciation: "bah-RAH-too/tah", example: "Este vestido é muito barato." },
      { word: "caro/a", translation: "expensive", pronunciation: "KAH-roo/rah", example: "O relógio é caro demais." },
      { word: "o desconto", translation: "the discount", pronunciation: "oo desh-KON-too", example: "Há algum desconto?" },
      { word: "pagar", translation: "to pay", pronunciation: "pah-GAR", example: "Posso pagar com cartão?" },
      { word: "o troco", translation: "the change (money)", pronunciation: "oo TROH-koo", example: "Aqui está o seu troco." },
      { word: "a fatura", translation: "the receipt/invoice", pronunciation: "ah fah-TOO-rah", example: "Pode dar-me a fatura?" },
      { word: "experimentar", translation: "to try on", pronunciation: "esh-peh-ree-men-TAR", example: "Posso experimentar este casaco?" },
      { word: "o tamanho", translation: "the size", pronunciation: "oo tah-MAH-nyoo", example: "Qual é o seu tamanho?" },
      { word: "a cor", translation: "the color", pronunciation: "ah kor", example: "Tem noutras cores?" },
      { word: "a promoção", translation: "the sale/promotion", pronunciation: "ah proh-moh-SOWN", example: "Há promoções esta semana." },
      { word: "o mercado", translation: "the market", pronunciation: "oo mer-KAH-doo", example: "O mercado abre às 8h." },
      { word: "o supermercado", translation: "the supermarket", pronunciation: "oo soo-per-mer-KAH-doo", example: "Vou ao supermercado." },
      { word: "a lista de compras", translation: "the shopping list", pronunciation: "ah LEES-tah deh KOM-prahs", example: "Não me esqueço da lista." },
    ],
    grammar: `## Shopping Language in Portuguese

### Asking for Prices
Use **quanto custa** (singular) or **quanto custam** (plural):
- **Quanto custa** este livro? — How much does this book cost?
- **Quanto custam** estes sapatos? — How much do these shoes cost?

### Demonstrative Adjectives
| | Masculine | Feminine |
|---|---|---|
| This/These (near) | **este / estes** | **esta / estas** |
| That/Those (far) | **esse / esses** | **essa / essas** |
| That/Those (very far) | **aquele / aqueles** | **aquela / aquelas** |

### Numbers for Prices
- **um euro** (€1), **dois euros** (€2)
- **cinquenta cêntimos** (50 cents)
- **Custa vinte e cinco euros** — It costs €25

### Useful Shopping Phrases
- **Tem em tamanho M?** — Do you have it in size M?
- **Posso experimentar?** — Can I try it on?
- **Aceita cartão?** — Do you accept card?
- **Fica com o troco.** — Keep the change.`,
    readingComprehension: `**No Mercado de Campo de Ourique**

Ana foi ao mercado de Campo de Ourique no sábado de manhã. É um mercado muito popular em Lisboa, com muitas lojas de comida, roupa e artesanato.

Primeiro, Ana foi a uma loja de roupa. Viu um vestido azul muito bonito. Perguntou à vendedora:
— Quanto custa este vestido?
— Custa sessenta euros, mas está em promoção. Com o desconto, fica a quarenta e cinco euros.
— Posso experimentar?
— Claro! O provador é ali.

O vestido ficou perfeito. Ana decidiu comprar. Pagou com cartão e recebeu a fatura.

Depois, foi a uma loja de queijos e enchidos. Comprou queijo da Serra, chouriço e presunto. Gastou vinte euros no total.

No final, tomou um café e comeu uma pastel de nata. O café custou apenas um euro e vinte cêntimos. Que bom preço!`,
    readingComprehensionTranslation: `**At the Campo de Ourique Market**

Ana went to the Campo de Ourique market on Saturday morning. It's a very popular market in Lisbon, with many food, clothing, and craft shops.

First, Ana went to a clothing store. She saw a very beautiful blue dress. She asked the saleswoman:
— How much does this dress cost?
— It costs sixty euros, but it's on sale. With the discount, it comes to forty-five euros.
— Can I try it on?
— Of course! The fitting room is over there.

The dress fit perfectly. Ana decided to buy it. She paid by card and received the receipt.

Then, she went to a cheese and cured meats shop. She bought Serra cheese, chouriço, and presunto. She spent twenty euros in total.

At the end, she had a coffee and ate a pastel de nata. The coffee cost only one euro twenty cents. What a good price!`,
    dialogues: [
      { speaker: "A", text: "Com licença, quanto custa esta mala?" },
      { speaker: "B", text: "Custa oitenta euros. Mas se comprar duas, fica com 20% de desconto." },
      { speaker: "A", text: "Tem em cor castanha? Esta preta não combina com o meu casaco." },
      { speaker: "B", text: "Sim, temos em castanho, bege e vermelho. Quer ver?" },
      { speaker: "A", text: "Sim, por favor. Posso pagar com Multibanco?" },
      { speaker: "B", text: "Claro! Aceitamos todos os cartões." },
    ],
    quizQuestions: [
      { id: "1", type: "multiple-choice", question: "How do you ask 'How much does it cost?' in Portuguese?", options: ["Quanto tempo?", "Quanto custa?", "Qual é o preço?", "Tem desconto?"], correctAnswer: 1 },
      { id: "2", type: "true-false", question: "'Barato' means expensive in Portuguese.", correctAnswer: false },
      { id: "3", type: "multiple-choice", question: "What does 'o troco' mean?", options: ["The price", "The receipt", "The change (money)", "The discount"], correctAnswer: 2 },
      { id: "4", type: "multiple-choice", question: "Which phrase means 'Can I try it on?'", options: ["Posso pagar?", "Posso experimentar?", "Tem desconto?", "Quanto custa?"], correctAnswer: 1 },
      { id: "5", type: "true-false", question: "'Caro' means cheap in Portuguese.", correctAnswer: false },
      { id: "6", type: "multiple-choice", question: "What is 'a fatura'?", options: ["The price tag", "The shopping list", "The receipt/invoice", "The discount"], correctAnswer: 2 },
      { id: "7", type: "multiple-choice", question: "How do you say 'Do you accept card?' in Portuguese?", options: ["Tem cartão?", "Aceita cartão?", "Pago com cartão?", "Cartão, por favor?"], correctAnswer: 1 },
      { id: "8", type: "true-false", question: "In Portuguese, 'quanto custam' is used for plural items.", correctAnswer: true },
    ],
  },

  // ─── B1 LESSON 2 ────────────────────────────────────────────
  {
    id: 9,
    title: "Expressing Opinions & Debating",
    titlePt: "Expressar Opiniões e Debater",
    description: "Learn how to express, defend, and challenge opinions in Portuguese with confidence.",
    level: "B1",
    topic: "Communication",
    order: 2,
    vocabulary: [
      { word: "na minha opinião", translation: "in my opinion", pronunciation: "nah MEE-nyah oh-pee-NYOWN", example: "Na minha opinião, é uma boa ideia." },
      { word: "concordar", translation: "to agree", pronunciation: "kon-kor-DAR", example: "Concordo completamente." },
      { word: "discordar", translation: "to disagree", pronunciation: "dees-kor-DAR", example: "Discordo desta afirmação." },
      { word: "no entanto", translation: "however", pronunciation: "noo en-TAN-too", example: "É bom. No entanto, tem defeitos." },
      { word: "por outro lado", translation: "on the other hand", pronunciation: "por OH-troo LAH-doo", example: "Por outro lado, há vantagens." },
      { word: "em suma", translation: "in summary", pronunciation: "em SOO-mah", example: "Em suma, é uma questão complexa." },
      { word: "além disso", translation: "furthermore / besides", pronunciation: "ah-LEM dee-SOO", example: "Além disso, é mais barato." },
      { word: "portanto", translation: "therefore", pronunciation: "por-TAN-too", example: "Portanto, devemos agir." },
      { word: "embora", translation: "although / even though", pronunciation: "em-BOH-rah", example: "Embora seja difícil, é possível." },
      { word: "a vantagem", translation: "the advantage", pronunciation: "ah van-TAH-zhem", example: "A principal vantagem é o preço." },
      { word: "a desvantagem", translation: "the disadvantage", pronunciation: "ah desh-van-TAH-zhem", example: "A desvantagem é o tempo." },
      { word: "defender", translation: "to defend / argue for", pronunciation: "deh-fen-DER", example: "Defendo esta posição." },
      { word: "argumentar", translation: "to argue", pronunciation: "ar-goo-men-TAR", example: "Posso argumentar o contrário." },
      { word: "a perspetiva", translation: "the perspective", pronunciation: "ah pesh-peh-TEE-vah", example: "Da minha perspetiva, é errado." },
      { word: "convencer", translation: "to convince", pronunciation: "kon-ven-SER", example: "Não me consegues convencer." },
    ],
    grammar: `## Expressing Opinions in Portuguese

### Opinion Phrases
| Portuguese | English |
|---|---|
| **Na minha opinião** | In my opinion |
| **Acho que** | I think that |
| **Penso que** | I believe that |
| **Parece-me que** | It seems to me that |
| **Estou convicto/a de que** | I am convinced that |

### Agreeing and Disagreeing
**Agreeing:**
- **Concordo.** — I agree.
- **Tens razão.** — You're right.
- **Exatamente!** — Exactly!
- **Sem dúvida.** — Without a doubt.

**Disagreeing (politely):**
- **Discordo.** — I disagree.
- **Não estou de acordo.** — I don't agree.
- **Não é bem assim.** — It's not quite like that.
- **Permita-me discordar.** — Allow me to disagree.

### Conjunctions for Argumentation
- **embora + subjunctive** — although
- **apesar de** — despite
- **no entanto / contudo** — however
- **por conseguinte / portanto** — therefore
- **além disso** — furthermore

### The Subjunctive with Opinion
After expressions of doubt or emotion, use the **subjunctive**:
- Duvido que ele **venha**. — I doubt he'll come.
- É importante que **estudes**. — It's important that you study.`,
    readingComprehension: `**O Debate sobre o Teletrabalho**

Numa empresa de tecnologia em Lisboa, os funcionários debatem a questão do teletrabalho. Há opiniões muito diferentes.

A Mariana, gestora de projetos, defende o trabalho presencial: "Na minha opinião, a colaboração em equipa é muito mais eficaz quando estamos todos no mesmo espaço. Além disso, a separação entre vida profissional e pessoal é fundamental para o bem-estar."

O João, programador, discorda: "Não estou de acordo. O teletrabalho aumenta a produtividade porque eliminamos o tempo de deslocação. Além disso, podemos trabalhar em ambientes mais confortáveis e personalizados."

A diretora, Dra. Santos, tenta mediar: "Ambos têm razão em certos aspetos. No entanto, penso que a solução ideal é um modelo híbrido — dois dias em casa, três no escritório. Assim, mantemos a flexibilidade sem perder a coesão da equipa."

Em suma, o debate sobre o teletrabalho reflete tensões mais amplas sobre como equilibramos tecnologia, produtividade e bem-estar humano no século XXI.`,
    readingComprehensionTranslation: `**The Remote Work Debate**

At a technology company in Lisbon, employees debate the issue of remote work. There are very different opinions.

Mariana, a project manager, defends in-person work: "In my opinion, team collaboration is much more effective when we're all in the same space. Furthermore, the separation between professional and personal life is fundamental for well-being."

João, a programmer, disagrees: "I don't agree. Remote work increases productivity because we eliminate commute time. Besides, we can work in more comfortable and personalized environments."

The director, Dr. Santos, tries to mediate: "You're both right in certain aspects. However, I think the ideal solution is a hybrid model — two days at home, three in the office. This way, we maintain flexibility without losing team cohesion."

In summary, the remote work debate reflects broader tensions about how we balance technology, productivity, and human well-being in the 21st century.`,
    dialogues: [
      { speaker: "A", text: "Na minha opinião, as redes sociais têm mais desvantagens do que vantagens." },
      { speaker: "B", text: "Discordo. Acho que dependem de como as usamos. Podem ser ferramentas poderosas." },
      { speaker: "A", text: "Tens algum ponto. No entanto, os estudos mostram que aumentam a ansiedade nos jovens." },
      { speaker: "B", text: "É verdade, mas por outro lado, permitem que pessoas isoladas se conectem com comunidades." },
      { speaker: "A", text: "Concordo que há vantagens. Portanto, talvez a regulação seja a solução." },
    ],
    quizQuestions: [
      { id: "1", type: "multiple-choice", question: "How do you say 'I agree' in Portuguese?", options: ["Discordo", "Concordo", "Acho que não", "Talvez"], correctAnswer: 1 },
      { id: "2", type: "true-false", question: "'No entanto' means 'therefore' in Portuguese.", correctAnswer: false },
      { id: "3", type: "multiple-choice", question: "What does 'embora' mean?", options: ["Therefore", "Furthermore", "Although", "However"], correctAnswer: 2 },
      { id: "4", type: "multiple-choice", question: "Which phrase means 'in my opinion'?", options: ["Por outro lado", "Na minha opinião", "Em suma", "Além disso"], correctAnswer: 1 },
      { id: "5", type: "true-false", question: "'Portanto' means 'therefore' in Portuguese.", correctAnswer: true },
      { id: "6", type: "multiple-choice", question: "What does 'a vantagem' mean?", options: ["The disadvantage", "The argument", "The advantage", "The opinion"], correctAnswer: 2 },
      { id: "7", type: "multiple-choice", question: "Which conjunction requires the subjunctive?", options: ["portanto", "além disso", "embora", "no entanto"], correctAnswer: 2 },
      { id: "8", type: "true-false", question: "'Tens razão' means 'You're wrong'.", correctAnswer: false },
    ],
  },

  // ─── B2 LESSON 2 ────────────────────────────────────────────
  {
    id: 10,
    title: "Portuguese Cinema & Culture",
    titlePt: "Cinema e Cultura Portuguesa",
    description: "Explore Portuguese cinema, cultural movements, and the art of critical analysis.",
    level: "B2",
    topic: "Culture & Arts",
    order: 2,
    vocabulary: [
      { word: "o realizador", translation: "the director (film)", pronunciation: "oo reh-ah-lee-zah-DOR", example: "O realizador ganhou um prémio." },
      { word: "a obra-prima", translation: "the masterpiece", pronunciation: "ah OH-brah PREE-mah", example: "É uma verdadeira obra-prima." },
      { word: "o enredo", translation: "the plot", pronunciation: "oo en-REH-doo", example: "O enredo é muito complexo." },
      { word: "a personagem", translation: "the character", pronunciation: "ah per-soh-NAH-zhem", example: "A personagem principal é fascinante." },
      { word: "a cinematografia", translation: "the cinematography", pronunciation: "ah see-neh-mah-toh-grah-FEE-ah", example: "A cinematografia é deslumbrante." },
      { word: "a trilha sonora", translation: "the soundtrack", pronunciation: "ah TREE-lyah soh-NOH-rah", example: "A trilha sonora é emocionante." },
      { word: "a crítica", translation: "the review/critique", pronunciation: "ah KREE-tee-kah", example: "A crítica foi muito positiva." },
      { word: "abordar", translation: "to address/tackle", pronunciation: "ah-bor-DAR", example: "O filme aborda temas difíceis." },
      { word: "retratar", translation: "to portray/depict", pronunciation: "reh-trah-TAR", example: "Retrata a vida em Lisboa." },
      { word: "o guião", translation: "the screenplay/script", pronunciation: "oo gee-OWN", example: "O guião foi escrito em 2020." },
      { word: "a estreia", translation: "the premiere/release", pronunciation: "ah esh-TRAY-ah", example: "A estreia foi em Cannes." },
      { word: "galardoado/a", translation: "award-winning", pronunciation: "gah-lar-doo-AH-doo/dah", example: "Um filme galardoado." },
      { word: "o festival de cinema", translation: "the film festival", pronunciation: "oo fesh-tee-VAL deh see-NEH-mah", example: "O festival de cinema de Lisboa." },
      { word: "a narrativa", translation: "the narrative", pronunciation: "ah nah-rah-TEE-vah", example: "A narrativa é não-linear." },
      { word: "metafórico/a", translation: "metaphorical", pronunciation: "meh-tah-FOH-ree-koo/kah", example: "A cena final é metafórica." },
    ],
    grammar: `## Advanced Discourse Markers for Critical Analysis

### Expressing Complexity
When analyzing films or cultural works, use these advanced structures:

**Concession + Contrast:**
- **Ainda que** + subjunctive — Even though
- **Por mais que** + subjunctive — No matter how much
- **Apesar de** + infinitive — Despite

**Emphasis:**
- **É precisamente** — It is precisely
- **O que se destaca é** — What stands out is
- **Não se pode ignorar** — One cannot ignore

### Passive Voice (Voz Passiva)
Portuguese uses passive voice extensively in formal writing:
- **Ativo:** O realizador filmou a cena.
- **Passivo:** A cena **foi filmada** pelo realizador.

Structure: **ser + past participle (agreeing with subject)**

### Relative Clauses
- **que** — who/which/that
- **cujo/cuja** — whose
- **onde** — where
- **o qual / a qual** — which (formal)

Example: *O filme, **cujo** realizador é português, ganhou em Cannes.*`,
    readingComprehension: `**O Cinema Português Contemporâneo**

O cinema português tem vivido um renascimento notável nas últimas décadas, conquistando reconhecimento internacional em festivais como Cannes, Berlim e Veneza. Realizadores como Miguel Gomes, João Pedro Rodrigues e Leonor Teles têm elevado o prestígio da sétima arte nacional.

O filme *Tabu* (2012), de Miguel Gomes, é frequentemente citado como uma das obras mais importantes do cinema europeu contemporâneo. Com uma narrativa dividida em duas partes — uma presente e uma passado colonial —, o filme aborda temas de memória, perda e nostalgia com uma beleza visual extraordinária. A cinematografia a preto e branco da segunda parte, filmada no estilo do cinema mudo, é de uma poesia visual rara.

Leonor Teles, por sua vez, tornou-se a realizadora portuguesa mais jovem a ganhar um Urso de Ouro em Berlim, com o curta-metragem *Balada de um Batráquio* (2016). O seu trabalho retrata comunidades marginalizadas com uma sensibilidade e humanidade notáveis.

O que une estes cineastas é uma recusa do cinema comercial fácil em favor de uma linguagem cinematográfica pessoal, poética e muitas vezes experimental. É um cinema que exige do espectador uma participação ativa — não apenas ver, mas sentir e pensar.`,
    readingComprehensionTranslation: `**Contemporary Portuguese Cinema**

Portuguese cinema has been experiencing a remarkable renaissance in recent decades, gaining international recognition at festivals such as Cannes, Berlin, and Venice. Directors like Miguel Gomes, João Pedro Rodrigues, and Leonor Teles have elevated the prestige of the national seventh art.

The film *Tabu* (2012), by Miguel Gomes, is frequently cited as one of the most important works in contemporary European cinema. With a narrative divided into two parts — a present and a colonial past — the film addresses themes of memory, loss, and nostalgia with extraordinary visual beauty. The black-and-white cinematography of the second part, filmed in the style of silent cinema, is of rare visual poetry.

Leonor Teles, in turn, became the youngest Portuguese director to win a Golden Bear in Berlin, with the short film *Balada de um Batráquio* (2016). Her work portrays marginalized communities with remarkable sensitivity and humanity.

What unites these filmmakers is a refusal of easy commercial cinema in favor of a personal, poetic, and often experimental cinematic language. It is a cinema that demands active participation from the viewer — not just seeing, but feeling and thinking.`,
    dialogues: [
      { speaker: "A", text: "Viste o último filme do Miguel Gomes? O que achaste?" },
      { speaker: "B", text: "Achei fascinante, embora seja um pouco hermético. A cinematografia é deslumbrante." },
      { speaker: "A", text: "Concordo. O que me impressionou foi a forma como retrata a memória colonial." },
      { speaker: "B", text: "Exatamente. É um tema que o cinema português aborda com uma honestidade rara." },
      { speaker: "A", text: "Tens razão. Por mais que seja difícil de ver, é necessário confrontar esse passado." },
    ],
    quizQuestions: [
      { id: "1", type: "multiple-choice", question: "What does 'o realizador' mean in film context?", options: ["The actor", "The producer", "The director", "The screenwriter"], correctAnswer: 2 },
      { id: "2", type: "true-false", question: "The film 'Tabu' was directed by Leonor Teles.", correctAnswer: false },
      { id: "3", type: "multiple-choice", question: "What does 'a obra-prima' mean?", options: ["The first work", "The masterpiece", "The premiere", "The screenplay"], correctAnswer: 1 },
      { id: "4", type: "multiple-choice", question: "In passive voice, 'A cena foi filmada' means:", options: ["The scene will be filmed", "The scene was filmed", "The scene is filming", "The scene films"], correctAnswer: 1 },
      { id: "5", type: "true-false", question: "'O enredo' refers to the film's soundtrack.", correctAnswer: false },
      { id: "6", type: "multiple-choice", question: "What festival gave Leonor Teles a Golden Bear?", options: ["Cannes", "Venice", "Berlin", "Sundance"], correctAnswer: 2 },
      { id: "7", type: "multiple-choice", question: "Which relative pronoun means 'whose' in Portuguese?", options: ["que", "onde", "cujo/cuja", "o qual"], correctAnswer: 2 },
      { id: "8", type: "true-false", question: "'Ainda que' requires the subjunctive mood.", correctAnswer: true },
    ],
  },
];

// Merge additional lessons into the main export
export const allLessons: LessonData[] = [...lessonsData, ...additionalLessons];
