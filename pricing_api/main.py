from fastapi import FastAPI, BackgroundTasks
import uvicorn
from mangum import Mangum
import requests
import asyncio

app = FastAPI()


@app.get("/")
async def read_root():
    return {"message": "Welcome to the pricing API"}


@app.post("/get_price")
async def get_price(request: Request):
    # Request will have information: platform and drug_name
    pass


@app.post("/predict_price")
async def predict(request: Request):
    # Request will have information: platform and drug_name
    pass


async def collect_and_send():
    url = "http://localhost:3000/api/data"
    while True:
        # TODO: call functions to get data
        
        # Data should be in the following format
        data = [
            {"drugName": "Atorvastatin", "datetime": "2024-05-11T00:00:00Z", "price": "10.00"},
            {"drugName": "Levothyroxine", "datetime": "2024-05-11T00:00:00Z", "price": "8.50"},
            {"drugName": "Lisinopril", "datetime": "2024-05-11T00:00:00Z", "price": "12.00"},
        ]
        response = requests.post(url, json=data)
        print(f"Data posted, status: {response.status_code}")
        await asyncio.sleep(1800) # updates every half hour


@app.post("/initialize_pricing_updates")
async def initialize_pricing_updates(background_tasks: BackgroundTasks):
    background_tasks.add_task(fetch_and_send)
    return {"message": "Price updates started"}
    


handler = Mangum(app)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
