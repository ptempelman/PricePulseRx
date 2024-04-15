from fastapi import FastAPI, Request
import uvicorn
from mangum import Mangum

app = FastAPI()


@app.get("/")
async def read_root():
    pass


@app.post("/get_price")
async def get_price(request: Request):
    # Request will have information: platform and drug_name
    pass


@app.post("/predict_price")
async def predict(request: Request):
    # Request will have information: platform and drug_name
    pass


handler = Mangum(app)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
