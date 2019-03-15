function highmap()
{
    window.SGWTWidgetConfiguration = {
        environment: 'homologation'
      };
    var imported = document.createElement('script');
    imported.src = '';
    document.head.appendChild(imported);
    var chart = null;
    document.querySelector('#chart').addEventListener('sgwt-highcharts--ready', function() {
    chart = document.querySelector('#chart');
    if (chart) {
        fetch('http://code.highcharts.com/mapdata/custom/world.geo.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            updateChart(json);
        })
        .catch(function(err) {
            console.error(err);
        });
    }
    });
    // add series data and hide the load spinner
    function updateChart(mapData) {
    // chart.addSeries({
    //     name:'Alerts',
    //     mapData: mapData,
    //     data: fetch('http://localhost:5052/v1/vps_api/region_counts'),
    //         tooltip: {
    //             headerFormat: '<span style="font-size:10px">{series.name}</span><br/>',
    //             pointFormat: 'DATASTORES: <b>{point.datastores}</b><br/>SNAPSHOTS: <b>{point.snapshots}</b><br/>',
    //             footerFormat: '<span style="font-size:10px">Source: CTS Morning Checks</span><br/>'
    //         }
    // });
    fetch('http://localhost:5052/v1/vps_api/region_counts')
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        chart.addSeries({
            name:'Alerts',
            mapData: mapData,
            data: json,
            tooltip: {
                headerFormat: '<span style="font-size:10px">{series.name}{point.country}</span><br/>',
                pointFormat: '<b>{point.country}</b><br>DATASTORES: <b>{point.datastores}</b><br/>SNAPSHOTS: <b>{point.snapshots}</b><br/>',
                // footerFormat: '<span style="font-size:10px">Source: CTS Morning Checks</span><br/>'
            },
            mapNavigation: {
                enabled: true,
                enableDoubleClickZoomTo: true
            }
        });
    })
    .catch(function(err){
        console.error(err);
    });
    // hide the loader
    chart.hideLoading();
    }
}
