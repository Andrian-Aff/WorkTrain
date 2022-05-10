(function () {
    return {
    title: [],
    hint: '',
    formatTitle: function() {},
    customConfig:
                `
                <div id="map">
                    <div id="map-content">
                    <div id="map-nav"></div>
                    </div>
                </div>
                `,
      init: function() {

        let ss = document.createElement('link');
            ss.type = 'text/css';
            ss.rel = 'stylesheet';
            ss.href = 'https://unpkg.com/leaflet@1.4.0/dist/leaflet.css';
            document.getElementsByTagName('head')[0].appendChild(ss);

            ss.onload = function() {
              let s = document.createElement('script');
              s.type = 'text/javascript';
              s.src = 'https://unpkg.com/leaflet@1.4.0/dist/leaflet.js';
              document.getElementsByTagName('head')[0].appendChild(s);
              s.onload = function() {
                    let executeQuery = {
                        queryCode: 'Map_SelectRows',
                        limit: -1,
                        parameterValues: []
                    };
                    this.queryExecutor(executeQuery, this.load, this);
              }.bind(this)
          }.bind(this)


          
      },
      load: function(data) {

        const streets  =  new L.TileLayer('https://tms{s}.visicom.ua/2.0.0/land,ua/base/{z}/{x}/{y}.png?key=e6914b3543d65a2531c893d7362e041d', {
                        attribution: 'Картографічні дані © АТ «<a href="https://api.visicom.ua/">Візіком</a>»',
                        maxZoom: 19,
                        subdomains: '123',
                        tms: true
                    })

        const defaultStyleMap = streets;

        this.map = new L.Map('map', {
            center: new L.LatLng(48.696390, 32.169961),
            zoom: 7,
            zoomSnap: 0.5,
            maxZoom: 13,
            minZoom: 6,
            preferCanvas: true,
            layers: [defaultStyleMap]
        });
          


          console.log(data)
          console.log(this.map)
  
          for (let i = 0; i < data.rows.length; i++) {
  
              let cameraX = parseFloat(data.rows[i].values[0]);
              let cameraY = parseFloat(data.rows[i].values[1]);
              let cameraLink = data.rows[i].values[2]
  
              var camLink = '';
              if (cameraLink) {
                  camLink = `<p style="display: flex;justify-content: center;"><iframe style=" height: 12vw; width: 15.9vw; " src="${cameraLink}"></iframe></p>` 
              };
  
              let buttonStyle = 'style=" padding: 8px 25px; background-color: #76ad94; border-radius: 15px; border: 2px solid #5d925d; color: white; font-size: 15px; "'
  
              let popupTemplate = camLink;
  
  
  
              var marker = L.marker([cameraX, cameraY], {
                  icon: L.icon({
                      iconUrl: 'assets/img/marker-icon.png',
                      className: 'camera',
                      iconSize: [40, 60]
                  })
              })
              
              
              marker.addTo(this.map).bindPopup(popupTemplate, {
                  maxWidth: 1000
              });
  
          };
      }
    };
}());
