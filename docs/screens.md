# Screens

## Layout

- Layout
- Header
- BlankHeader
- ScrollView
- Centered

## Home

- Header
  - Logo
  - Dropdown
    - View on date
    - Edit trackers
    - Sandbox (isDev)
- ScrollView
  - TableDates
    - Go back (n) days
    - Each day
    - Go forward (n) days
  - TableTrackers
    - TrackerTitle: icon, label
    - EntryCell: opens EnterForm screen
    - Streak
  - Edit trackers button
- Add tracker button
- Add all entries button

## Edit Trackers

- Header
  - Back to home button
  - Title
- ScrollView
  - TableTrackers
    - TrackerTitle
      - opens TrackerForm screen
      - When held triggers the order change functionality
    - Change Order Cell - When pressed immediately triggers order change
    - Delete - opens TrackerDelete screen
- Add tracker button
- Add all entries button

## Delete Tracker

- HeaderBlank
  - Close Button
- CenteredContent
  - Title - Delete (name)
  - Description - Are you sure you want to delete this, all entries will be lost
  - Type name of tracker to delete
  - Red bin button - takes you back to Edit trackers screen

## Tracker Form

- HeaderBlank
  - Close Button
- CenteredContent
  - Step 1 - TrackerType
  - Step 2 - Title
  - Step 3? - Slider values

## Enter Form

- HeaderBlank
  - Go back a day
  - Active date
  - Close button
- CenteredContent
  - EnterField
    - Title
    - InputType
    - CheckButton

## Enter All Form

- HeaderBlank
  - Go back a day
  - Active date
  - Close button
- CenteredContent
  - EnterField 1 by 1n
