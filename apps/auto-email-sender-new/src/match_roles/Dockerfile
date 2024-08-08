FROM python:3.11

COPY . .

RUN pip install -r requirements.txt

WORKDIR src/

EXPOSE 8000
CMD uvicorn --host 0.0.0.0 main:app