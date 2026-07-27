import zipfile
import xml.etree.ElementTree as ET

try:
    with zipfile.ZipFile('plantilla.xlsx', 'r') as z:
        # 1. Read workbook.xml to get sheet names
        workbook_xml = z.read('xl/workbook.xml')
        root_wb = ET.fromstring(workbook_xml)
        ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        sheets = [(sheet.attrib['name'], sheet.attrib.get('sheetId')) for sheet in root_wb.findall('.//ns:sheet', ns)]
        print("Sheets in Workbook:")
        print(sheets)

        # 2. Read shared strings
        strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            ss_root = ET.fromstring(z.read('xl/sharedStrings.xml'))
            strings = [t.text for t in ss_root.findall('.//ns:t', ns)]

        # 3. Read sheet data (sheet1, sheet2, sheet3, etc.)
        # Usually, sheet1 is 'Operaciones', sheet2 is 'Carteras', sheet3 is 'Instrumentos'
        # Let's inspect xl/worksheets/sheet3.xml (for Instrumentos) or find which one is which
        sheet_files = [f for f in z.namelist() if f.startswith('xl/worksheets/')]
        print("\nSheet files:")
        print(sheet_files)

        for sf in sheet_files:
            print(f"\n--- Content of {sf} ---")
            root_s = ET.fromstring(z.read(sf))
            rows = root_s.findall('.//ns:row', ns)
            print(f"Number of rows: {len(rows)}")
            # print cell values
            for row in rows[:5]: # first 5 rows
                cells_data = []
                for cell in row.findall('ns:c', ns):
                    r_attr = cell.attrib.get('r', '')
                    t_attr = cell.attrib.get('t', '')
                    val_el = cell.find('ns:v', ns)
                    val = val_el.text if val_el is not None else ''
                    if t_attr == 's' and val != '':
                        val = strings[int(val)]
                    cells_data.append(f"{r_attr}: {val}")
                print(f"Row {row.attrib.get('r')}: {cells_data}")

except Exception as e:
    print("Error:", e)
