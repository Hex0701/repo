import matplotlib.pyplot as plt
from matplotlib.offsetbox import OffsetImage, AnnotationBbox
import numpy as np


#this project is for creating an infinit canvas or you can say an idea 
# board where users can copy past text images draw and write infintily 

# Create a blank canvas
fig, ax = plt.subplots()

# Set the limits of the canvas
plt.xlim(0, 10)
plt.ylim(0, 10)

# Add dots to the canvas
dots = [(2, 3), (5, 7), (8, 4)]
for dot in dots:
    ax.plot(dot[0], dot[1], 'o', color='black')

# Function to add code snippet or PNG image
def add_image_or_code(x, y, filename=None, code=None):
    if filename:
        img = plt.imread(filename)
        imagebox = OffsetImage(img, zoom=0.1)
        ab = AnnotationBbox(imagebox, (x, y), frameon=False)
        ax.add_artist(ab)
    elif code:
        ax.text(x, y, code, fontsize=12, verticalalignment='top')

# Example of adding a PNG image
add_image_or_code(3, 5, filename='image.png')

# Example of adding a code snippet
code_snippet = """
def hello_world():
    print("Hello, world!")
"""
add_image_or_code(6, 2, code=code_snippet)

# Show the canvas
plt.show()
