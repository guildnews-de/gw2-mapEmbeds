# gw2-mapEmbeds

## Start development server

### `yarn install`

Install dependencies.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Embed Codes
The following html blocks can or must be used to add data to the leaflet-gw2 map. 
### Init Block
Necessary to show offcanvas panel. Placement not very important. Nothing is shown exactly there.
In the dataset tag you set, which map data will be loaded. (landmarks, sector borders and names, ...)
#### Config
| tag             | descr                                                |
|-----------------|------------------------------------------------------|
| id=gw2mapRoot   | Render target for offcanvas panel.                   |
| data-gw2map-ids | api map ids to be loaded. (landmarks, sectors, ... ) |
```html
<div id="gw2mapRoot" data-gw2map-ids="1490,1438"></div>
```

### Marker Block
On this block a button will be rendered, which activates the point/point-group on the leaflet-map and centers the map on them.
#### Config
| tag                | description                                                   |
|--------------------|---------------------------------------------------------------|
| class=gw2mapMarker | Render target for marker buttons.                             |
| data-gw2map-marker | Json object of marker names and coordinates                   |
| data-gw2map-color  | Set marker color (red, rose, green, yellow, default: blue) |
```html
<div class="gw2mapMarker" data-gw2map-marker='{"Marker 1": [26850,99387],"Marker 2": [26689,99871]}' data-gw2map-color="rose"></div>
or
<span class="gw2mapMarker" data-gw2map-marker='{"FancySpot": [37480, 101044],"NextSpot": [38168, 101148]}' data-gw2map-color="red"></span>
```

### Script Block
The last element is the actual script, which will so the magic. Place it on the end ob html-body.
```html
<script id="gw2maps" src="gw2-map-embeds.js" defer=""></script>
```
