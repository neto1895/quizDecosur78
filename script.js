    
        // JavaScript
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

        const resultados = {
            minimalista: {
                titulo: "🖤 Estilo Minimalista",
                descripcion: "Menos es más. Líneas limpias, colores neutros y acabados sutiles como el piso laminado en tonos claros, mosquiteros discretos y persianas enrollables crean ambientes elegantes y funcionales."
            },
            natural: {
                titulo: "🌿 Estilo Natural",
                descripcion: "Ideal para quienes aman lo orgánico y la frescura. Combina muros verdes, pasto sintético y tonos tierra con persianas sheer elegance o cortinas en lino. Perfecto para crear un oasis en casa o una oficina viva y acogedora."
            },
            "urbano-industrial": {
                titulo: "🌇 Estilo Urbano-Industrial",
                descripcion: "Para quienes buscan modernidad con carácter. Mezcla papel tapiz con textura de concreto o ladrillo, pérgolas metálicas, y cortinas en tonos oscuros. Añade un toque audaz con plantas artificiales para equilibrar."
            },
            "tropical-boho": {
                titulo: "🏖️ Estilo Tropical/Boho",
                descripcion: "Perfecto para espíritus libres y ambientes relajados. Atrévete con muros verdes, persianas color bambú enrollables, pasto sintético, y colores vivos en cortinas y papel tapiz. Un rincón de vacaciones permanente."
            },
            clasico: {
                titulo: "🏡 Estilo Clásico",
                descripcion: "La creatividad es prioritaria en todo lo que hacemos. Ofrecemos soluciones innovadoras que hacen que su proyecto se destaque sin dejar de ser original y funcional."
            },
            contemporaneo: {
                titulo: "🎨 Estilo Contemporáneo Creativo",
                descripcion: "Diseñado para los que aman la originalidad con armonía. Juega con papel tapiz geométrico, pérgolas con iluminación integrada, y combinaciones de texturas como piso laminado con alfombras coloridas. Usa cortinas de doble capa o persianas motorizadas para un toque moderno y funcional."
            }
        };

        // Variables del estado del quiz
        let currentQuestion = 0;
        const answers = [];
        const questionsContainer = document.getElementById('questions-container');
        const resultContainer = document.getElementById('result-container');
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

        // Función para mostrar el resultado
        function showResult() {
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
            
            // Mostrar el resultado
            const result = resultados[resultStyle];
            
            resultContainer.innerHTML = `
                <div class="emoji">${result.titulo.split(' ')[0]}</div>
                <h2>${result.titulo}</h2>
                <p>${result.descripcion}</p>
            `;
            
            resultContainer.style.display = 'block';
            questionsContainer.style.display = 'none';
            submitBtn.style.display = 'none';
            document.querySelector('.progress').style.display = 'none';
        }

        // Event listener para el botón de enviar
        submitBtn.addEventListener('click', () => {
            if (currentQuestion < quizData.length - 1) {
                currentQuestion++;
                showQuestion();
                submitBtn.disabled = true;
            } else {
                showResult();
            }
        });

        // Iniciar el quiz
        showQuestion();
   