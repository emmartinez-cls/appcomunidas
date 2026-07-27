import zipfile
import xml.etree.ElementTree as ET

try:
    with zipfile.ZipFile('plantilla.xlsx', 'r') as z:
        # Read shared strings to find text headers
        if 'xl/sharedStrings.xml' in z.namelist():
            xml_content = z.read('xl/sharedStrings.xml')
            root = ET.fromstring(xml_content)
            # Shared strings namespaces
            ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            strings = [t.text for t in root.findall('.//ns:t', ns)]
            print("Shared Strings (headers/values):")
            print(strings)
        else:
            print("No shared strings found.")
except Exception as e:
    print("Error:", e)
