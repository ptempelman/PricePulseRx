from fastapi import FastAPI
import uvicorn
from mangum import Mangum
import requests
import asyncio
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from datetime import datetime
from drug import *

app = FastAPI()
scheduler = AsyncIOScheduler()


@app.get("/")
async def read_root():
    return {"message": "Welcome to the pricing API"}


async def collect_and_send():
    url = "http://localhost:3000/api/data"
    while True:
        # TODO: call functions to get data

        # data should be in the following format
        current_datetime = datetime.utcnow().isoformat() + "Z"
        print(f"Current datetime: {current_datetime}")

        data = fetch_all_drug_prices()

        response = requests.post(url, json=data)
        print(f"Data posted, status: {response.status_code}")
        await asyncio.sleep(1800)  # updates every half hour


@app.on_event("startup")
async def start_scheduler():
    print("Starting scheduler")
    scheduler.add_job(collect_and_send, "interval", minute="*/30")
    scheduler.start()


handler = Mangum(app)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
