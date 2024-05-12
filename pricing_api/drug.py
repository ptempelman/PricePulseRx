from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

chrome_driver_path = "./chromedriver-mac-arm64/chromedriver"

def fetch_all_drug_prices():

    def fetch_drug_prices(url):

        options = Options()
        options.add_argument('--incognito')
        options.add_argument("--disable-blink-features=AutomationControlled") 
        options.add_argument("--disable-blink-features")  
        options.add_argument("window-size=1280,800")  
        options.add_experimental_option("excludeSwitches", ["enable-automation"])  
        options.add_experimental_option('useAutomationExtension', False)
        driver = webdriver.Chrome(executable_path=chrome_driver_path, options=options)
        driver.get(url)
        time.sleep(2)
        print("-----Starting url successfully-----\n")
        print('Finding Price...\n')
        element = driver.find_element_by_xpath('//*[@class="sc-1pf85vx-0 fEUSoi re-text"]')
        price = float(element.text)
        return price

    data = []
    time.sleep(60)
    price = fetch_drug_prices('https://www.goodrx.com/albuterol')
    data.append({"drugName": "Albuterol", "price": price})
    print(data)
    time.sleep(60)
    price = fetch_drug_prices('https://www.goodrx.com/atorvastatin')
    data.append({"drugName": "Atorvastatin", "price": price})
    print(data)
    time.sleep(60)
    price = fetch_drug_prices('https://www.goodrx.com/lipitor')
    data.append({"drugName": "Lipitor", "price": price})
    time.sleep(60)
    print(data)
    price = fetch_drug_prices('https://www.goodrx.com/metformin')
    data.append({"drugName": "Metformin", "price": price})
    time.sleep(60)
    print(data)
    price = fetch_drug_prices('https://www.goodrx.com/gabapentin')
    data.append({"drugName": "Gabapentin", "price": price})
    time.sleep(60)
    print(data)

    return data