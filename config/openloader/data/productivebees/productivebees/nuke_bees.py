import os
import json

path = os.path.dirname(os.path.realpath(__file__))

print(path)

for r, d, f in os.walk(path):
    for file in f:
        file = os.path.join(r, file)
        if (file.endswith('.json') and '\\productivebees\\' in file):
            print(file)

confirm = input("Reset these files? (y/n): ")

if (confirm == 'y'):
    for r, d, f in os.walk(path):
        for file in f:
            file = os.path.join(r, file)
            if (file.endswith('.json') and '\\productivebees\\' in file):
                print("Resetting " + file)
                opened = open(file, 'r')
                contents = json.load(opened)
                contents["conditions"] = {
                    "type": "forge:mod_loaded",
                    "modid": "fake_mod_fakey_fakerson"
                }
                opened.close()
                with open(file, 'w') as file:
                    json.dump(contents, file, indent=4)
                    file.close()