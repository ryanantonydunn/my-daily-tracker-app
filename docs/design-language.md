# Design Language

## Base

### Colors

- white: #FFFFFF
- black: #000000
- gray-100: #F7FAFC
- gray-200: #EDF2F7
- gray-300: #E2E8F0
- gray-400: #CBD5E0
- gray-500: #A0AEC0
- gray-600: #718096
- gray-700: #4A5568
- gray-800: #2D3748
- gray-900: #1A202C
- red: #E53E3E
- green: #48BB78
- yellow: #D69E2E

### Typography

#### Fonts

- sans: [Lato](https://fonts.google.com/specimen/Lato)
- serif: [Zilla Slab](https://fonts.google.com/specimen/Zilla%20Slab)

#### Variations

- base: sans 0.875rem gray-700
- serif
- sm: 0.75rem
- lg: 1.125rem
- xl: 1.25rem
- bold
- light: gray-500
- white: gray-200

### Icons

Using [Material Design](https://material.io/resources/icons/?style=baseline)

- all_inclusive (number field)
- arrow_back
- arrow_forward
- check
- close
- delete
- edit
- keyboard-arrow-left
- keyboard-arrow-right
- linear_scale (slider field)
- more_vert (three dots for dropdown menus)
- playlist_add (add new tracker button)
- playlist_play (add all entries button)
- short_text (text field)
- star_border
- unfold_more (up and down arrows for re-arranging)

## Components

### Logo

My: serif xl light
Daily: serif xl white
Tracker: serif xl light

### IconButton

- sm: 40px container, 20px icon
- md: 48px container, 24px icon
- lg: 64px container, 28px icon
- xl: 96px container, 30px icon
- borderColor?
- bgColor?
- iconColor
- onPress
- disabled
- style

### Dropdown

- items: (onPress, label)
- direction: right or left

### NumberField

- autoFocus
- value
- onChange
- style

### TextField

- autoFocus
- center
- multiLine
- value
- onChange
- style

### Slider

- min
- max
- step
- value
- onChange
- style

### Table

Exports smaller components:

- Table
- TableRow
- ChangeOrder: requireHold
