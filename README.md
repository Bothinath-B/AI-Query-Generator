# 🚀 AI SQL Query Generator

An intelligent full-stack web application that transforms natural language descriptions into SQL queries using AI, executes them on a MySQL database, and provides detailed explanations.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Python](https://img.shields.io/badge/python-3.8+-green)
![React](https://img.shields.io/badge/react-19.2.0-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-latest-teal)

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Code Flow](#-code-flow)
- [API Endpoints](#-api-endpoints)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **Natural Language to SQL**: Convert plain English descriptions into valid MySQL queries using Groq AI
- **Query Execution**: Run generated SQL queries directly on your MySQL database
- **Intelligent Explanations**: Get detailed, step-by-step explanations of complex SQL queries
- **Query Validation**: Built-in safety checks to prevent dangerous operations (DROP, DELETE, etc.)
- **Modern UI**: Beautiful, responsive interface with glassmorphism design and smooth animations
- **Real-time Results**: View query results in formatted, interactive tables
- **Copy to Clipboard**: Easily copy generated SQL queries
- **Error Handling**: Comprehensive error messages for debugging

## 🏗️ Architecture

The application follows a **client-server architecture** with clear separation of concerns:

```
┌─────────────────┐         HTTP          ┌─────────────────┐
│                 │  ────────────────►     │                 │
│  React Frontend │                        │  FastAPI Backend│
│   (Vite + UI)   │  ◄────────────────     │   (Python API)  │
│                 │      JSON Response     │                 │
└─────────────────┘                        └────────┬────────┘
                                                    │
                                                    │ SQL
                                                    ▼
                                           ┌─────────────────┐
                                           │                 │
                                           │  MySQL Database │
                                           │   (aiQuery DB)  │
                                           │                 │
                                           └─────────────────┘
                                                    ▲
                                                    │
                                                    │ AI API
                                           ┌────────┴────────┐
                                           │                 │
                                           │  Groq AI (GPT)  │
                                           │  Query Gen &    │
                                           │  Explanation    │
                                           └─────────────────┘
```

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **Python 3.8+**: Core programming language
- **MySQL Connector**: Database connectivity
- **Groq SDK**: AI model integration (GPT-OSS-120B)
- **Python-dotenv**: Environment variable management
- **Uvicorn**: ASGI server

### Frontend
- **React 19.2.0**: UI library
- **Vite**: Build tool and dev server
- **Axios**: HTTP client for API calls
- **Modern CSS**: Glassmorphism, animations, and responsive design

### Database
- **MySQL**: Relational database management system

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** ([Download](https://www.python.org/downloads/))
- **Node.js 18+** and npm ([Download](https://nodejs.org/))
- **MySQL Server** ([Download](https://dev.mysql.com/downloads/mysql/))
- **Groq API Key** ([Get one here](https://console.groq.com/))

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Bothinath-B/AI-Query-Generator.git
cd AI-Query-Generator
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backEnd

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database and tables
source dbCommands.sql
```

Or manually execute:

```sql
CREATE DATABASE aiQuery;
USE aiQuery;

CREATE TABLE Customer (
    customerId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(255),
    balance DECIMAL(10,2)
);

INSERT INTO Customer (name, email, phone, address, balance)
VALUES
('Alice', 'alice@example.com', '1234567890', '123 Main St', 2000.50),
('Bob', 'bob@example.com', '0987654321', '456 Elm St', 1500.00);
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontEnd

# Install dependencies
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backEnd` directory:

```env
# Groq AI Configuration
GROQ_API_KEY=your_groq_api_key_here

# Database Configuration
DB_HOST=localhost
DB_NAME=aiQuery
DB_USER=root
DB_PASSWORD=your_mysql_password
```

### Frontend API Configuration

The frontend API endpoint is configured in `frontEnd/src/services/api.js`:

```javascript
const API = "http://127.0.0.1:8000";
```

## 🎮 Usage

### Start the Backend Server

```bash
cd backEnd
uvicorn main:app --reload
```

The API will be available at: `http://127.0.0.1:8000`

### Start the Frontend Development Server

```bash
cd frontEnd
npm run dev
```

The application will be available at: `http://localhost:5173`

### Using the Application

1. **Enter a Natural Language Query**
   - Example: "Show me all customers with balance greater than 1000"

2. **Generate SQL**
   - Click "🚀 Generate SQL" button
   - The AI will convert your description to a SQL query

3. **Review the Generated Query**
   - Copy the query if needed
   - Click "💡 Explain Query" to understand what it does

4. **Execute the Query**
   - Click "▶️ Run Query" to execute on the database
   - View results in the formatted table below

## 📁 Project Structure

```
AI-Query-Generator/
│
├── backEnd/                      # Backend application
│   ├── .env                      # Environment variables (not in repo)
│   ├── .gitignore               # Git ignore file
│   ├── config.py                # Configuration loader
│   ├── db.py                    # Database connection handler
│   ├── dbCommands.sql           # Database setup scripts
│   ├── groq_client.py           # Groq AI client integration
│   ├── main.py                  # FastAPI application & endpoints
│   ├── requirements.txt         # Python dependencies
│   └── utils/                   # Utility modules
│       ├── query_validator.py   # SQL safety validator
│       └── csv_exporter.py      # CSV export utility
│
├── frontEnd/                     # Frontend application
│   ├── public/                  # Static assets
│   ├── src/                     # Source code
│   │   ├── assets/             # Images, icons
│   │   ├── components/         # React components
│   │   │   ├── QueryInput.jsx  # Query input & controls
│   │   │   └── ResultTable.jsx # Results display table
│   │   ├── services/           # API services
│   │   │   └── api.js          # Axios API client
│   │   ├── App.jsx             # Main app component
│   │   ├── index.css           # Global styles
│   │   └── main.jsx            # React entry point
│   ├── index.html              # HTML template
│   ├── package.json            # Node dependencies
│   ├── vite.config.js          # Vite configuration
│   └── eslint.config.js        # ESLint configuration
│
├── .gitignore                   # Git ignore file
└── README.md                    # This file
```

## 🔄 Code Flow

### Complete Request Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. USER INPUT                                                    │
│    User enters: "Show me all customers"                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. FRONTEND (QueryInput.jsx)                                     │
│    - handleGenerate() called                                     │
│    - Calls: generateSQL(prompt) from api.js                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ POST /generate-sql
                             │ { "prompt": "Show me all customers" }
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. BACKEND (main.py)                                             │
│    - generate_sql_endpoint() receives request                   │
│    - Calls get_schema() to fetch DB structure                   │
│    - Calls generate_sql(prompt, schema)                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. DATABASE (db.py)                                              │
│    - get_connection() establishes MySQL connection              │
│    - SHOW TABLES → DESCRIBE each table                          │
│    - Returns schema: "Table: Customer -> columns..."            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. GROQ AI (groq_client.py)                                      │
│    - generate_sql() function                                     │
│    - Sends prompt + schema to Groq AI (GPT-OSS-120B)           │
│    - AI returns: "SELECT * FROM Customer"                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. VALIDATION (query_validator.py)                              │
│    - safe_sql() checks for dangerous keywords                   │
│    - Blocked: DROP, DELETE, ALTER, TRUNCATE                     │
│    - Throws exception if dangerous                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ { "query": "SELECT * FROM Customer" }
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. FRONTEND DISPLAY                                              │
│    - Query displayed in QueryInput component                    │
│    - User can: Copy, Explain, or Run                           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                     ┌───────┴───────┐
                     │               │
         RUN         │               │         EXPLAIN
                     ▼               ▼
    ┌──────────────────────┐   ┌──────────────────────┐
    │ 8A. EXECUTE QUERY    │   │ 8B. EXPLAIN QUERY    │
    │ POST /run-sql        │   │ POST /explain        │
    │                      │   │                      │
    │ - Run on MySQL DB    │   │ - Send to Groq AI    │
    │ - Parse results      │   │ - Get explanation    │
    │ - Return rows/status │   │ - Return as array    │
    └──────────┬───────────┘   └──────────┬───────────┘
               │                          │
               ▼                          ▼
    ┌──────────────────────┐   ┌──────────────────────┐
    │ ResultTable.jsx      │   │ Explanation Display  │
    │ - Display in table   │   │ - Bulleted list      │
    │ - Show row count     │   │ - Step-by-step       │
    └──────────────────────┘   └──────────────────────┘
```

### Detailed Component Flows

#### A. Query Generation Flow

```python
# 1. Frontend calls API
generateSQL(prompt) → POST /generate-sql

# 2. Backend endpoint
@app.post("/generate-sql")
def generate_sql_endpoint(payload):
    prompt = payload["prompt"]
    schema = get_schema()         # Fetch DB structure
    query = generate_sql(prompt, schema)  # AI generation
    safe_sql(query)               # Validate safety
    return {"query": query}

# 3. Get Database Schema
def get_schema():
    - SHOW TABLES
    - For each table: DESCRIBE table_name
    - Build schema string: "Table: X -> [(col1, type), ...]"

# 4. AI Generation
def generate_sql(prompt, schema):
    - System prompt: "You are a MySQL query generator..."
    - Include schema in context
    - Model: openai/gpt-oss-120b
    - Return clean SQL query

# 5. Safety Validation
def safe_sql(query):
    - Check for: DROP, DELETE, ALTER, TRUNCATE
    - Raise exception if found
```

#### B. Query Execution Flow

```python
# 1. Frontend calls API
runSQL(query) → POST /run-sql

# 2. Backend endpoint
@app.post("/run-sql")
def run_sql(payload):
    query = payload["query"]
    statements = query.split(";")  # Handle multiple statements
    
    for stmt in statements:
        if stmt.startswith("SELECT"):
            # Fetch and return rows as JSON
            rows = cursor.fetchall()
            columns = cursor.description
            results.append({"rows": rows_as_dicts})
        else:
            # Non-SELECT queries
            results.append({"status": "executed"})
    
    return {"result": results}
```

#### C. Query Explanation Flow

```python
# 1. Frontend calls API
explainSQL(query) → POST /explain

# 2. Backend endpoint
@app.post("/explain")
def explain(payload):
    query = payload["query"]
    explanation = explain_sql(query)  # AI explanation
    explanation_list = json.loads(explanation)
    return {"explanation": explanation_list}

# 3. AI Explanation
def explain_sql(query):
    - System prompt: "Explain SQL in simple English"
    - Rules: No markdown, plain text, JSON array format
    - Return: ["Step 1: ...", "Step 2: ...", ...]
```

## 🔌 API Endpoints

### 1. Generate SQL Query

**Endpoint:** `POST /generate-sql`

**Request Body:**
```json
{
  "prompt": "Show me all customers with balance greater than 1000"
}
```

**Response:**
```json
{
  "query": "SELECT * FROM Customer WHERE balance > 1000"
}
```

**Process:**
1. Receives natural language prompt
2. Fetches database schema
3. Sends to Groq AI with schema context
4. Validates generated query for safety
5. Returns SQL query

---

### 2. Execute SQL Query

**Endpoint:** `POST /run-sql`

**Request Body:**
```json
{
  "query": "SELECT * FROM Customer WHERE balance > 1000"
}
```

**Response (Success):**
```json
{
  "result": [
    {
      "statement": "SELECT * FROM Customer WHERE balance > 1000",
      "rows": [
        {
          "customerId": 1,
          "name": "Alice",
          "email": "alice@example.com",
          "phone": "1234567890",
          "address": "123 Main St",
          "balance": 2000.50
        }
      ]
    }
  ]
}
```

**Response (Error):**
```json
{
  "result": [
    {
      "statement": "SELECT * FROM InvalidTable",
      "error": "Table 'aiQuery.InvalidTable' doesn't exist"
    }
  ]
}
```

**Process:**
1. Receives SQL query
2. Splits into multiple statements (if any)
3. Executes each statement on MySQL
4. For SELECT: returns rows as JSON objects
5. For INSERT/UPDATE: returns execution status
6. For errors: returns error message

---

### 3. Explain SQL Query

**Endpoint:** `POST /explain`

**Request Body:**
```json
{
  "query": "SELECT * FROM Customer WHERE balance > 1000"
}
```

**Response:**
```json
{
  "explanation": [
    "This query retrieves all columns from the Customer table",
    "It filters rows where the balance column is greater than 1000",
    "The results will include customer ID, name, email, phone, address and balance"
  ]
}
```

**Process:**
1. Receives SQL query
2. Sends to Groq AI with explanation prompt
3. AI returns step-by-step explanation
4. Parses JSON array format
5. Returns explanation as array

## 🔒 Security

### Safety Measures Implemented

1. **Query Validation** (`query_validator.py`)
   - Blocks dangerous SQL operations: `DROP`, `DELETE`, `ALTER`, `TRUNCATE`
   - Prevents accidental or malicious database modifications

2. **Environment Variables**
   - Sensitive credentials stored in `.env` files
   - Never committed to version control

3. **CORS Configuration**
   - Configured in `main.py` to allow cross-origin requests
   - Currently set to allow all origins (`*`) - **should be restricted in production**

4. **Error Handling**
   - Comprehensive try-catch blocks
   - User-friendly error messages
   - No exposure of sensitive system information

### Production Security Recommendations

⚠️ **Before deploying to production:**

1. **Restrict CORS:**
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["https://yourdomain.com"],  # Specific domain
       allow_credentials=True,
       allow_methods=["GET", "POST"],
       allow_headers=["*"],
   )
   ```

2. **Add Authentication:**
   - Implement JWT tokens or OAuth
   - Protect API endpoints with authentication middleware

3. **Use HTTPS:**
   - SSL/TLS certificates for encrypted communication
   - Never send API keys over HTTP

4. **Rate Limiting:**
   - Prevent abuse and DoS attacks
   - Use libraries like `slowapi`

5. **Input Sanitization:**
   - Additional SQL injection prevention
   - Parameterized queries (already using MySQL connector safely)

6. **Database User Permissions:**
   - Create a separate MySQL user with limited permissions
   - Only grant SELECT permission (read-only)

7. **API Key Security:**
   - Rotate Groq API keys regularly
   - Monitor usage for suspicious activity

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow PEP 8 for Python code
- Use ESLint for JavaScript code
- Write clear commit messages
- Add comments for complex logic
- Test thoroughly before submitting

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Groq** for providing the AI API
- **FastAPI** for the excellent web framework
- **React** for the powerful UI library
- **Vite** for the blazing-fast build tool

## 📧 Contact

**Bothinath B**

- GitHub: [@Bothinath-B](https://github.com/Bothinath-B)
- Repository: [AI-Query-Generator](https://github.com/Bothinath-B/AI-Query-Generator)

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Backend won't start - "Module not found"**
```bash
# Solution: Activate virtual environment and reinstall
cd backEnd
.venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

**Issue: Database connection error**
```bash
# Solution: Check MySQL service and credentials
# Verify .env file has correct DB_HOST, DB_USER, DB_PASSWORD
mysql -u root -p  # Test connection
```

**Issue: Frontend can't connect to backend**
```bash
# Solution: Ensure backend is running on port 8000
# Check frontEnd/src/services/api.js has correct URL
curl http://127.0.0.1:8000  # Test backend
```

**Issue: Groq API errors**
```bash
# Solution: Verify API key is correct
# Check Groq console for rate limits or quota
# Ensure .env file has valid GROQ_API_KEY
```

**Issue: "Dangerous SQL detected" error**
```bash
# Solution: This is by design - modify query_validator.py to allow
# specific operations if needed (be careful!)
```

---

Made by Bothi!
