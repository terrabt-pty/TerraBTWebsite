import json
import os

locales_dir = 'client/src/locales'
result = {}

try:
    for filename in os.listdir(locales_dir):
        if filename.endswith('.json'):
            code = filename.replace('.json', '')
            filepath = os.path.join(locales_dir, filename)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    
                    title = 'TerraBT'
                    if 'value' in data and 'specialization' in data['value'] and 'title' in data['value']['specialization']:
                        title += ' - ' + data['value']['specialization']['title']
                    elif 'hero' in data and 'title' in data['hero']:
                         # Fallback to hero title if specialization title missing
                         title += ' - ' + data['hero']['title']

                    description = ''
                    if 'hero' in data and 'subtitle' in data['hero']:
                        description = data['hero']['subtitle']
                    elif 'value' in data and 'specialization' in data['value'] and 'description' in data['value']['specialization']:
                        description = data['value']['specialization']['description']
                    
                    result[code] = {
                        'title': title,
                        'description': description,
                        'keywords': 'SAP BTP consulting, SAP Business Technology Platform, Fiori development, BTP architecture, SAP integration suite, AI invoice processing, PWA apps, event mesh, SAP consulting',
                        'locale': code 
                    }
            except Exception as e:
                pass

    sorted_result = {k: result[k] for k in sorted(result)}
    print(json.dumps(sorted_result, ensure_ascii=False, indent=2))
except Exception as e:
    print(str(e))
