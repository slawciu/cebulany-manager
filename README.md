# cebulany-manager

# Build

```
# make virtualenv
virtualenv venv -ppython3.7
source venv/bin/activate
python setup.py install
cd spa/
yarn run build
```

# Init 

```
alembic upgrade head
python create_mock.py > mock.csv
./uwsgi-me.sh
# go to http://localhost:5000
# login (socek, socek) and upload mock.csv in transaction view
```

# Run?

```
./uwsgi-me.sh
```

# Develop

## Backend server

```
source venv/bin/activate
cd cebulany/
FLASK_DEBUG=1 FLASK_APP=app.py flask run
```

## Frontend server

```
cd spa
yarn run dev
# unfortunately we don't have CORS headers in backend server
# so you need CORS plugin in browser
```
