    
        const quizData = [
            {
                pregunta: "¿Qué ambiente prefieres en tu espacio ideal?",
                opciones: [
                    { texto: "🏙️ Ordenado, funcional y con mucho espacio despejado", estilo: "minimalista" },
                    { texto: "🌱 Conectado con la naturaleza y materiales orgánicos", estilo: "natural" },
                    { texto: "🏗️ Moderno con elementos industriales y urbanos", estilo: "urbano-industrial" },
                    { texto: "🌿 Relajado, colorido y con sensación de vacaciones", estilo: "tropical-boho" },
                    { texto: "🏛️ Elegante, atemporal y con detalles tradicionales", estilo: "clasico" },
                    { texto: "🎨 Innovador, con combinaciones audaces y artísticas", estilo: "contemporaneo" }
                ]
            },
            {
                pregunta: "¿Qué combinación de colores te atrae más?",
                opciones: [
                    { texto: "⚪ Blanco, gris y tonos neutros ultra claros", estilo: "minimalista" },
                    { texto: "🟫 Beige, verde suave y tonos tierra", estilo: "natural" },
                    { texto: "⚫ Gris oscuro, negro y tonos metalizados", estilo: "urbano-industrial" },
                    { texto: "🌈 Colores vivos (turquesa, coral, amarillo)", estilo: "tropical-boho" },
                    { texto: "🟤 Marfil, dorado y azul profundo", estilo: "clasico" },
                    { texto: "🔷 Contrastes fuertes (negro/blanco) con toques de color brillante", estilo: "contemporaneo" }
                ]
            },
            {
                pregunta: "¿Qué tipo de materiales te gustaría predominaran?",
                opciones: [
                    { texto: "🪵 Madera clara y superficies lisas sin texturas", estilo: "minimalista" },
                    { texto: "🌿 Plantas naturales, lino y fibras orgánicas", estilo: "natural" },
                    { texto: "🧱 Metal, concreto visto y ladrillo expuesto", estilo: "urbano-industrial" },
                    { texto: "🧶 Tejidos artesanales, ratán y bambú", estilo: "tropical-boho" },
                    { texto: "🪞 Mármol, maderas nobles y cristal", estilo: "clasico" },
                    { texto: "✨ Mezcla innovadora (metales pulidos con textiles geométricos)", estilo: "contemporaneo" }
                ]
            },
            {
                pregunta: "¿Cómo imaginas las ventanas de tu espacio ideal?",
                opciones: [
                    { texto: "🪟 Persianas enrollables ultra discretas", estilo: "minimalista" },
                    { texto: "🌸 Cortinas sheer elegance o de lino translúcido", estilo: "natural" },
                    { texto: "🖤 Cortinas en tonos oscuros o metálicos", estilo: "urbano-industrial" },
                    { texto: "� Persianas de bambú o estampados tropicales", estilo: "tropical-boho" },
                    { texto: "🏺 Cortinas clásicas con detalles ornamentales", estilo: "clasico" },
                    { texto: "🤖 Persianas motorizadas con diseño geométrico", estilo: "contemporaneo" }
                ]
            },
            {
                pregunta: "¿Qué elemento decorativo sería tu prioridad?",
                opciones: [
                    { texto: "💡 Iluminación discreta y empotrada", estilo: "minimalista" },
                    { texto: "🪴 Un muro verde o jardín interior", estilo: "natural" },
                    { texto: "🔩 Lámparas industriales o estructuras metálicas", estilo: "urbano-industrial" },
                    { texto: "🌴 Pasto sintético o hamacas colgantes", estilo: "tropical-boho" },
                    { texto: "🖼️ Cuadros antiguos o molduras decorativas", estilo: "clasico" },
                    { texto: "🟦 Arte moderno o piezas de diseño innovador", estilo: "contemporaneo" }
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