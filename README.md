# Digital Lending Product

This micro-version of Bees and Bears' digital platform which maintains a list of customers and their respective loan offers. The system allows the creation of loan offers based on user input.

This Digital Lending Product is built with Django (for the backend) and React (for the frontend).

## Setup Instructions

### Create a Virtual Environment

For Windows, run the following command in your terminal to create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment:

```bash
.\venv\Scripts\activate
```

## Backend Setup (Django)

Once the virtual environment is activated, navigate to the Django backend folder and install the necessary dependencies(make sure you are in the directory containing manage.py):

### Installation

Install the necessary dependencies using the requirements.txt file:

```bash
pip install -r requirements.txt
```

### Database Initialization

To initialize the database and create the necessary tables, run the following commands:

```bash
python manage.py makemigrations
python manage.py makemigrations loan_calculator
python manage.py migrate
```

### Interactive Python Shell

You can use the interactive Python shell to interact with the database. To invoke the Python shell, use this command:

```bash
python manage.py shell
```

### Creating an Admin User

To create a user who can log in to the admin site, run the following command:

```bash
python manage.py createsuperuser
```

Enter your desired username and press enter:

```bash
Username: admin
```

You will then be prompted for your desired email address:

```bash
Email address: admin@example.com
```

Finally, enter your password. You will be asked to enter it twice for confirmation:

```bash
Password: *********
Password (again): *********
```

### Start the Development Server

The Django admin site is activated by default. To start the development server, use the following command:

```bash
python manage.py runserver
```

## Usage

By default, the server starts on http://127.0.0.1:8000/.

You can navigate through the following endpoints to interact with the models:

<ul>
<li>Customers: http://127.0.0.1:8000/customers/ </li>
<li>Loan Offers: http://127.0.0.1:8000/loanoffers/ </li>
</ul>

#### Creating Customers and Loan Offers

<ol>
<li>Create Customers:
<ul>
<li>Use the Django admin site or API endpoint at http://127.0.0.1:8000/customers/ to create customer records.</li>
</ul>
</li>

<li>Create Loan Offers:
<ul>
<li>Once the customers are created, you can create loan offers using the frontend interface or the API endpoint at http://127.0.0.1:8000/loanoffers/.</li>
</ul>

</li>
</ol>
The frontend will provide a user-friendly interface to manage and create loan offers based on the customer data.

### Running Tests

The testing files are stored inside the ./tests/ folder
To run the tests use command

```bash
python manage.py test
```

## Frontend Setup (React)

Make sure that npm and node are installed using

```bash
node --version
npm --version
```

Navigate to the React frontend \loan-calculator folder and install the necessary dependencies:

```bash
npm install
npm audit fix
```

### Start the Development Server

Once the Django backend is started, open a new terminal and navigate to the React frontend folder. Start the React client using the following command:

```bash
npm start
```

### Running Tests

To run the tests for the React frontend, use the following command:

```bash
npm test
```
