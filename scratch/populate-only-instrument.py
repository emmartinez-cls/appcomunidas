import openpyxl
import uuid

# Load downloaded plantilla
wb = openpyxl.load_workbook('plantilla.xlsx')

# Populate Instrumentos
ws_ins = wb['Instrumentos']
inst_uuid = str(uuid.uuid4())
print("Generated Instrument UUID:", inst_uuid)
# Header: IdInstrumento, TipoInstrumento, NombreInstrumento, TickerISIN, MonedaInstrumento, Activo
ws_ins.append([inst_uuid, 'ACCION', 'Test Instrument Inc', 'TST', 'CLP', 'SI'])

# Keep Operaciones empty
ws_ops = wb['Operaciones']
# Clear any rows except header
while ws_ops.max_row > 1:
    ws_ops.delete_rows(2)

wb.save('plantilla_only_instrument.xlsx')
print("Saved plantilla_only_instrument.xlsx successfully.")
