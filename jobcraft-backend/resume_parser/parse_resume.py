# import fitz
# import sys
# import os

# pdf_path = sys.argv[1]

# doc = fitz.open(pdf_path)
# text = ""
# for page in doc:
#     text += page.get_text()

# os.write(1, text.encode('utf-8', errors='replace'))


import fitz  # PyMuPDF
import sys
import os

pdf_path = sys.argv[1]

doc = fitz.open(pdf_path)
text = ""
for page in doc:
    text += page.get_text()

# Windows-safe output
os.write(1, text.encode('utf-8', errors='replace'))
