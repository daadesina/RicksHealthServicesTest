# Shift Booking API (Flask)

This is a simple backend API built with Flask for a mini shift booking system. It was developed as part of the Ricks Health Services developer test.

##  Features

- View all available shifts
- View shift details by ID
- Mock login with hardcoded credentials
- Book a shift (and update shift data)
- Data saved in `shifts.json`
- CORS enabled for frontend integration

---

##  Getting Started

### Requirements

- Python 3.1+
- `pip`

### Installation & Running

1. Navigate to the `backend/` directory:
   ```bash
   cd backend

2. Install dependencies:
   ```bash
   pip install -r requirements.txt

3. Run the server:
   ```bash
   python app.py

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | /api/login            | Mock login               |
| GET    | /api/shifts           | List all shifts          |
| GET    | /api/shifts/<id>      | Get a shift by ID        |
| POST   | /api/book/<id>        | Book a shift             |
