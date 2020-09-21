# -*- coding: utf-8 -*-
"""
Created on Sun Sep 13 13:18:23 2020

@author: kingslayer
"""

import pytesseract as tess
from PIL import Image

tess.pytesseract.tesseract_cmd=r'C:\Users\kingslayer\AppData\Local\Tesseract-OCR\tesseract.exe'

def convertImageToText(img_address):
    img=Image.open(img_address)
    text=tess.image_to_string(img)
    return text

convertImageToText('test_ImageToText.png')