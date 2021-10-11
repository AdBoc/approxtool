FROM python:3.9.6-slim
WORKDIR /code
COPY . .
RUN pip install --upgrade pip \
 && pip install grpcio grpcio-tools scipy lmfit numpy
EXPOSE 9094
CMD ["python", "-u", "main.py"]