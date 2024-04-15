import json

try:
    
    with open('drug_prices.json', 'r') as file:
        data = file.read()


    parts = data.strip().split('}{')

    corrected_parts = ['{' + part + '}' for part in parts]

    corrected_parts[0] = corrected_parts[0][1:]  
    corrected_parts[-1] = corrected_parts[-1][:-1]


    json_data = '[' + ','.join(corrected_parts) + ']'


    print("Corrected JSON data:")
    print(json_data)

    # Parse the corrected JSON data to ensure it's valid
    json_object = json.loads(json_data)

    # Write the corrected JSON data back to a new file
    with open('drug_prices.json', 'w') as f:
        json.dump(json_object, f, indent=4)

    print("JSON file has been corrected and saved.")
except Exception as e:
    print(f"An error occurred during the correction process: {e}")
