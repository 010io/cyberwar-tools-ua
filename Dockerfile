FROM python:3.11-slim
WORKDIR /app
RUN apt-get update && apt-get install -y curl git
COPY squad303-automation/requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
ENV FLASK_ENV=production
CMD ["python", "squad303-automation/squad303_bot.py"]
