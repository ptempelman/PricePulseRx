from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import json
import time
import os


chrome_driver_path = "./chromedriver-mac-x64/chromedriver"


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
    print('Finding price......\n')
    name = driver.find_element_by_tag_name('h1').text
    price = driver.find_element_by_xpath('//*[@id="__next"]/div/div[2]/div[1]/div[5]/div/div[2]/div/div/div/div[2]/div[1]/div/div[2]/div[1]/div[1]/span[2]').text
    print('Get successfully!\n')
    return name,price

    '''
    element = driver.find_element_by_xpath('//*[@id="MDS-component-id-:R2h9niaraf6H1:"]')
    actions = ActionChains(driver)
    actions.move_to_element(element).perform()


    element.click()
    time.sleep(1)
    driver.find_element_by_xpath('//*[@id="MDS-component-id-:R2h9niaraf6:"]/li[1]/div/div/label/div/div/div[1]').click()
    time.sleep(3)
    lowest_price = driver.find_element_by_xpath('//*[@id="__next"]/div/div[2]/div[1]/div[6]/div/div[1]/div/div[2]/div[2]/a/div[1]/div[2]/div/div/div[1]/div/div/span[2]').text
    highest_price = driver.find_element_by_xpath('//*[@id="__next"]/div/div[2]/div[1]/div[6]/div/div[1]/div/div[14]/div[2]/a/div[1]/div[2]/div/div/div[1]/div/div/span[2]').text
    print('Get successfully!\n')
    name = driver.find_element_by_tag_name('h1').text
    time.sleep(10)
    driver.quit()
    return name,lowest_price,highest_price
    '''





url = 'https://www.goodrx.com/lipitor'



name, price = fetch_drug_prices(url)
price_data = {
    "drug":name,
    'price':price,
    'timestamp': time.time()
    }


if os.path.exists('drug_prices.json'):
    with open('drug_prices.json', 'a') as f:
        json.dump(price_data, f, indent=4)
else:
    with open('drug_prices.json', 'w') as f:
        json.dump(price_data, f, indent=4)








