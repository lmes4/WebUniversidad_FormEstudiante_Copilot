# 🎓 Sistema de Registro de Estudiantes - Universidad

Aplicación web estática para la gestión y validación de datos de estudiantes, desarrollada a partir de una Historia de Usuario y sus Criterios de Aceptación.

Incluye **validaciones funcionales, cálculo automático de edad, gestión dinámica de registros, diseño responsive y pruebas automatizadas**.

## 🚀 Tecnologías

* **HTML5**
* **CSS3**
* **JavaScript (Vanilla)**
* **Node.js**
* **Jest**
* **Git & GitHub**
* **GitHub Copilot**

## ✨ Funcionalidades

* Formulario de registro de estudiantes.
* Validación de campos y formatos.
* Cálculo automático de edad.
* Prevención de registros duplicados por identificación o email.
* Mensajes de error y confirmación.
* Tabla dinámica de estudiantes registrados.
* Diseño responsive y accesible.
* Animaciones y estados visuales de interacción.
* Botón de limpieza sin eliminar registros existentes.

## 🧪 Testing

Funciones principales separadas en módulos reutilizables para facilitar su testabilidad.

**Pruebas unitarias sobre:**

* Cálculo de edad.
* Validación de identificación.
* Validación de nombre y apellido.
* Validación de email.
* Detección de duplicados.
* Escapado de contenido HTML.
* Formateo de fechas.

### Resultado

```text
7 tests ejecutados
7 passed
0 failed
```

## 📁 Estructura

```text
├── index.html       # Estructura de la aplicación
├── styles.css       # Estilos y responsive
├── script.js        # Lógica y gestión del DOM
├── utils.js         # Funciones reutilizables y testeables
├── utils.test.js    # Pruebas unitarias
├── run-tests.js     # Test runner
├── package.json     # Configuración y dependencias
└── README.md
```

## ▶️ Ejecución

### Aplicación

```bash
python -m http.server 8000
```

Abrir:

```text
http://127.0.0.1:8000/index.html
```

### Tests

```bash
node run-tests.js
```

## 🤖 Desarrollo asistido por IA

**GitHub Copilot** utilizado para generación, refactorización y testing del código a partir de requisitos funcionales y criterios de aceptación.

**Flujo:**
`Requirements → Implementation → Validation → Unit Testing → Test Execution`


