# AI SQL Assistant

An intelligent SQL query assistant that converts natural language queries into MySQL queries using AI, executes them, and provides explanations. Built with a Node.js backend and React frontend.

## Features

- **Natural Language to SQL**: Convert plain English queries to valid MySQL statements using AI
- **Query Execution**: Automatically execute generated queries on a MySQL database
- **Query Explanation**: Get simple explanations of SQL queries
- **Safety Checks**: Built-in safeguards to prevent dangerous operations (DROP, DELETE, etc.)
- **Modern UI**: Clean React interface for easy interaction
- **Real-time Results**: Instant query results display
## 📸 Project Preview

![AI MySQL Assistant Preview](https://res.cloudinary.com/domfamgtf/image/upload/v1777338314/Screenshot_2026-04-28_063357_sp4k4k.png)


![AI MySQL Assistant Preview](https://res.cloudinary.com/domfamgtf/image/upload/v1777338324/Screenshot_2026-04-28_063417_lkdtwb.png)


---
## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **OpenRouter AI** - AI service for query generation and explanations
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### Frontend
- **React** - UI library
- **Axios** - HTTP client for API calls
- **React Testing Library** - Testing utilities

## Project Structure

```
ai-sql-assistant/
├── server.js                 # Main server file
├── package.json             # Backend dependencies
├── .env                     # Environment variables
├── data/
│   ├── dataset.json         # Sample query templates
│   └── schema.json          # Database schema definition
├── routes/
│   └── queryRoutes.js       # API routes
├── services/
│   ├── aiService.js         # AI query generation & explanation
│   ├── db.js                # Database connection
│   └── queryService.js      # Query execution with safety
├── utils/
│   └── safety.js            # SQL safety validation
└── frontend/                # React frontend
    ├── package.json
    ├── public/
    ├── src/
    │   ├── App.js           # Main React component
    │   ├── App.css          # Styles
    │   └── ...
    └── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- MySQL Server
- OpenRouter API key (for AI features)

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-sql-assistant
```

### 2. Backend Setup

#### Install Dependencies
```bash
npm install
```

#### Database Setup
1. Create a MySQL database named `ai_sql_assistant`
2. The application expects the following tables based on `data/schema.json`:
   - `employees`
   - `departments`
   - `jobs`
   - `locations`
   - `attendance`
   - `performance`
   - `leaves`

   You can create these tables manually or import a schema file. The schema includes:
   - Employee management data
   - Department and job information
   - Location data
   - Attendance and performance tracking

#### Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ai_sql_assistant

# AI Configuration
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 3. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

## Usage

### Running the Application

#### Start Backend
```bash
# From project root
npm start
# or
node server.js
```

#### Start Frontend
```bash
# From frontend directory
cd frontend
npm start
```

The backend will run on `http://localhost:5000` and frontend on `http://localhost:3000`.

### API Endpoints

#### Generate and Execute Query
```http
POST /api/query
Content-Type: application/json

{
  "userInput": "get all employees"
}
```

**Response:**
```json
{
  "sql": "SELECT * FROM employees;",
  "results": [...]
}
```

#### Explain SQL Query
```http
POST /api/explain
Content-Type: application/json

{
  "sql": "SELECT * FROM employees WHERE salary > 50000;"
}
```

**Response:**
```json
{
  "explanation": "This query selects all employees who earn more than $50,000 per year."
}
```

### Using the Frontend

1. Open `http://localhost:3000` in your browser
2. Enter a natural language query (e.g., "show me all employees in HR department")
3. Click "Generate Query" to see the SQL and results
4. Click "Explain Query" to get a simple explanation

## Configuration

### AI Model
The application uses OpenRouter with the `meta-llama/llama-3-8b-instruct` model. You can modify the model in `services/aiService.js`:

```javascript
const response = await client.chat.completions.create({
  model: "your-preferred-model", // Change this
  // ...
});
```

### Safety Settings
SQL safety checks are defined in `utils/safety.js`. Currently blocks:
- DROP
- DELETE
- TRUNCATE
- ALTER

Modify the `forbidden` array to adjust restrictions.

### Database Connection
Database settings are configured in `services/db.js`. The connection pool is set up with:
- Max 10 connections
- Connection timeout handling
- Automatic reconnection

## Development

### Running Tests
```bash
# Backend tests (if implemented)
npm test

# Frontend tests
cd frontend
npm test
```

### Code Quality
- ESLint configuration for React app
- Prettier for code formatting (if configured)

## Troubleshooting

### Common Issues

1. **"AI query generation failed"**
   - Check `OPENROUTER_API_KEY` in `.env`
   - Verify internet connection
   - Check OpenRouter API status

2. **"MySQL Connection Failed"**
   - Ensure MySQL server is running
   - Verify database credentials in `.env`
   - Check database name and user permissions

3. **"Unsafe query detected"**
   - The query contains forbidden SQL keywords
   - Modify safety settings in `utils/safety.js` if needed

4. **CORS Errors**
   - Backend includes CORS middleware
   - Ensure backend is running on port 5000

### Logs
- Backend errors are logged to console
- Check terminal output for detailed error messages
- AI service errors include API response details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License - see package.json for details

## Future Enhancements

- [ ] Support for multiple database types (PostgreSQL, SQLite)
- [ ] Query history and favorites
- [ ] Advanced query builder UI
- [ ] Batch query execution
- [ ] Export results to CSV/JSON
- [ ] User authentication and query sharing
- [ ] Integration with more AI models
