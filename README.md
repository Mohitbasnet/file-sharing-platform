# KeepSafe File Sharing Platform

KeepSafe is a versatile file-sharing platform designed to provide users with a secure and efficient way to manage their files. Whether you're looking to store files privately or share them within your organization, KeepSafe has you covered.

## Features

- **Authentication and Authorization:** Secure access to your files with user authentication and authorization mechanisms.
- **Public and Private Storage:** Choose between public and private storage options for your files.
- **Favourites Management:** Easily add, remove, and organize your favorite files for quick access.
- **Trash Management:** Safely delete files by moving them to the trash, with options to recover or permanently delete.
- **Automatic Trash Deletion:** Integration with Celery to automatically delete files from the trash after a specified time.
- **Organization Collaboration:** Create organizations and invite other users to collaborate, with isolated file storage for enhanced privacy.

## Technologies Used

- **Backend:**
  - Django Rest Framework
  - Python
- **Frontend:**
  - Next.js
  - Tailwind CSS
  - TypeScript
- **UI Libraries:**
  - Shadcn UI
  - hyperui.dev components

## Environment Variables

To run the project locally, you'll need to set up the following environment variables in a `.env` file:

```plaintext
SECRET_KEY = <your-secret-key>
ORIGIN_1 = 'http://localhost:3000'
ORIGIN_2 = 'http://127.0.0.1:3000'
DB_ENGINE = django.db.backends.mysql
DB_NAME = file_sharing_platform
DB_USER = <your-database-username>
DB_PASSWORD = <your-database-password>
DB_HOST = localhost
DB_PORT = 3306
```

## Getting Started

### Backend

Navigate to the backend folder:

```bash
cd backend

python3 -m venv venv

. venv\Scripts\activate

pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate

python manage.py runserver, run at port 8000

```

### Frontend

Navigate to the frontend folder:

```bash
cd frontend

npm install

npm run dev, run at port 3000 or you may have to change allowed origins on the backend as well

```

Once both the backend and frontend servers are running, you can access the application at http://localhost:3000 to start managing your files securely.
