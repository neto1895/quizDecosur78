    
const quizData = [
    {
        pregunta: "¿Qué ambiente te atrae más?",
        opciones: [
            { texto: "🧼 Espacios limpios y funcionales", estilo: "minimalista" },
            { texto: "🌿 Natural y acogedor", estilo: "natural" },
            { texto: "🏙️ Urbano y moderno", estilo: "urbano-industrial" },
            { texto: "🎨 Creativo y con personalidad", estilo: "contemporaneo" }
        ]
    },
    {
        pregunta: "¿Qué paleta de colores prefieres?",
        opciones: [
            { texto: "⚪ Neutros claros", estilo: "minimalista" },
            { texto: "🟤 Tierra y verdes suaves", estilo: "natural" },
            { texto: "⚫ Oscuros con metálicos", estilo: "urbano-industrial" },
            { texto: "🔷 Contrastes y acentos vivos", estilo: "contemporaneo" }
        ]
    },
    {
        pregunta: "¿Qué materiales te gustan más?",
        opciones: [
            { texto: "🪵 Madera clara y acabados lisos", estilo: "minimalista" },
            { texto: "🌾 Fibras naturales y lino", estilo: "natural" },
            { texto: "🧱 Metal, concreto y ladrillo", estilo: "urbano-industrial" },
            { texto: "✨ Mezclas modernas y audaces", estilo: "contemporaneo" }
        ]
    },
    {
        pregunta: "¿Cómo imaginas tus ventanas?",
        opciones: [
            { texto: "🪟 Persianas simples", estilo: "minimalista" },
            { texto: "🌬️ Cortinas ligeras", estilo: "natural" },
            { texto: "🖤 Cortinas oscuras o metálicas", estilo: "urbano-industrial" },
            { texto: "🤖 Persianas modernas automatizadas", estilo: "contemporaneo" }
        ]
    },
    {
        pregunta: "¿Qué deco no puede faltar?",
        opciones: [
            { texto: "💡 Iluminación discreta", estilo: "minimalista" },
            { texto: "🪴 Plantas o muros verdes", estilo: "natural" },
            { texto: "🔩 Estructuras metálicas", estilo: "urbano-industrial" },
            { texto: "🟦 Arte moderno o piezas únicas", estilo: "contemporaneo" }
        ]
    }
];

        const resultadosPaginas = {
            minimalista: "https://www.decosur78.com/estilo-minimalista",
            natural: "https://www.decosur78.com/estilo-natural",
            "urbano-industrial": "https://www.decosur78.com/estilo-urbano-industrial",
            "tropical-boho": "https://www.decosur78.com/estilo-tropical-boho",
            clasico: "https://www.decosur78.com/estilo-clasico",
            contemporaneo: "https://www.decosur78.com/estilo-contemporaneo"
        };

        // Variables del estado del quiz
        let currentQuestion = 0;
        const answers = [];
        const questionsContainer = document.getElementById('questions-container');
        const submitBtn = document.getElementById('submit-btn');
        const currentQuestionElement = document.getElementById('current-question');
        const totalQuestionsElement = document.getElementById('total-questions');

        // Mostrar el número total de preguntas
        totalQuestionsElement.textContent = quizData.length;

        // Función para mostrar la pregunta actual
        function showQuestion() {
            currentQuestionElement.textContent = currentQuestion + 1;
            
            const question = quizData[currentQuestion];
            let optionsHTML = '';
            
            question.opciones.forEach((option, index) => {
                optionsHTML += `
                    <div class="option" data-index="${index}">
                        ${option.texto}
                    </div>
                `;
            });
            
            const questionHTML = `
                <div class="question">
                    <h3>${question.pregunta}</h3>
                    <div class="options">
                        ${optionsHTML}
                    </div>
                </div>
            `;
            
            questionsContainer.innerHTML = questionHTML;
            
            // Agregar event listeners a las opciones
            document.querySelectorAll('.option').forEach(option => {
                option.addEventListener('click', selectOption);
            });
        }

        // Función para seleccionar una opción
        function selectOption(e) {
            const selectedIndex = parseInt(e.target.getAttribute('data-index'));
            
            // Remover selección previa
            document.querySelectorAll('.option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Marcar como seleccionada
            e.target.classList.add('selected');
            
            // Guardar respuesta
            answers[currentQuestion] = {
                questionIndex: currentQuestion,
                optionIndex: selectedIndex,
                style: quizData[currentQuestion].opciones[selectedIndex].estilo
            };
            
            // Habilitar botón de siguiente
            submitBtn.disabled = false;
            
            // Cambiar texto del botón si es la última pregunta
            if (currentQuestion === quizData.length - 1) {
                submitBtn.textContent = 'Ver mi resultado';
            } else {
                submitBtn.textContent = 'Siguiente pregunta';
            }
        }

        // Función para determinar el resultado y redirigir
        function determinarResultadoYRedirigir() {
            // Calcular el estilo predominante
            const styleCounts = {};
            
            answers.forEach(answer => {
                const style = answer.style;
                styleCounts[style] = (styleCounts[style] || 0) + 1;
            });
            
            // Encontrar el estilo con más votos
            let maxCount = 0;
            let resultStyle = 'minimalista';
            
            for (const style in styleCounts) {
                if (styleCounts[style] > maxCount) {
                    maxCount = styleCounts[style];
                    resultStyle = style;
                }
            }
            
            // Redirigir a la página correspondiente
            window.location.href = resultadosPaginas[resultStyle];
        }

        // Event listener para el botón de enviar
        submitBtn.addEventListener('click', () => {
            if (currentQuestion < quizData.length - 1) {
                currentQuestion++;
                showQuestion();
                submitBtn.disabled = true;
            } else {
                determinarResultadoYRedirigir();
            }
        });

        // Iniciar el quiz
        showQuestion();
