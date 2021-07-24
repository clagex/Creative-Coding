## 2021 MDDN342 Assignment 1: Randomised Collections

#### Design Inspiration 
    The final arrangement is hand-made stickers
    sticking on a paper, covering up one another. I am inspired by
    the modern cartoon drawing style with round faces. For the
    drawing style, I wanted to create a pencil drawing doodle style.
    The color palette is also inspired by doodles and cartoons with
    vibrant colors. The free faces are the classic round face from
    many cartoons, a round rectangle face for a different face
    shape, and a wider round face used for a different look. The
    expressions have a totally of 6 combinations, mostly joyful,
    except for the cross-eyes and tongue-out look to add a bit
    variant to it.


#### Design Process: 
    I drew a few different face shapes and expressions as 
    a reference, and I picked three of the faces, and
    joyful expressions in the end. At first, I used a different
    approach for the doodle style, after experimenting with
    different functions and algorithms, I managed to get to the
    current style using my own drawing functions using noise and
    random. Then I move on to using the functions to draw the face
    shapes, expressions while experimenting with different variable
    controls and combinations. Lastly, I changed the arrangement and
    the colors to achieve the final look I am happy with.


#### Random Selection: 
    I used Weighted Selection for choosing which
    discrete variables to draw, such as colors, eyes and mouth. I
    used Gaussian Selection for choosing the size of faces, so the
    overall face sizes are not too big or too small. I used
    conditional randomness on the halo drawing, whenever the
    rectangle face get a cross-eyes and tongue-out expression, a
    halo will be drawn on it. I used random() for position and
    angles, as I want to generate a more chaotic look for the final
    output.

#### Parameter List:
##### Discrete Variables: 
    Face colors 
    Eye colors 
    Eye element 
    Mouth element
##### Continuous Variables: 
    x position 
    y position 
    Size 
    Angle 
    Radius of the rectangle face
    


