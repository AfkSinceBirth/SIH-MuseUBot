from flask import Flask, request, jsonify
from flask_cors import CORS
import MySQLdb

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for all routes

# MySQL Database Configuration
db_config = {
    'host': 'localhost',
    'user': 'root',          # MySQL username
    'password': '#M762akm',  # MySQL password
    'database': 'museumbooking',  # Name of the database
    'port': 3306,            # MySQL port (default is 3306)
}

# Function to establish a connection with MySQL
def connect_db():
    try:
        return MySQLdb.connect(
            host=db_config['host'],
            user=db_config['user'],
            passwd=db_config['password'],
            db=db_config['database'],
            port=db_config['port']
        )
    except MySQLdb.Error as e:
        print(f"Database connection error: {e}")
        raise

# Endpoint to handle ticket booking requests
@app.route('/booking', methods=['POST'])
def book_ticket():
    data = request.get_json()

    # Extract booking details from the request
    state = data.get('state')
    city = data.get('city')
    museum = data.get('museum')
    visit_date = data.get('date')
    visit_time = data.get('time')
    num_people = data.get('people')

    # Validate input
    if not all([state, city, museum, visit_date, visit_time, num_people]):
        return jsonify({'error': 'All fields are required.'}), 400

    conn = None
    cursor = None
    try:
        # Connect to MySQL database
        conn = connect_db()
        cursor = conn.cursor()

        # SQL query to insert booking data into the database
        query = """
            INSERT INTO bookings (state, city, museum, visit_date, visit_time, num_people)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (state, city, museum, visit_date, visit_time, num_people))

        # Commit the transaction
        conn.commit()

        return jsonify({'message': 'Booking confirmed successfully!'}), 201

    except MySQLdb.Error as e:
        print(f"Database error: {e}")
        return jsonify({'error': 'Database error occurred. Please try again later.'}), 500
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Failed to save booking. Please try again later.'}), 500
    finally:
        # Ensure the database connection is closed
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# Endpoint to fetch available tickets (dummy example)
@app.route('/tickets', methods=['GET'])
def get_available_tickets():
    state = request.args.get('state')
    city = request.args.get('city')
    museum = request.args.get('museum')

    # Dummy data for demonstration
    available_tickets = {
        'museum': museum,
        'available': 10  # Random available tickets, should be replaced with real data from DB
    }

    return jsonify(available_tickets), 200

@app.route('/states', methods=['GET'])
def get_states():
    try:
        # Connect to MySQL database
        conn = connect_db()
        cursor = conn.cursor()

        # SQL query to fetch all states
        query = "SELECT * FROM states"
        cursor.execute(query)

        # Fetch all states
        states = cursor.fetchall()

        # Check if states is empty
        if not states:
            return jsonify({'error': 'No states found.'}), 404

        # Format the response to include all state details
        state_list = []
        for state in states:
            # Ensure the expected columns exist
            if len(state) < 2:
                return jsonify({'error': 'Invalid state data.'}), 500
            
            state_data = {
                'id': state[0],     # Assuming 'id' is the first column
                'name': state[1]    # Assuming 'name' is the second column
            }
            state_list.append(state_data)

        return jsonify(state_list), 200

    except MySQLdb.Error as e:
        print(f"Database error: {e}")  # Print the database error to console
        return jsonify({'error': 'Database error occurred. Please try again later.'}), 500
    except Exception as e:
        print(f"Error: {e}")  # Print the general error to console
        return jsonify({'error': 'Failed to retrieve states.', 'details': str(e)}), 500
    finally:
        # Ensure the database connection is closed
        if cursor:
            cursor.close()
        if conn:
            conn.close()


# Endpoint to retrieve all bookings
@app.route('/bookings', methods=['GET'])
def get_bookings():
    conn = None
    cursor = None
    try:
        # Connect to MySQL database
        conn = connect_db()
        cursor = conn.cursor()

        # SQL query to fetch all bookings
        query = "SELECT * FROM bookings"
        cursor.execute(query)

        # Fetch all bookings
        bookings = cursor.fetchall()

        # Format the response
        booking_list = [{
            'state': b[1],
            'city': b[2],
            'museum': b[3],
            'visit_date': str(b[4]),  # Convert date to string
            'visit_time': str(b[5]),   # Assuming visit_time is at index 5
            'num_people': b[6]
        } for b in bookings]

        return jsonify(booking_list), 200

    except MySQLdb.Error as e:
        print(f"Database error: {e}")
        return jsonify({'error': 'Database error occurred. Please try again later.'}), 500
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Failed to retrieve bookings.'}), 500
    finally:
        # Ensure the database connection is closed
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# Endpoint to fetch museums based on state and city
@app.route('/museums', methods=['GET'])
def get_museums():
    state = request.args.get('state')
    city = request.args.get('city')

    conn = None
    cursor = None
    try:
        # Connect to MySQL database
        conn = connect_db()
        cursor = conn.cursor()

        # SQL query to fetch all details about museums based on state and city
        query = "SELECT * FROM museums WHERE state = %s AND city = %s"
        cursor.execute(query, (state, city))
        museums = cursor.fetchall()

        # Format the response to include all museum details
        museum_list = [{
            'id': museum[0],            # Assuming 'id' is the first column
            'name': museum[1],          # Assuming 'name' is the second column
            'state': museum[2],         # Assuming 'state' is the third column
            'city': museum[3],          # Assuming 'city' is the fourth column
            'address': museum[4],       # Assuming 'address' is the fifth column
            'contact_info': museum[5],  # Assuming 'contact_info' is the sixth column
            # Add more fields here based on your table structure
        } for museum in museums]

        return jsonify(museum_list), 200

    except MySQLdb.Error as e:
        print(f"Database error: {e}")
        return jsonify({'error': 'Database error occurred. Please try again later.'}), 500
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Failed to retrieve museums.'}), 500
    finally:
        # Ensure the database connection is closed
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)