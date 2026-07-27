import pandas as pd
try:
    df = pd.read_excel('plantilla.xlsx')
    print("Columns:")
    print(df.columns.tolist())
    print("\nFirst row:")
    print(df.iloc[0].to_dict() if len(df) > 0 else "Empty sheet")
except Exception as e:
    print("Error:", e)
