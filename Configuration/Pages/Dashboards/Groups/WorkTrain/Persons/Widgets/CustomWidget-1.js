(function () {
    return {
        title: [],
        hint: '',
        formatTitle: function () { },
        customConfig:
            `
                <div id="map">
                    <div id="map-content">
                    <div id="map-nav"></div>
                    </div>
                </div>
                `,
        subscriptions: [],
        init: function () {
            this.subscriptions.push(this.messageService.subscribe('Table_OpenLocation', this.renderMap, this));


            let ss = document.createElement('link');
            ss.type = 'text/css';
            ss.rel = 'stylesheet';
            ss.href = 'https://unpkg.com/leaflet@1.4.0/dist/leaflet.css';
            document.getElementsByTagName('head')[0].appendChild(ss);

            ss.onload = function () {
                let s = document.createElement('script');
                s.type = 'text/javascript';
                s.src = 'https://unpkg.com/leaflet@1.4.0/dist/leaflet.js';
                document.getElementsByTagName('head')[0].appendChild(s);
                s.onload = function () {
                    // let executeQuery = {
                    //     queryCode: 'Map_SelectRows',
                    //     limit: -1,
                    //     parameterValues: []
                    // };
                    // this.queryExecutor(executeQuery, this.load, this);
                    this.load();
                }.bind(this)
            }.bind(this)



        },
        load: function (data) {

            const streets = new L.TileLayer('https://tms{s}.visicom.ua/2.0.0/land,ua/base/{z}/{x}/{y}.png?key=e6914b3543d65a2531c893d7362e041d', {
                attribution: 'Картографічні дані © АТ «<a href="https://api.visicom.ua/">Візіком</a>»',
                maxZoom: 19,
                subdomains: '123',
                tms: true
            })

            const defaultStyleMap = streets;

            this.map = new L.Map('map', {
                // center:   new L.LatLng(48.696390, 32.169961),
                zoom: 5,
                zoomSnap: 0.5,
                maxZoom: 13,
                minZoom: 6, 
                preferCanvas: true,
                layers: [defaultStyleMap]
            }).setView([48.696390, 32.169961], 1);
console.log(L.LatLng);
           
        },
        ActiveLayersObjectLabel: [],
        renderMap: function (message) {
            /*CLEAR LAYERS Label*/
            for (var r = 0; r < this.ActiveLayersObjectLabel.length; r++) {
                this.map.removeLayer(this.ActiveLayersObjectLabel[r]);
                for (var t = 0; t < this.ActiveLayersObjectLabel[r].length; t++) {
                    this.map.removeLayer(this.ActiveLayersObjectLabel[r][t]);
                }
            }

            
            let cameraX = parseFloat(message.Location_Lat);
            let cameraY = parseFloat(message.Location_Lon);
            var marker = L.marker([cameraX, cameraY], {
                icon: L.icon({
                    iconUrl: 'assets/img/marker-icon.png',
                    className: 'camera',
                    iconSize: [40, 60],
                   
                }),
            });

          
            marker.addTo(this.map).bindPopup(`<ul class="ul-list">
            <li>ПІБ:<b>${message.data.PIB}</b></li>
            <li>Дата прийому:<b>${message.data.Date_Employ.slice(0,10)}</b></li>
            <li>Відділ:<b>${message.data.DepartmentName}</b></li>
            <li>Посада:<b>${message.data.PositionName}</b></li>
            <li>Статус:<b>${message.data.StatusName}</b></li>
            </ul>`, {
                maxWidth: 350,
                zIndex: 50000,
                    }).openPopup();
                    
            this.map.setView([message.Location_Lat, message.Location_Lon])
             
            this.ActiveLayersObjectLabel.push(marker)


        },
        unsubscribeFromMessages() {
            for (var i = 0; i < this.subscriptions.length; i++) {
                this.subscriptions[i].unsubscribe();
            }
        },
        destroy() {
            this.unsubscribeFromMessages();
        }
    };
}());
